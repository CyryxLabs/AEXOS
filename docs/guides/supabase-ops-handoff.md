# AEXOS-Pro Access Ops Handoff

**Version:** 3.0.0
**Last Updated:** 2026-04-19
**Status:** Active

---

## Overview

This handoff is not for generic Supabase discovery.

It exists for repeatable AEXOS-Pro access/licensing operations, where the project, the service and the flow are already known. The focus here is to allow the squad-creator to generate specific tasks for operations such as:

- create new access
- grant Pro to an existing email
- resend verification
- confirm email as admin
- password reset
- diagnose why a login/access failed

The document needs to be deep enough to prevent the generated task from repeating unnecessary investigation or taking dangerous shortcuts.

---

## Fixed Context

For this flow, the already known facts are:

- real service: `https://aexos-license-server.vercel.app`
- correct Supabase project: `aexos-license-server`
- project ref: `evvvnarpwcdybxdvcwjh`
- auth backend: Supabase Auth of the project `evvvnarpwcdybxdvcwjh`
- entitlement/buyer oracle: table `public.buyers`
- relevant auxiliary tables:
  - `public.buyer_validations`
  - `public.licenses`
  - `public.activations`

**Rule:** for AEXOS-Pro access operations, do not spend time rediscovering the project. Start directly from this context.

---

## What We Already Learned In Practice

This flow has already been executed manually and the learnings below must be treated as consolidated operational knowledge:

- `POST /api/v1/auth/check-email` is the official backend pre-check
  - it returns `isBuyer` and `hasAccount`
  - it must be the first oracle of the user's state

- `POST /api/v1/auth/login` is the second oracle
  - if it returns `EMAIL_NOT_VERIFIED`, the problem is email confirmation
  - if it returns `INVALID_CREDENTIALS`, the problem is the password
  - if it returns `200`, auth is functional

- in the project `evvvnarpwcdybxdvcwjh`, the real login depends on Supabase Auth

- the Pro entitlement does not come from `public.licenses`
  - the operational oracle for buyer is `public.buyers`
  - if `buyers` does not have the email active, `check-email` does not raise `isBuyer`

- `public.licenses` and `public.activations` are important for license and machines
  - but they are not the first write to "grant access"

- it is not necessary to activate a license on a machine to complete onboarding/access ops
  - activation consumes seat/operational state and must stay out of basic provisioning tasks

---

## Operational Goal

Every task derived from this handoff must answer clearly:

- does the user already exist in auth?
- is the email confirmed?
- is the email already granted in `buyers`?
- does the final flow work on the real service?

---

## Known Endpoints

Endpoints of the real service that matter:

- `POST /api/v1/auth/check-email`
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/activate-pro`
- `POST /api/v1/auth/request-reset`
- `POST /api/v1/auth/resend-verification`

Auxiliary UI/flow:

- password reset: `https://aexos-license-server.vercel.app/reset-password`

---

## Endpoint Semantics

### `POST /api/v1/auth/check-email`

Use it to classify the case before any write.

Response of interest:

- `isBuyer: boolean`
- `hasAccount: boolean`
- `email`

Interpretation:

- `isBuyer=false`, `hasAccount=false`
  - account missing and entitlement missing
- `isBuyer=false`, `hasAccount=true`
  - account exists, buyer missing
- `isBuyer=true`, `hasAccount=false`
  - inconsistent case or partial migration; investigate auth
- `isBuyer=true`, `hasAccount=true`
  - provisioning almost complete; validate login

### `POST /api/v1/auth/signup`

Use only when `hasAccount=false`.

Useful output:

- `userId`
- `message`

### `POST /api/v1/auth/login`

Use it to validate whether the user can actually sign in.

Useful outputs/errors:

- `200` with `accessToken`, `userId`, `emailVerified`
- `EMAIL_NOT_VERIFIED`
- `INVALID_CREDENTIALS`

### `POST /api/v1/auth/request-reset`

Use for standard recovery when a manual admin reset is not desirable.

### `POST /api/v1/auth/resend-verification`

Use when the account exists but still depends on the user's inbox.

---

## Tables That Matter

### `public.buyers`

Pro entitlement oracle.

Relevant fields:

- `email`
- `source`
- `purchased_at`
- `is_active`
- `metadata`

Practical rule:

- if the email is not active in `buyers`, `check-email` will not return `isBuyer: true`
- to "grant Pro access", this is the primary write

### `public.buyer_validations`

Cache/record of buyer validation per authenticated user.

Relevant fields:

- `user_id`
- `email`
- `is_valid`
- `validated_at`
- `expires_at`

Practical rule:

- it is a support/cache table
- it is not the first write for a manual grant
- it can be inspected during diagnosis, but provisioning must prefer `buyers`

### `public.licenses`

Licenses issued by the backend.

Relevant fields:

- `key`
- `customer_email`
- `features`
- `max_seats`
- `expires_at`
- `user_id`

Practical rule:

- relevant for issuance/existing license
- do not use it as the first mechanism for a manual access grant

### `public.activations`

Activations per machine.

Relevant fields:

- `license_id`
- `machine_id`
- `activated_at`
- `deactivated_at`

Practical rule:

- it only comes into play when the problem is activation/seat/machine lifecycle
- it is not a standard step for creating access or resetting a password

---

## Non-Negotiable Rules

- do not rediscover the Supabase project for AEXOS-Pro access ops
- do not write to `full-agent` to solve licensing
- do not infer a schema different from the one already confirmed above
- do not close the task without validating on the real service
- do not expose `service_role`, `anon`, JWT, reset token or access token
- do not consume seat/activation without an explicit need
- do not write to `licenses` to solve a case that is only buyer/auth
- do not use `buyer_validations` as a substitute for `buyers`

---

## Mandatory Diagnostic Order

Every task must follow this order, even when what is wrong seems obvious:

1. `check-email`
2. `login` if there is a password (read-only, classifies auth quickly)
3. `auth admin` by email
4. `buyers` by email
5. `buyer_validations` only if there is doubt about cache/intermediate state
6. `licenses` by `customer_email` only if the problem includes the license
7. `activations` only if the problem includes machine/seat

> This order is the same as the [Better Triage Order In Practice](#better-triage-order-in-practice) section below — a single canonical list. `check-email + login` classifies most cases without a write.

Rationale:

- this order minimizes writes
- it avoids touching the license when the problem is only auth
- it avoids touching auth when the problem is only buyer
- it avoids consuming a seat during basic support

---

## Decision Tree

### Case A

`check-email => isBuyer=false, hasAccount=false`

Do:

1. `signup`
2. confirm the email as admin if immediate access is required
3. insert into `buyers`
4. revalidate `check-email`
5. validate `login`

### Case B

`check-email => isBuyer=false, hasAccount=true`

Do:

1. locate the auth user
2. insert into `buyers` if absent
3. if login fails with `EMAIL_NOT_VERIFIED`, confirm the email as admin or resend verification
4. revalidate `check-email`
5. validate `login`

### Case C

`check-email => isBuyer=true, hasAccount=true`, but login fails with `EMAIL_NOT_VERIFIED`

Do:

1. confirm the email as admin or resend verification
2. revalidate `login`

### Case D

`check-email => isBuyer=true, hasAccount=true`, but login fails with `INVALID_CREDENTIALS`

Do:

1. `request-reset` if the flow is self-service
2. or a manual admin password update if support needs to deliver a temporary password
3. validate `login`

### Case E

`check-email => isBuyer=true, hasAccount=false`

Do:

1. treat it as an inconsistent state
2. inspect auth admin
3. create the account only after confirming the user is absent
4. do not touch the license before resolving auth

---

## Standard Validation Sequence

Every task must end with this sequence:

1. validate `check-email`
2. validate `login` if a password is known
3. only validate `activate-pro` if the task's goal is a real activation on a machine

Expected states:

- access granted:
  - `isBuyer: true`
  - `hasAccount: true`
- login working:
  - status `200`
  - `emailVerified: true`

If the task cannot prove these states, it is not complete.

---

## Evidence Pack Required

Every operational execution must produce a minimum evidence package:

- initial result of `check-email`
- existence or absence of the user in auth
- existence or absence of the email in `buyers`
- writes performed
- final result of `check-email`
- final result of `login`, if applicable

Expected summary format:

- `initial_check`
- `auth_state`
- `buyer_state`
- `writes`
- `final_check`
- `final_login`

---

## Playbook 1: Create New Pro Access

### Use When

- the email does not have an account yet
- the email needs to gain Pro access
- there is an initial password defined for onboarding/manual setup

### Inputs

- `email`
- `password`
- source of the grant, e.g.: `manual`
- operational reason

### Steps

1. check `POST /api/v1/auth/check-email`
2. if `hasAccount: false`, create the account with `signup`
3. locate the user in `auth admin`
4. confirm the email as admin if the operation requires immediate access
5. check whether a record exists in `public.buyers`
6. if it does not exist, insert an active buyer
7. revalidate `check-email`
8. validate `login`

### Writes Allowed

- create the `auth user`
- insert a row into `buyers`
- admin update of email confirmation

### Writes Not Allowed

- create an activation
- invent a row in `licenses`
- change other tables outside the flow

### Success Criteria

- `isBuyer: true`
- `hasAccount: true`
- `login` returns `200`
- `emailVerified: true`

### Minimal Data Write

- `auth user`
- `public.buyers`

---

## Playbook 2: Grant Pro To An Already Existing Account

### Use When

- the user already has an account
- the problem is only a missing entitlement

### Steps

1. check `POST /api/v1/auth/check-email`
2. confirm that `hasAccount: true`
3. check `public.buyers` by email
4. if absent, insert an active buyer
5. revalidate `check-email`
6. validate `login` if the password is known

### Writes Allowed

- insert or fix `buyers`
- admin update of email confirmation, if needed to unblock login

### Success Criteria

- `isBuyer: true`
- existing account preserved
- no extra write beyond `buyers`, unless explicitly needed

---

## Playbook 3: Resend Email Verification

### Use When

- the account exists
- login fails because the email is not confirmed
- confirming as admin immediately is not desirable

### Steps

1. confirm that the account exists
2. call `POST /api/v1/auth/resend-verification`
3. record that the user needs to open the link received
4. if the operation requires an immediate grant, use Playbook 4

### Output Contract

- state explicitly whether there is still a dependency on user action
- do not report "access resolved" if it still depends on the inbox

### Success Criteria

- the endpoint responds successfully
- the communication makes it clear that user action is still required

---

## Playbook 4: Confirm Email As Admin

### Use When

- an account exists
- the email is not confirmed
- it is necessary to unblock access immediately without waiting for the inbox

### Steps

1. locate the user in `auth admin`
2. apply an admin update with `email_confirm: true`
3. revalidate login

### Why This Exists

- it avoids blocking immediate access because of an inbox dependency
- it is the support path when the operation cannot wait for the user's email

### Success Criteria

- `email_confirmed_at` filled in
- `login` returns `200`

### Caution

- use it only when the process allows an administrative override

---

## Playbook 5: Password Reset

### Use When

- the user forgot the password
- it is not necessary to impose a manual password as admin

### Steps

1. confirm whether the account exists
2. call `POST /api/v1/auth/request-reset`
3. guide the use of `https://aexos-license-server.vercel.app/reset-password`
4. do not change the entitlement during the reset

### Important Distinction

- a password reset does not fix the buyer
- a password reset does not fix an unconfirmed email
- a password reset is only for credentials

### Success Criteria

- request-reset responds successfully
- the user can follow the recovery flow

---

## Playbook 6: Set A New Password Manually

### Use When

- support needs to set an initial or temporary password
- the operation is administrative and explicit

### Steps

1. locate the user in `auth admin`
2. update the password as admin
3. validate `login` with the new password

### When Preferred Over Request Reset

- assisted onboarding
- executive/manual support
- environment where the initial password must be delivered explicitly

### Success Criteria

- login with the new password works
- no other table is changed unnecessarily

---

## Playbook 7: Diagnose Access Failure

### Use When

- the user says "I can't sign in"
- Pro access does not activate
- it is not clear whether the problem is auth, buyer or license

### Diagnostic Order

1. `check-email`
2. `auth admin users` by email
3. `buyers` by email
4. `login`
5. `licenses` by `customer_email`
6. `buyer_validations` by `email` or `user_id`

### Better Triage Order In Practice

Use this prioritization:

1. `check-email`
2. `login`
3. `auth admin`
4. `buyers`
5. `buyer_validations`
6. `licenses`
7. `activations`

Reason:

- `check-email + login` already classify most cases without a write

### Interpretation

- `isBuyer: false` and `hasAccount: false`
  - account missing and entitlement missing
- `isBuyer: false` and `hasAccount: true`
  - account exists, buyer missing
- `isBuyer: true` and login fails with `EMAIL_NOT_VERIFIED`
  - buyer ok, email confirmation missing
- `isBuyer: true` and login fails on credentials
  - entitlement ok, the problem is the password

- `isBuyer: true`, login ok, activation fails
  - leave the access ops scope and open a license/activation investigation

---

## Minimal Command/Action Contract For Tasks

A good task for the squad-creator must not ask to "investigate how to do it".

It must state explicitly:

1. which reads it will perform first
2. which minimal write it will perform in each branch of the decision tree
3. which final validation will prove success
4. which writes are forbidden in that case

Example of a bad contract:

- "check Supabase and resolve access"

Example of a good contract:

- "run check-email; if hasAccount=false create the auth user; if the buyer is absent insert into buyers; confirm the email as admin only if immediate access is required; validate check-email and login"

---

## Expected Task Outputs

Every task generated from this handoff must return:

- action performed
- target email
- writes performed
- final state of `check-email`
- final state of `login`, if applicable
- remaining pending items, if any

It must also return:

- classification of the case in the decision tree
- reason for each write performed
- explicit confirmation that no activation/seat was consumed, unless explicitly requested

---

## Squad-Creator Task Briefs

### Brief A: Create New AEXOS-Pro Access

```md
Create an operational task to create new AEXOS-Pro access on the already known licensing backend.

Fixed context:
- service: https://aexos-license-server.vercel.app
- Supabase project: evvvnarpwcdybxdvcwjh
- buyer oracle: public.buyers

The task must:
- run check-email and classify the case
- receive the email and initial password
- create the account if it does not exist
- confirm the email as admin when needed for an immediate grant
- insert an active buyer if absent
- validate via check-email and login
- list allowed and forbidden writes

Done:
- isBuyer=true
- hasAccount=true
- login 200
```

### Brief B: Grant Pro To An Existing Account

```md
Create an operational task to grant the Pro entitlement to an account that already exists in AEXOS-Pro.

Fixed context:
- service: https://aexos-license-server.vercel.app
- Supabase project: evvvnarpwcdybxdvcwjh
- entitlement table: public.buyers

The task must:
- confirm the account exists
- insert an active buyer only if absent
- confirm the email as admin only if login fails as not verified
- revalidate check-email
- validate login if a password is provided

Done:
- isBuyer=true
- account preserved
```

### Brief C: Resend Verification

```md
Create an operational task to resend the AEXOS-Pro email verification.

Fixed context:
- service: https://aexos-license-server.vercel.app
- Supabase project: evvvnarpwcdybxdvcwjh

The task must:
- confirm that the account exists
- call resend-verification
- report clearly whether it still depends on user action
- forbid a "resolved" conclusion without proof of login, unless the explicit goal is only the resend
```

### Brief D: Confirm Email As Admin

```md
Create an operational task to confirm, as admin, the email of an AEXOS-Pro account.

Fixed context:
- auth backend: Supabase Auth of the project evvvnarpwcdybxdvcwjh

The task must:
- locate the user by email
- apply email_confirm=true
- validate login after the confirmation
- state that it must not touch buyers/licenses if the problem is only verification
```

### Brief E: Password Reset

```md
Create an operational task for an AEXOS-Pro password reset.

Fixed context:
- service: https://aexos-license-server.vercel.app
- recovery page: https://aexos-license-server.vercel.app/reset-password

The task must:
- confirm the account exists
- call request-reset
- report the next step for the user
- state that a reset resolves neither the buyer nor the email verification
```

### Brief F: Access Failure Diagnosis

```md
Create an operational task to diagnose why a user cannot access AEXOS-Pro.

Fixed context:
- service: https://aexos-license-server.vercel.app
- Supabase project: evvvnarpwcdybxdvcwjh
- relevant tables: buyers, buyer_validations, licenses, activations

The task must:
- run check-email
- test login early to classify the error
- check the auth user
- check buyers
- classify the failure as: missing account, missing buyer, unconfirmed email, invalid password or license problem
- list the exact next playbook to execute
```

---

## Definition Of Done

- the task starts from the correct fixed context
- the task does not waste time rediscovering project/licensing
- the task executes only the relevant playbook
- the task validates on the real service
- the final result is objective and auditable

---

_Last Updated: 2026-04-19 | AEXOS Ops_

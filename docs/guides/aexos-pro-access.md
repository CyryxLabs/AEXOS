# How to access AEXOS Pro

AEXOS Pro and the Pro squads are available only to users with an active entitlement. Normal access is done through email and password authentication; the `PRO-XXXX-XXXX-XXXX-XXXX` key still exists as a legacy path.

## Who has access

- Eligible members of the AEXOS Cohort Advanced.
- Users already registered as Pro buyers/beneficiaries.
- Accounts whose email was recognized by the Pro license service.

If the installer replies that it did not find access for the email, the problem is with the entitlement or the account, not with npm. In that case, ask support/DevOps for access validation.

## Install and activate

In the project where you want to use Pro:

```bash
npx github:CyryxLabs/AEXOS pro setup
```

The guided setup offers two paths:

- Email and password: the recommended path.
- License key: legacy path for `PRO-...` keys.

In automation/CI, use environment variables:

```bash
export AEXOS_PRO_EMAIL="your-email@example.com"
export AEXOS_PRO_PASSWORD="your-password"
npx github:CyryxLabs/AEXOS pro setup
```

Or, for a legacy key:

```bash
export AEXOS_PRO_KEY="PRO-XXXX-XXXX-XXXX-XXXX"
npx github:CyryxLabs/AEXOS pro setup
```

## Verify access

After installing:

```bash
npx github:CyryxLabs/AEXOS pro status
npx github:CyryxLabs/AEXOS pro features
npx github:CyryxLabs/AEXOS pro validate
```

These commands check the license, list the available Pro features and force an online revalidation when needed.

## Pro Squads

The Pro squads are delivered by the private Pro package and synchronized by the installer to the local surfaces supported by AEXOS. After installation, use the status/features commands above to confirm that the Pro package was found and activated.

If the squads do not show up after a successful installation, run:

```bash
npx github:CyryxLabs/AEXOS pro update
npm run sync:ide
```

## Access recovery

To recover a password or license:

```bash
npx -y @aexos-squads/aexos-pro-cli@latest recover
```

If the purchased email is not recognized, or if the account exists but activation fails, the correct operational flow is to engage `@devops` with one of these commands:

- `*pro-check-access` to look up entitlement and account.
- `*pro-request-reset` to trigger a password reset.
- `*pro-resend-verification` to resend email verification.
- `*pro-access-grant` to grant or restore access with API and installer validation.

## Common errors

- `No AEXOS Pro access found for this email.`: the email does not have a Pro entitlement yet, or it was typed differently from the registration.
- `AEXOS Pro is not installed.`: run `npx github:CyryxLabs/AEXOS pro setup` before status/validate.
- `Invalid key format`: the legacy key must follow the `PRO-XXXX-XXXX-XXXX-XXXX` format.
- Failure in CI without an interactive prompt: set `AEXOS_PRO_EMAIL` + `AEXOS_PRO_PASSWORD` or `AEXOS_PRO_KEY`.
- `Pro activation failed: Installed Pro artifact did not create node_modules/@aexos-squads/pro.`: bug in versions `5.2.5` and earlier — fixed as of `@aexos-squads/core@5.2.6`. Update with `npx github:CyryxLabs/AEXOS install`. If it persists, see [installation-troubleshooting.md → Issue 10](installation-troubleshooting.md#issue-10-pro-activation-failed-installed-pro-artifact-did-not-create-node_modulesaexos-squadspro) for the complete recovery kit.

Never share a password, token or full license key in public issues. For support, send only the email and the symptom.

# Authority Boundary Checklist

**Checklist ID:** OPS-CL-005
**Referenced by:** `@ops:ops-chief` (Fulcrum) — and applicable to **every** artifact this squad
produces, from any of its five agents.
**Applied to:** Any squad output before it is circulated, handed off, or acted on.
**Verdict:** PASS / **BLOCK** — there is no conditional pass in Section 1.

[[LLM: INITIALIZATION — BOUNDARY REVIEW

This is the checklist for the number one risk in this squad: an artifact that reads as authorized to
operate infrastructure when it is not.

The risk is not carelessness. It is that operations policy naturally reads as instruction. "Stop the
line", "freeze releases", "roll it back", "gate the pipeline", "fail over" — every one of those is
something this squad can write a rule about, and none of them are things this squad can do. A
well-written policy makes the action sound decided, and a decided action sounds permitted.

Section 1 is binary. Any unchecked item BLOCKS circulation. There is no score that compensates.

Run this LAST, after the discipline-specific checklist, and run it on every artifact — including
ones that seem obviously safe. The dangerous artifacts are the ones that sound operational, and
those are exactly the ones an author feels confident about.]]

---

## 1. Hard blocks — every item must be checked

- [ ] **No sentence in the artifact performs a deploy, rollback, failover, restart, scaling or
      configuration change**
- [ ] **No sentence instructs any agent other than `@devops` to perform one**
- [ ] **No sentence changes, or instructs a change to, CI, a build system, a pipeline, a branch
      protection rule, a merge block or a release path**
- [ ] **No sentence executes a gate, a freeze or a hold**
- [ ] **No sentence publishes to a status page or any external channel**
- [ ] **No sentence performs `git push`, opens a PR, or configures MCP**
- [ ] **Every consequence the artifact defines names the agent authorized to execute it**
- [ ] **Every consequence touching a running system names `@devops`**
- [ ] **The artifact contains an explicit statement that it decides and does not operate**
- [ ] **No exception is granted anywhere for severity, urgency, seniority, time of day or
      convenience**

**Any unchecked item above: BLOCK. Do not circulate. Repair and re-run.**

> The test that resolves nearly every case: **if it changes a running system, it is not ours. If it
> changes what we have agreed to do, it is.**

---

## 2. The artifacts most likely to fail Section 1

Check these against their specific trap before concluding they passed.

| Artifact | The trap |
|---|---|
| **Stop-the-line / andon policy** | Sounds operational because it describes a halt. Writing "the line stops when the build breaks" is method; stopping it is an operation. Every mechanical consequence must name `@devops`. |
| **Error budget policy** | "Releases are frozen" reads as a mechanism. It is a rule. The gate is `@devops`, on the named decider's call. |
| **Constraint analysis naming the pipeline or release cadence** | The strongest possible argument for changing something this squad cannot change. The finding and the exploit rule are the deliverable; the change is `@devops`' decision. |
| **Incident record and command structure** | Urgency is the argument that gets made for crossing the line, which is why the line exists. Every mitigation entry records `@devops` as executor. |
| **Corrective action lists** | Actions routed to "the team" or with no routing column. Each one names the agent whose authority covers it — and some belong to no agent at all. |
| **Alert and signal specification** | "Alert when X" reads as configuration. It is a specification. Collection, routing, thresholds and paging are `@devops`; emitting the data is `@dev`. |
| **Consolidated brief** | Aggregation makes a recommendation sound like a decision that has already been taken. |

---

## 3. Non-`@devops` boundaries — checked with the same discipline

- [ ] Implementation, instrumentation and automation are routed to `@dev`, not written as work this
      squad performs
- [ ] **No artifact weakens, bypasses, shortens or waives a quality gate** — gate questions go to
      `@qa` as a redesign question, never as permission
- [ ] Backlog order and story scope are addressed to `@po` as evidence; story drafting to `@sm`
- [ ] Working agreements are recorded by `@sm`, not declared here
- [ ] Architecture, redundancy topology and failure domains are routed to `@architect`
- [ ] Epic framing and roadmap consequences are routed to `@pm`
- [ ] Schema, query and data-instrumentation work is routed to `@data-engineer`
- [ ] Ownership, staffing and organizational decisions are marked as **human decisions no agent
      authority covers**

## 4. Routing hygiene

- [ ] **The routing does not imply an authority the receiving agent does not hold**
      *An authority violation manufactured one hop away from this squad is still this squad's.*
- [ ] Exactly one owning specialist is named — not a broadcast to several
- [ ] Where several are needed, they are sequenced by dependency with a stated reason
- [ ] An active incident was routed to `@ops:incident-lead` immediately, without triage ceremony
- [ ] A handoff brief exists so the receiving agent does not re-elicit context
- [ ] Any reframe of the request was stated out loud and confirmed, not applied silently

## 5. Provenance and honesty

- [ ] No statement in a consolidated brief lacks a source artifact
      [Constitution Article IV — No Invention]
- [ ] Contradictions between artifacts are surfaced with the differing assumption named, not averaged
- [ ] No two evidenced policies were compromised into an unevidenced third
- [ ] Safety, data-loss and user-harm concerns are surfaced **before** the decision, never
      summarized into a closing caveat
- [ ] Figures not traced to measured data are marked UNVERIFIED
- [ ] Attribution is accurate: methods are attributed to their published sources; later convention is
      labelled as convention; the broader lean tradition is labelled as tradition; and the incident
      discipline is stated as having no single author rather than being given one

## 6. Persistence

- [ ] The artifact is a versioned file in the repository, not a chat message or a dashboard
      configuration [Constitution Article I — CLI First]
- [ ] It has a named owner and a review date
- [ ] Handoffs across an agent boundary produced a handoff record
      [Constitution Article II — Agent Authority]

---

## 7. Verdict

| Verdict | Condition |
|---|---|
| **BLOCK** | Any Section 1 item unchecked — no exceptions, no score compensates |
| **BLOCK** | Any CRITICAL-equivalent failure in Section 3 (gate weakening, `@qa` bypass) |
| **PASS with fixes** | Sections 4–6 gaps only, listed and assigned |
| **PASS** | All sections clear |

## 8. If this checklist blocks an artifact during an incident

It still blocks. Urgency is the exact argument that gets made every time this line is crossed, which
is why the line is drawn where it is.

The authority statement costs one sentence: `@devops` executes deploys, rollbacks, failovers,
restarts, scaling, pipeline and release actions. Everything this squad produces is a decision or a
document. Adding the sentence does not make the action slower — `@devops` still performs it — it
preserves the record of who decided and who acted, which is the part that is needed afterwards.

The fastest correct move when something is failing is `@ops:incident-lead` `*declare`. Ninety
seconds, and every action from then on is coordinated and recorded against whoever executed it.

## Attribution

This checklist enforces the **AEXOS Constitution** — Article I (CLI First), Article II (Agent
Authority), Article IV (No Invention) — and the delegation matrix in `.claude/rules/agent-authority.md`.
It applies no external methodology and is not attributed to any published source.

The disciplines it is applied to are attributed in their own artifacts: *Site Reliability
Engineering* (O'Reilly, 2016) for reliability; Eliyahu M. Goldratt's *The Goal* (1984, with Jeff Cox)
for flow; Taiichi Ohno's *Toyota Production System: Beyond Large-Scale Production* (Japanese 1978 /
English translation 1988) for lean; and, for incidents, a discipline with no single author.

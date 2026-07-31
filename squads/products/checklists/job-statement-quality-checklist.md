# Job Statement Quality Checklist

**Checklist ID:** PRD-CL-003
**Squad:** products
**Referenced by:** jobs-analyst (Plumb)
**Applies to:** any job statement, repaired draft, or job spec before its status leaves `draft`
**Purpose:** Gate a job statement on the five properties that make it usable — solution-free,
durable, built on circumstance rather than attribute, three dimensions present and evidenced, and
traceable clause by clause to a switch interview id. Produces a scored verdict.

[[LLM: INITIALIZATION INSTRUCTIONS — JOB STATEMENT QUALITY

This checklist gates an artifact, it does not write one. Run it against a statement that already
exists, produced by `*job-statement` from switch interview evidence.

EXECUTION APPROACH:
1. Load the job artifact and the transcripts it cites. Do not run this from the statement alone —
   half the items check whether a citation actually supports the clause.
2. Mark [x] only when the item is satisfied AND you can say why in one line. An item marked [x]
   with no reason is not a check.
3. Mark [ ] for fail, [N/A] only where the item genuinely cannot apply (e.g. persona annotation
   when no persona exists).
4. BLOCKING items are marked (BLOCKING). Any BLOCKING failure caps the verdict at FAIL regardless
   of the score. These are the items that make a job statement structurally unusable rather than
   merely weak.
5. Compute the score, apply the verdict table, and write the fix list in priority order.

This gate is non-destructive — it reads and reports. Repairs are made by re-running
`*job-statement`, not by editing inside this checklist.]]

---

## 1. Solution-Free Gate (BLOCKING)

The statement must survive the death of your product. A statement naming your product cannot be
used to discover a better one.

- [ ] **(BLOCKING)** The statement contains no product name, internal or competitor
- [ ] **(BLOCKING)** The statement contains no feature name (dashboard, report, integration, alert,
      workflow, single pane of glass)
- [ ] **(BLOCKING)** The statement contains no technology name (AI, ML, LLM, blockchain, real-time
      streaming, agentic)
- [ ] The statement contains no interface noun standing in for a mechanism (screen, view, panel,
      feed, inbox)
- [ ] The statement contains no vendor category label (CRM, BI tool, CDP, observability platform)
- [ ] The motivation clause describes what they want to be ABLE TO DO, not what they want to have
- [ ] Removing every mechanism from the statement leaves it still meaningful, not empty

**Diagnostic.** Read the statement aloud and ask what could satisfy it. If the answer is one
product shape, a mechanism is still embedded. A well-formed statement admits several unrelated
solutions — a weekly automated digest, a person, a scheduled call — and that plurality is the
point, not a defect.

## 2. Durability Test (BLOCKING)

A job statement is stable over time; solutions are not.

- [ ] **(BLOCKING)** The statement would still be true if the entire product category disappeared
- [ ] The statement would not be obsolete in five years
- [ ] The statement would have been true five years ago, when the current solution did not exist
- [ ] The statement does not depend on a delivery channel that could change (email, mobile, chat)
- [ ] The statement does not depend on a current organisational structure that could be reorganised
- [ ] The progress described is the same progress a person would have sought before any software
      existed for it

**Diagnostic.** Delete your company and every competitor from the world, then re-read the
statement. If the struggle still happens and someone still needs to make that progress, it is a
job. If the statement becomes incoherent, it was a solution description.

## 3. Circumstance-Not-Attribute Test (BLOCKING)

Attributes correlate. Circumstances cause. That a buyer is a 35-year-old suburban parent is an
attribute of the person; it did not make them buy anything.

- [ ] **(BLOCKING)** The circumstance clause names a situation, not a role, demographic or
      firmographic
- [ ] **(BLOCKING)** The circumstance has a trigger — something that happened, not a standing
      condition
- [ ] The circumstance can be positioned in time. It explains why the search started then rather
      than a year earlier
- [ ] Applying the two-people diagnostic: two people sharing any attribute named in the statement
      could NOT be in opposite circumstances. (If they could, the attribute is not doing the causal
      work — replace it with the circumstance that is)
- [ ] No stated preference everyone shares is used as a differentiator ("values data-driven
      decisions", "wants to save time")
- [ ] Any attribute retained in the artifact is explicitly labelled as a targeting filter, kept out
      of the causal explanation
- [ ] The struggling moment is named in the customer's own words, not paraphrased into product
      vocabulary
- [ ] The struggling moment is anchored in time, place and who was present

**Worked contrast.** "As a marketing manager" predicts who is in the room. "When my CEO asks in
Monday standup which channel drove last week's pipeline and I have to say I will get back to them"
predicts a purchase, because it has a trigger, a recurrence and a witness. Two marketing managers
can be in opposite circumstances; two people in that Monday standup cannot.

## 4. Progress, Not Activity

- [ ] The expected-progress clause describes a better situation reached, not an action performed
- [ ] "And then what?" has been asked of the progress clause until the answer stopped being an
      activity
- [ ] The statement does not stop at an intermediate step (seeing, accessing, tracking, monitoring)
- [ ] The progress is something the customer would recognise as a change in their situation, stated
      in language they used

**Diagnostic.** "So I can see all my metrics in one place" fails — seeing is not the point;
something happens after seeing. "So I can stop being seen as the person who spends money without
proving it" passes: it names a change in their situation, not an action in your product.

## 5. Three Dimensions Present and Evidenced (BLOCKING)

Every job has functional, social and emotional dimensions. The functional dimension gets the
product considered; the social and emotional dimensions usually decide the purchase.

- [ ] **(BLOCKING)** All three dimensions are stated separately, not merged into one paragraph
- [ ] Functional — states the practical work to be done, not a feature list
- [ ] Functional — carries a transcript id and a verbatim quote
- [ ] Social — names the specific audience and the specific perception sought, not "wants to look
      good"
- [ ] Social — carries a transcript id and a verbatim quote
- [ ] Emotional — names the feeling sought or escaped specifically, not "wants confidence"
- [ ] Emotional — carries a transcript id and a verbatim quote
- [ ] Any dimension not recovered from the interviews is marked `not recovered` rather than inferred
- [ ] No dimension is supported by a quote that was given in answer to an anti-probe

**Diagnostic.** A statement with only a functional dimension is the most common incomplete result,
because the functional dimension is the one that shows up in feature requests. If social and
emotional are both blank, that is an interview gap, not an absence — route back to
`*switch-interview`.

## 6. Clause-Level Traceability (BLOCKING)

Constitution Article IV — No Invention. Every clause traces to a switch interview transcript id or
a named source.

- [ ] **(BLOCKING)** The circumstance clause cites at least one transcript id
- [ ] **(BLOCKING)** The motivation clause cites at least one transcript id
- [ ] **(BLOCKING)** The expected-progress clause cites at least one transcript id
- [ ] Every cited id resolves to a transcript that exists in the repository
- [ ] Every citation carries a verbatim quote, not a paraphrase
- [ ] Each quote actually supports the clause it is attached to (read them side by side — this is
      the item most often marked [x] without being checked)
- [ ] No clause is supported only by usage data, analytics or a workshop output
- [ ] Cited transcripts come from people who actually switched, or the fallback source is recorded
      with its limitation (recent churn, closed-lost, mined sales calls)
- [ ] The evidence base lists transcript ids, not just a count
- [ ] Where the sample is below the squad floor of five switch interviews, the artifact says so

**Diagnostic.** Cover the statement and read only the quotes. If a reader who had never seen the
statement would write something materially different from these quotes, the statement is running
ahead of its evidence.

## 7. Hire, Fire and Competition

- [ ] What was fired is recorded, alongside what was hired
- [ ] Hiring criteria are stated as conditions that had to be true, not as capabilities
- [ ] Firing criteria are stated specifically, not as "if it broke"
- [ ] The little hire — whether they actually used it — is recorded, not just the purchase
- [ ] The competitive set includes at least one non-same-category entry
- [ ] Non-consumption is explicitly assessed, not assumed away
- [ ] Frequency in the competitive set is recorded as `{n} of {N}`, not as an impression

## 8. Falsifiability and Scope

- [ ] A falsification condition is stated for the central causal claim
- [ ] The falsification condition names observable evidence, not a vague possibility of being wrong
- [ ] The falsification condition could discriminate between THIS statement and a different one
- [ ] The artifact does not claim a pattern from a single transcript
- [ ] The artifact contains no opportunity tree, positioning, price, experiment design, epic, PRD
      or story — those belong to `@discovery-lead`, `@positioning-lead`, `@pricing-strategist`,
      `@experimentation-lead`, `@pm` and `@sm` respectively
- [ ] The artifact is not written as a build instruction. A validated job is input to `@pm` and
      `@discovery-lead`, never a direct order to build

## 9. Artifact Hygiene

- [ ] The statement lives in the repository as a versioned markdown file, not only in a conversation
- [ ] The artifact has a stable job id and a status
- [ ] If an existing persona was supplied, it is annotated rather than deleted — persona for
      targeting, circumstance map for product decisions
- [ ] If the statement supersedes an earlier one, the prior id is recorded
- [ ] Method attribution is present and matches the approved source list, with no added citation

---

## Scoring

**Calculation:** (Checked items) / (Total items − N/A items) × 100

| Verdict | Score | Additional condition |
|---|---|---|
| **PASS** | 90–100% | No BLOCKING item failed |
| **CONCERNS** | 75–89% | No BLOCKING item failed. Usable with the named fixes attached |
| **FAIL** | Below 75% | — |
| **FAIL** | Any score | **Any BLOCKING item failed** — the score is irrelevant |

A statement at CONCERNS may be circulated with its fix list attached and its status left at
`draft`. Only a PASS moves the status to `evidenced`.

### Why BLOCKING overrides the score

A statement can satisfy thirty items and still be unusable if it names your product, if it dies
with the category, if it rests on an attribute, if it has one dimension, or if no clause cites a
transcript. These five failures are not deficiencies of degree — each one makes the artifact
answer a different question than the one it claims to answer. Scoring them alongside hygiene items
would let a well-formatted invention pass.

## Priority Fix Order

1. **Clause-level traceability** — an untraceable statement is invention (Article IV). Fix first;
   every other repair may change once the evidence is read.
2. **Solution-free** — a statement naming the product cannot discover a better one, so no
   downstream work built on it is safe.
3. **Circumstance-not-attribute** — an attribute-based statement sends the build at an average
   customer who does not exist.
4. **Durability** — a statement that dies with the category cannot outlive the roadmap it informs.
5. **Three dimensions** — usually an interview gap; route to `*switch-interview` rather than
   inventing the missing dimension.
6. **Progress not activity** — cheap to repair once the evidence is in hand.
7. **Falsifiability** — required before the statement informs any bet.
8. **Hire/fire and competition** — completes the competitive picture.
9. **Artifact hygiene** — last, and never a reason to hold a sound statement.

## Common Failure Signatures

| Signature | Underlying defect | Route to |
|---|---|---|
| Statement reads well, cites nothing | Written in a workshop (Article IV violation) | `*switch-interview` |
| Only the functional dimension is filled | Interview never left the feature conversation | `*switch-interview` |
| Circumstance is a role or a segment | Attribute doing the causal work | Repair via `*job-statement`, then `*circumstance-map` |
| Every quote comes from one transcript | Pattern claimed from an individual | `*switch-interview` for more switches |
| Competitive set is all same-category vendors | Supplier list, not a competitive set | `*job-competition` |
| Different switches point at different jobs | Two circumstances treated as one | `*circumstance-map` |

## Method attribution

- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, *Competing Against Luck:
  The Story of Innovation and Customer Choice* (2016) — the job as progress in a circumstance,
  hiring and firing, the job dimensions, the milkshake case.
- Clayton M. Christensen and Michael E. Raynor, *The Innovator's Solution* (2003), jobs chapter —
  circumstance-based versus attribute-based market segmentation.
- Clayton M. Christensen, Scott Cook and Taddy Hall, "Marketing Malpractice: The Cause and the
  Cure", *Harvard Business Review* (2005) — why organizations drift to attribute data.
- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, "Know Your Customers' Jobs
  to Be Done", *Harvard Business Review* (September 2016) — the job spec and organizational
  integration around the job.
- Bob Moesta with Greg Engle, *Demand-Side Sales 101: Stop Selling and Help Your Customers Make
  Progress* (2020) — the switch interview method and the four forces of progress.
- Anthony W. Ulwick, *Jobs to Be Done: Theory to Practice* (2016) — outcome-driven job statements
  and desired-outcome metrics.
- Alan Klement, *When Coffee and Kale Compete* (2016) — job-as-progress framing.

`@jobs-analyst` (Plumb) is a specialist applying these methods.

## Related

- Task: `squads/products/tasks/write-job-statement.md`
- Template: `squads/products/templates/job-statement-tmpl.yaml`
- Evidence source: `squads/products/tasks/run-switch-interview.md`
- Companion gate: `squads/products/checklists/causal-evidence-checklist.md` (PRD-CL-004)
- Theory reference: `squads/products/data/jtbd-reference.md`

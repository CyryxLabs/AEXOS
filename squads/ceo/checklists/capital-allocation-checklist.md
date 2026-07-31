# Capital Allocation Checklist

**Checklist ID:** CEO-CL-002
**Referenced by:** capital-allocator (Ledger)
**Method source:** William N. Thorndike Jr., *The Outsiders* (2012). The five uses of cash, the
three sources, the per-share measure and the opportunistic-repurchase pattern are documented
there and are marked as such. The procedures, thresholds and blocking rules below are this
squad's operating detail and are not attributed to Thorndike.

**Purpose:** Test whether a capital decision was *allocated* or merely *approved*. Run before
any capital plan, acquisition recommendation, repurchase, dividend, raise or budget is released.

> **Scope limit.** This checklist governs decision quality. It does not test regulatory, tax,
> accounting or securities compliance, and no item here may be read as clearing any of those.
> Section 9 exists to route them to a qualified human adviser.

[[LLM: INITIALIZATION — CAPITAL ALLOCATION AUDIT

Report FAILURES, not a score. Sections 1, 2, 3 and 6 are BLOCKING: a failure there voids
the recommendation rather than downgrading it.

The most common finding is not a bad number. It is a proposal evaluated on its own merits
that would have lost against an alternative nobody opened. Section 1 catches that, and it
is the reason it runs first.]]

---

## 1. All five doors — BLOCKING

*Cash has five destinations. A proposal is never asked "is this good"; it is asked "is this the
best available use of this cash". [SOURCE: Thorndike]*

- [ ] **Reinvestment in existing operations** appears as a row, with a candidate or a stated reason there is none
- [ ] **Acquisition** appears as a row, with a candidate or a stated reason there is none
- [ ] **Dividend** appears as a row, with a candidate or a stated reason there is none
- [ ] **Debt paydown** appears as a row, with a candidate or a stated reason there is none
- [ ] **Share repurchase** appears as a row, with a candidate or a stated reason there is none
- [ ] **Do nothing (hold)** appears as an explicit option, with its own return and a review date
- [ ] Doors nobody proposed were opened anyway — a door with no candidate was *evaluated*, not skipped
- [ ] The comparison is simultaneous, not sequential (the doors were not approved one at a time as proposals arrived)

**FAIL → the document is a proposal review, not an allocation.** Return it, name which doors were
never opened, and re-run.

---

## 2. One hurdle, fixed — BLOCKING

- [ ] A single hurdle rate is written down
- [ ] Its derivation is stated (best passive alternative / cost of capital with inputs shown / explicitly chosen threshold with reasoning)
- [ ] Its horizon is stated — a rate without a horizon is not comparable
- [ ] The risk-adjustment rule is stated: how much higher the bar sits for irreversible or poorly-evidenced proposals, and by what logic
- [ ] The hurdle is published beyond the person applying it
- [ ] The hurdle did **not** move during this evaluation

**FAIL on the last item → the evaluation is void.** A hurdle that moves to accommodate a favoured
proposal is not a hurdle. Re-run from the original rate, or revise the rate on the record first
and re-run everything with the new one.

---

## 3. Comparability — BLOCKING

- [ ] All returns are **after tax** (a pre-tax comparison across doors with different tax treatment is not a comparison)
- [ ] All returns are over a **common horizon**
- [ ] All returns are in the same units
- [ ] The dividend-versus-repurchase comparison explicitly addresses the tax-treatment difference, which usually dominates it
- [ ] Where returns are indistinguishable within the uncertainty of the estimates, the document says so rather than ranking them — and the choice then turns on reversibility, which is stated

---

## 4. The measure is per share

*[SOURCE: Thorndike — value per share rather than size.]*

- [ ] The result is expressed **per share**
- [ ] The **numerator** effect (free cash flow, after tax, over the horizon) is shown
- [ ] The **denominator** effect is shown **separately**: equity compensation issuance, convertible instruments, and any equity issued to fund the proposal
- [ ] A numerator gain masking a denominator loss would be visible in how this is presented
- [ ] If the proposal raises total revenue, total earnings or headcount while lowering per-share value, it is named as expansion rather than progress, in those words
- [ ] Shares outstanding is treated as a live variable, not a constant

---

## 5. Cash versus earnings

- [ ] The walk from reported earnings to free cash flow is shown line by line
- [ ] Every material divergence is explained **before** either figure enters a decision
- [ ] The document states which figure the return case actually depends on
- [ ] A case that works on earnings and fails on cash is named as a case about accounting

---

## 6. Downside case before base case — BLOCKING

- [ ] The downside case was written **before** the base case, so the base case did not anchor it
- [ ] Failure is described as **mechanisms**, not as a probability percentage
- [ ] Where there is no evidence about a mechanism's likelihood, the document says so rather than assigning a number
- [ ] What the company still owes on failure is stated: cash, contract, headcount, reputation
- [ ] Recoverability and the recovery period are stated
- [ ] An early indicator of the downside materialising is named, with a named watcher and a frequency

**FAIL → the proposal has not been evaluated.** A base case alone is a hope with arithmetic.

---

## 7. Guards

- [ ] **Sunk cost:** nothing in the recommendation rests on money already spent. Diligence expense, prior investment and accumulated commitment are excluded from the forward decision
- [ ] **Peer / consensus:** any "everyone is doing this" argument is recorded separately from the return case, and is not doing work the return case cannot do on its own
- [ ] **Management attention:** priced as a cost in the same units as everything else. It is the scarcest input and the one most often omitted
- [ ] **False precision:** no figure is reported to more precision than its inputs support. Ranges where ranges are honest
- [ ] **Denominator blindness:** share count changes from every source are counted, not just the headline transaction
- [ ] **Advocacy separation:** the person proposing the use of cash is not the sole source of the estimates behind it, or the document says that they were

---

## 8. Door-specific tests

### Reinvestment
- [ ] Return is **incremental**, not average — what the next unit of capital earns, not what the business earns overall (average returns hide a saturated core)
- [ ] The constraint being relieved is named, with evidence that it is currently binding
- [ ] Cross-checked against any chain-link analysis from `@ceo:strategy-lead` — spending on a non-limiting link produces no system gain
- [ ] The **saturation point** is reported: the spend level at which return falls below the hurdle
- [ ] Displacement is stated: what this consumes that another action requires

### Acquisition
- [ ] Price is compared to a defensible estimate of the target's free cash flow, with the estimate's inputs and their sources shown
- [ ] Return is computed **at the purchase price**, after tax, over a stated horizon — not at a synergised future state
- [ ] Cost synergies and revenue synergies are separated, revenue synergies carry lower confidence, and the result is **also shown without them**
- [ ] Integration cost is estimated, including management attention
- [ ] The downside case ran first
- [ ] The other four doors were compared at the same hurdle — an acquisition clearing the hurdle but losing to repurchase or reinvestment is second place, not an approval
- [ ] Legal, tax, competition-law and employment consequences are flagged for qualified human advisers

### Repurchase
- [ ] An intrinsic-value estimate exists, with inputs and an uncertainty range. **Without it there is no test, only a share-count reduction**
- [ ] The implied return at the current price is compared directly against the other four doors
- [ ] The asymmetry is stated: repurchase above intrinsic value destroys value for continuing holders, and is invisible in reported per-share figures for some time
- [ ] Funding source is stated; if from debt, `*debt-capacity` ran and coverage was modelled in the downside case first
- [ ] It is established whether share count is actually falling or issuance from equity compensation is being offset — these are different decisions
- [ ] Timing is classified: opportunistic and price-driven, or programmatic and calendar-driven. [SOURCE: Thorndike documents opportunistic, price-driven repurchase as the pattern among the executives studied.] A calendar-driven programme is labelled a distribution policy, not an investment decision
- [ ] Regulatory, disclosure and securities dimensions are flagged for qualified human counsel

### Dividend
- [ ] After-tax return to the holder is compared with the after-tax return of the alternatives
- [ ] The **commitment** is modelled: holders treat a dividend as a promise, and the cost of reducing it later — including the signalling consequence — is estimated
- [ ] The communication dimension is routed to `@ceo:stakeholder-lead`, not written here
- [ ] The future option foreclosed by the recurring obligation is named
- [ ] Tax-treatment questions are flagged for a qualified human adviser rather than answered

### Debt paydown / debt capacity
- [ ] Current position stated: outstanding debt, rates, maturities, covenants
- [ ] Coverage modelled under the base case **and** the downside case — the base case never triggers a covenant, so it is not the case that matters
- [ ] The maturity wall is identified, with what happens if credit conditions are poor at that moment
- [ ] What leverage forecloses is named: typically reinvestment and opportunistic repurchase, at exactly the moment both become cheapest
- [ ] A capacity level is recommended **with the reasoning**, not as a bare number

---

## 9. Adviser flags — never resolved here

- [ ] Every item with a tax consequence is flagged
- [ ] Every item with a securities, disclosure or filing consequence is flagged
- [ ] Every item with a competition-law consequence is flagged
- [ ] Every item with an employment consequence is flagged
- [ ] Every accounting treatment question is flagged
- [ ] Every contractual, covenant or counterparty consequence is flagged
- [ ] Each flag names the **kind of review** required and a **named human reviewer**
- [ ] No item in this document opines on any of the above

**This squad produces decision analysis. It does not give financial, tax or legal advice.**

---

## 10. Evidence and boundary

- [ ] Every figure carries a source and a date
- [ ] Assumptions are labelled as assumptions, not presented as figures
- [ ] Unsourced figures are marked UNVERIFIED and excluded from the plan (Constitution Article IV)
- [ ] A diagnosis and guiding policy from `@ceo:strategy-lead` exist and are named as the criterion — without them the allocation has no criterion
- [ ] Divergence between the allocation and the stated strategy, if present, is reported to `@ceo:ceo-chief` rather than quietly funded
- [ ] No decision rights, cadence or headcount design appears here (that is `@ceo:org-designer`)
- [ ] No board or investor narrative appears here (that is `@ceo:stakeholder-lead`)
- [ ] Nothing is attributed to Thorndike that the book does not document, and this squad's operating detail is labelled as this squad's

---

## Verdict

| Outcome | Condition | Next step |
|---|---|---|
| **VOID** | Any blocking section (1, 2, 3, 6) fails | Re-run. Do not repair in place — the comparison itself was invalid |
| **NOT AN ALLOCATION** | Section 1 fails specifically | Open the missing doors and re-run |
| **DEFECTS RECORDED** | Blocking sections pass; residual failures elsewhere | Release with each residual failure explicitly accepted and the reason stated |
| **CLEAN** | No failures | Release for human adviser review of Section 9 items, then decision |

A recommendation may be released with recorded defects. It may not be released with hidden ones.

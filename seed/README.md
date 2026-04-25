# Seed Data Overview

## What Scenario Lab Actually Is

`Scenario Lab` is the safe testing bench for policy changes.

It is not another dashboard.
It is not a full workflow builder.
It is not a fake drag-and-drop toy.

It does two jobs:

1. replay a proposed policy or threshold change against fixed seeded cases
2. optionally let AI draft one candidate rule from reviewed anomalies, then require human review and replay before anything is saved

That means the flow is:

`reviewed cases -> draft rule -> replay -> compare tradeoffs -> keep as draft`

Not:

`AI invents rule -> auto deploy`

## Should AI Build A Rule From 10 Past Anomalies?

Yes, but only as a `draft rule suggestion`.

That is a strong hackathon feature because:

- AI is being used for pattern synthesis, not fake deterministic enforcement
- the human can see the source cases
- the human can see which fields were included and excluded
- replay shows whether the rule is too narrow or too broad
- the final rule is still constrained by a deterministic policy engine

The right scope is:

- one anomaly cluster
- one AI-generated draft rule
- one replay comparison
- one save-as-draft outcome

The wrong scope is:

- full autonomous rule optimization
- many rule families
- auto deployment
- opaque model-driven thresholds

## What Fake Data Should Look Like

The fake data should look like ops data, not benchmark CSV sludge.

Good fake data has:

- one clear story per case
- internally consistent values
- enough history to justify a decision
- enough ambiguity that the human override still matters
- local context such as Malaysia-based users, MYR amounts, nearby corridors, realistic device and payout behavior

Bad fake data looks like:

- random rows with no narrative
- five unrelated alerts glued into one case
- exact copies of public fraud datasets
- unrealistic amounts with no baseline
- every case being obviously fraud or obviously clean

## Design Principles

1. Story first.
   Every case should read like a short incident report.
2. Keep the data replayable.
   Same seed in, same result out.
3. Separate facts from inferences.
   AI can summarize or propose. It should not mutate the facts.
4. Make overrideable ambiguity visible.
   The system should be confident enough to be useful, but not so certain that human review feels fake.
5. Keep the schema boring.
   Explicit fields beat magical nested blobs.

## File Map

- [DATA_CONTRACT.md](./DATA_CONTRACT.md): object shapes and field expectations
- [schema/enums.json](./schema/enums.json): allowed enum values
- [policies/policy-config.example.json](./policies/policy-config.example.json): example policy file and replay knobs
- [scenarios/watchlist-payout.template.json](./scenarios/watchlist-payout.template.json): scenario family template
- [cases/hero-watchlist-payout.case.json](./cases/hero-watchlist-payout.case.json): full hero case example
- [clusters/watchlist-reviewed-cases.example.json](./clusters/watchlist-reviewed-cases.example.json): 10 reviewed anomalies used for rule drafting
- [rule-proposals/watchlist-pattern-draft.example.json](./rule-proposals/watchlist-pattern-draft.example.json): AI-assisted draft rule proposal
- [replay/baseline-results.example.json](./replay/baseline-results.example.json): replay comparison output

## Recommended Demo Use

1. Load seeded queue data from the case examples.
2. Open the hero case and show the evidence ledger.
3. Open Scenario Lab with the current policy file.
4. Show the reviewed anomaly cluster.
5. Show the AI-assisted draft rule.
6. Replay that draft against the fixed seed set.
7. Keep it as draft and require analyst review.

## UI Constraint

Do not stuff Scenario Lab into the case page.

Keep it as a separate surface because the analyst is doing a different job there:

- case page: investigate one live case
- scenario lab: test whether a policy pattern is worth adopting

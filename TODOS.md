# TODOs

## P1 - Production watchlist adapters

What:
- Replace fake watchlist hits with provider adapters and cached result handling.

Why:
- The MVP can demo the workflow, but the production story needs real screening inputs.

Pros:
- makes the product credible beyond the hackathon
- unlocks real sanctions and PEP coverage

Cons:
- vendor integration work
- more edge cases around rate limits, stale data, and normalization

Context:
- The current plan treats screening as one signal inside the investigation layer.
- That is correct for the hackathon.
- The production version needs adapter boundaries so the rest of the graph and agent stack does not care which provider supplied the match.

Depends on / blocked by:
- stable `SignalSource` schema
- adapter interface design

## P1 - Customer rescue workflow

What:
- Add a step-up flow for suspected scam victims before irreversible transfers.

Why:
- Detection alone does not stop authorized push-payment scams.

Pros:
- stronger user impact story
- ties operations tooling back to customer safety

Cons:
- much more product surface
- false positives can annoy users

Context:
- Keep this out of the hackathon MVP.
- The right next step is a small intervention surface with plain-language explanations, a delay option, and a safe escalation path.

Depends on / blocked by:
- reliable confidence thresholds
- approval policy from compliance

## P2 - Analyst feedback learning loop

What:
- Capture analyst overrides and feed them back into prompts, policies, and scenario design.

Why:
- Without feedback, the agents stay static.

Pros:
- continuous improvement
- better local fit for TNG-specific abuse patterns

Cons:
- requires careful label quality
- can turn into noisy feedback plumbing

Context:
- The MVP already has human approvals.
- The next move is to log why analysts changed the recommendation, then use that data in weekly prompt and policy reviews.

Depends on / blocked by:
- action approval events
- evidence ledger stability

## P2 - Cross-border remittance pack

What:
- Add remittance-specific entities, scenarios, and policy templates.

Why:
- Cross-border flows create different AML and sanctions patterns than domestic wallet abuse.

Pros:
- wider coverage
- stronger compliance story

Cons:
- more domain complexity
- larger seeded data surface

Context:
- The current MVP focuses on wallet, merchant, device, and beneficiary patterns.
- Remittance should be a second vertical after the base graph is stable.

Depends on / blocked by:
- base entity graph
- policy templating

## P3 - Policy compiler and versioning UI

What:
- Turn policy JSON into readable rules with version history, diffing, and replay outputs.

Why:
- Risk and compliance teams need to know what changed and why a replay result moved.

Pros:
- strong governance story
- easier handoff between product, ops, and compliance

Cons:
- more UI and state management
- adds work outside the MVP's core loop

Context:
- The MVP can keep policies in one file and show the active version.
- A later version should let users compare `before/after` impact across scenarios.

Depends on / blocked by:
- scenario runner
- stable policy schema

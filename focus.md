# Focus

## Core Decision

Build the `AI-native pre-payout decision workspace for fraud + AML ops`.

Do not build the whole fraud ops platform.
Do not build a full no-code rules engine first.
Do not build a generic alert dashboard with AI sprinkled on top.

The wedge is:

`alert -> investigate -> recommend -> human decides -> export note -> replay policy`

The spike is the trigger, not the product.

## Is This Useful And Impressive Enough?

Yes, if we keep the scope sharp.

### Why it is useful

This solves a real fraud ops problem:

- which case matters now
- what evidence supports action
- what policy it maps to
- what the analyst should do before money leaves
- what gets logged for audit

This is closer to the actual analyst pain than another score or another queue.

### Why it is impressive

It gives a complete demo arc in under 4 minutes:

1. a risky payout appears
2. the case is investigated with grounded evidence
3. AI recommends an action and shows why
4. the human overrides or approves
5. the system exports a regulator-ready note
6. the team replays a policy change and shows the tradeoff

That is much stronger than "we built fraud detection."

### Why it can still fail

It becomes weak if we do any of these:

- build a queue with no real decision path
- make AI a black box with no evidence references
- build a fake rule builder with no replay value
- spread scope across too many scenarios
- make the human override invisible

## Product Call

### One-line pitch

`TNG RiskOps Agent turns fraud and AML alerts into evidence-backed pre-payout decisions, export-ready case notes, and replayable policy tradeoffs.`

### Primary user

- fraud ops analyst

### Secondary users

- AML investigator
- compliance lead
- risk product manager

### Core job to be done

Help an analyst decide faster, with better evidence, before money leaves.

## What To Build

Three pages only.

### 1. Queue / Command Center

Purpose:

- show the highest-priority cases fast
- make the spike visible
- route the analyst into one hero case

Must show:

- ranked cases
- risk level
- reason chips
- agent status
- one spike banner or anomaly card

Key interactions:

- click the spike banner to filter related cases
- click the top case to open investigation
- show why this case is at the top

What not to do:

- no heavy dashboard analytics surface
- no ten-chart overview page
- no giant alert table as the main product story

### 2. Case Investigation Workspace

Purpose:

- put all evidence, policy, AI reasoning, and action in one place

This is the core page.

Layout:

- left rail: ranked cases, reason chips, agent status
- center: evidence timeline, entity graph, facts, AI inferences, missing-data requests
- right rail: recommended action, policy citations, confidence, human controls, export note

Must answer four questions instantly:

1. What evidence did the system use?
2. What action does it recommend?
3. What policy did it map to?
4. What can the human override?

Key interactions:

- inspect linked entities
- expand evidence items
- distinguish `FACT` vs `INFERENCE` vs `POLICY`
- approve `HOLD`, `STEP_UP`, or `ESCALATE`
- override recommendation with mandatory human reason
- export case note

### 3. Scenario Lab / Replay

Purpose:

- prove that policy changes can be tested safely before rollout

Must show:

- current policy value
- proposed policy value
- fixed seeded scenarios
- bad payouts caught
- good users delayed
- deterministic rerun result

Key interactions:

- change one threshold or condition
- rerun the replay
- compare before vs after

What not to do:

- no full visual drag-and-drop rule builder
- no fake no-code DSL unless it directly drives replay

## Core Product Flow

### Hero flow

1. Queue shows a spike in risky cross-border payouts.
2. Analyst opens the highest-risk case.
3. Workspace shows linked wallet, device, beneficiary, and watchlist evidence.
4. Specialist agents produce findings and a recommendation.
5. Policy engine maps findings to specific policy lines.
6. Analyst chooses `HOLD`, `STEP_UP`, or `ESCALATE`.
7. System drafts and exports the case note.
8. Analyst opens Scenario Lab and tightens one policy threshold.
9. Replay shows the tradeoff.

### Backup flow

Use one second case for Q&A:

- dormant wallet takeover
- mule-ring collection

Do not build more than one backup case.

## Modules

Build these modules and no more.

### 1. Seed / Scenario Generator

Responsibility:

- create synthetic but realistic Malaysia-context cases
- ensure every case already tells a story

Output:

- users
- wallets
- devices
- beneficiaries
- merchants
- transactions
- alerts
- policies
- expected recommendation
- replay scenarios

Deterministic:

- yes

### 2. Case Ingest And Normalization

Responsibility:

- turn seeded alert events into one case record
- collapse duplicate alerts into a single investigation surface

Input:

- seeded alert events

Output:

- normalized case
- linked entities
- summary fields for queue ranking

Deterministic:

- yes

### 3. Entity Graph Resolver

Responsibility:

- connect user, wallet, device, beneficiary, merchant, email, phone, and watchlist entry
- score the confidence of each link

Important rule:

- do not silently merge ambiguous entities
- show uncertainty in the UI

Deterministic:

- yes

### 4. Policy Engine

Responsibility:

- evaluate which policies are triggered
- map evidence to policy citations
- constrain which actions are allowed

Important rule:

- no high-risk action without policy mapping
- no auto-approve when policy is missing

Deterministic:

- yes

### 5. AI Investigation Copilot

Responsibility:

- gather facts into a readable investigation
- explain why the case matters
- request missing information
- recommend a next step

Suggested specialist agents:

- `BEHAVIOR`
- `SANCTIONS`
- `POLICY`
- `REPORTER`
- `ORCHESTRATOR`

Important rule:

- AI does not make the final irreversible decision
- AI output must cite evidence IDs and policy IDs

Deterministic:

- no

### 6. Recommendation And Action Rail

Responsibility:

- show action options
- show current recommendation
- require human confirmation or override reason

Allowed actions:

- `ALLOW`
- `STEP_UP`
- `HOLD`
- `ESCALATE`

Hackathon note:

- do not expose `FREEZE` unless the policy + demo quality are strong enough

### 7. Report Draft And Export

Responsibility:

- turn evidence ledger + final action into an export-ready note

Must include:

- case summary
- facts used
- AI inferences
- policy citations
- final human action
- human approver or overrider
- audit timestamp

### 8. Replay Engine

Responsibility:

- rerun fixed scenarios against a changed policy
- compare outcomes

Important rule:

- same seed must produce the same result

Deterministic:

- yes

### 9. Audit Trail

Responsibility:

- log every important system and human action

Must capture:

- alert created
- case opened
- evidence added
- recommendation generated
- action approved
- override reason
- note exported
- replay run

Deterministic:

- yes

## What AI Should And Should Not Do

### AI should do

- evidence assembly
- case explanation
- missing-data prompts
- next-action recommendation
- policy reasoning in plain English
- note drafting

### AI should not do

- black-box risk scoring as the whole product
- raw rule execution
- final irreversible enforcement
- fake certainty
- unsupported claims without evidence IDs

## Data Creation Plan

Keep all data synthetic.

Make the data local and believable, not generic.

### Scenario families

Build three families:

1. `WATCHLIST_PAYOUT`
2. `DORMANT_TAKEOVER`
3. `MULE_RING`

Use one hero family and one backup family in the live demo.

### Suggested case count

- 8 to 12 total cases
- 1 hero case
- 1 backup case
- remaining cases only for queue realism

### For each case, seed these records

- `case`
- `user`
- `wallet`
- `device`
- `beneficiary`
- `merchant` if relevant
- `watchlist_entry` if relevant
- `transactions`
- `alerts`
- `entity_edges`
- `policies_triggered`
- `evidence_items`
- `ai_recommendation`
- `allowed_actions`
- `expected_final_action`
- `replay_outcomes`

### Hero case recommendation

Use:

- `near-watchlist cross-border payout`

Why:

- easy to understand in 20 seconds
- visually strong for evidence + policy + replay
- naturally supports `HOLD`
- easy to show tradeoff when tightening threshold

### Hero case facts to seed

- first cross-border payout to this beneficiary
- beneficiary alias similarity to watchlist above warning threshold but below hard block
- dormant wallet reactivated recently
- new device used
- payout amount much higher than recent baseline
- device or beneficiary linked to another reviewed case

### Example recommendation

- recommended action: `HOLD`
- confidence: `0.81`
- policy mapping: `POL-FRD-12`, `POL-AML-07`
- human override options: `STEP_UP`, `ESCALATE`, `ALLOW`

### How to create the seed data

Do not wait for a perfect fraud dataset.

Use this method:

1. Write 3 scenario templates in JSON or TS.
2. For each template, define the story, risk signals, linked entities, triggered policies, and expected action.
3. Generate 8 to 12 cases from those templates with slightly different values.
4. Precompute evidence items and replay results for demo stability.
5. Keep the data fixed for the demo build.

### Suggested seed file structure

```text
seed/
  scenarios/
    watchlist-payout.json
    dormant-takeover.json
    mule-ring.json
  cases/
    hero-watchlist-payout.json
    backup-dormant-takeover.json
  policies/
    policy-config.json
  replay/
    baseline-results.json
```

### Example scenario shape

```json
{
  "scenario_id": "watchlist-payout-001",
  "scenario_type": "WATCHLIST_PAYOUT",
  "title": "Near-watchlist cross-border payout",
  "recommended_action": "HOLD",
  "allowed_actions": ["STEP_UP", "HOLD", "ESCALATE"],
  "risk_signals": [
    "new_device",
    "dormant_wallet_reactivated",
    "beneficiary_name_similarity",
    "high_amount_vs_baseline"
  ],
  "policy_ids": ["POL-FRD-12", "POL-AML-07"],
  "evidence_ids": ["EV-101", "EV-102", "EV-103", "EV-104"]
}
```

## Data Model

Keep the schema boring and explicit.

Suggested tables:

- `cases`
- `entities`
- `entity_edges`
- `transactions`
- `alerts`
- `evidence_items`
- `agent_runs`
- `recommendations`
- `policies`
- `policy_matches`
- `audit_events`
- `replay_runs`

### Important enums

- `EntityType`: `USER`, `WALLET`, `DEVICE`, `MERCHANT`, `BENEFICIARY`, `WATCHLIST_ENTRY`
- `EvidenceKind`: `FACT`, `INFERENCE`, `POLICY`, `EXTERNAL_MATCH`
- `CaseStatus`: `NEW_ALERT`, `INVESTIGATING`, `READY_FOR_REVIEW`, `NEEDS_MORE_DATA`, `CLOSED`
- `RecommendationAction`: `ALLOW`, `STEP_UP`, `HOLD`, `ESCALATE`

## Page-Level Flow Contract

### Queue / Command Center

On load:

- show seeded cases
- highest-risk case is first
- spike banner is visible

On click:

- open the selected case
- preserve ranking context

### Case Investigation Workspace

On load:

- show case summary
- show evidence timeline
- show entity graph
- show facts vs inferences
- show recommendation + policy citations

On analyst action:

- require confirmation
- require override reason if analyst disagrees with AI
- write audit event
- update case status

On export:

- create note artifact from evidence ledger
- keep downloadable or copyable output

### Scenario Lab

On load:

- show current policy value
- show seeded replay baseline

On policy change:

- rerun replay against same seed
- show delta summary
- write replay run to audit

## Spike Feature Decision

Keep the spike, but make it thin.

The spike should be:

- a banner on the queue
- one concise anomaly explanation
- one click into the relevant case cluster

The spike should not be:

- a separate analytics product
- a full BI dashboard
- a timeseries-heavy page

## What Not To Build

Do not build these in the hackathon:

- full no-code rule and workflow builder
- proprietary fraud model training pipeline
- full sanctions provider integration
- production event streaming
- customer-facing remediation journey
- separate graph database
- full analyst team routing workflow
- every FRAML surface at once

## Judging-Criteria Fit

### 1. AI intelligent systems

This build uses AI in the right place:

- repetitive investigation work
- evidence synthesis
- action recommendation
- policy explanation
- note drafting

This avoids the common mistake of using LLMs as fake deterministic scoring engines.

### 2. Technical implementation

This can be built as a stable prototype because:

- core rules stay deterministic
- replay stays deterministic
- seeded data keeps the demo reliable
- one app can serve the whole flow

### 3. Multi-cloud

Use a real split:

- AWS for app, API, DB, seed storage
- Alibaba Cloud for LLM inference and note generation

Judge sentence:

`AWS runs the investigation system of record; Alibaba runs the AI analyst that explains evidence and drafts actions.`

### 4. Impact and reliability

The impact story is clear:

- risky money movement is challenged before payout
- analysts work faster
- evidence and policy are auditable
- policy changes can be tested before rollout

### 5. Presentation

The story is naturally demoable:

- queue
- case
- action
- note
- replay

That is one straight line.

## Build Order

Build in this order and stop when the previous slice is weak.

1. Seeded data and hero case
2. Queue with reason chips and spike banner
3. Case workspace with facts vs inferences
4. Policy mapping and action rail
5. Human override and audit log
6. Note export
7. Scenario Lab replay
8. Backup case

## Minimum Viable Demo Checklist

- first page loads with seeded cases
- hero case is understandable in under 20 seconds
- every recommendation cites evidence IDs
- every recommendation cites policy IDs
- human can approve or override
- override requires a reason
- note export works
- replay is deterministic by seed
- one policy edit changes replay outcome visibly

## 4-Minute Demo Script

1. Open Queue and point at the spike banner.
2. Open the top risky payout case.
3. Show entity graph and evidence timeline.
4. Show facts vs AI inferences.
5. Show recommended `HOLD` with policy citations.
6. Override or approve as analyst.
7. Export the case note.
8. Open Scenario Lab.
9. Tighten one threshold.
10. Replay and show the tradeoff.

## If Time Remains

Only after the core demo is stable:

- add one thin policy editor panel
- add one backup case family
- add one tiny customer step-up mock after `HOLD`

## Final Call

The strongest hackathon version is not:

- `alert dashboard + no-code workflow builder + AI assistant`

The strongest hackathon version is:

- `AI-native pre-payout decision workspace with evidence graph, action rail, note export, and replay lab`

That is useful enough because it targets a real analyst bottleneck.
That is impressive enough because it shows grounded AI, human control, and policy replay in one flow.

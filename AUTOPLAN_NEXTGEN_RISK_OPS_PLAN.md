# TNG FinHack Autoplan: Next-Gen Risk Ops Plan

Generated: 2026-04-24
Repo: `tng-hackathon-2026-personal`
Seed inputs: `README.md`, `index.html`, user prompt
Mode: `SELECTIVE_EXPANSION`
Status: ready for implementation
Voice source: `codex-only` in this run

## Plan Summary

Build an AI-native financial crime operations layer for TNG.

Do not pitch another fraud dashboard, another rules engine, or another sanctions checker.
Pitch the layer above them:

- ingest existing risk signals
- resolve them into an evidence graph
- run specialist agents to investigate
- recommend the next action with evidence and policy citations
- draft regulator-ready reports
- replay synthetic attack scenarios before shipping new controls

Short version: move from `alert -> analyst queue` to `alert -> investigation -> action -> report -> replay`.

## Rubric Guardrails (Day 1 Judging Notes)

1. **AI must be justified.**
   - Do not add LLMs everywhere.
   - Use AI where it helps with evidence assembly, action recommendation, policy reasoning, report drafting, or replay tradeoffs.
   - Use deterministic rules where deterministic rules are stronger.

2. **The prototype must survive follow-up.**
   - A strong first 30 seconds means nothing if the second click breaks.
   - Edge cases, degraded states, and security posture matter.

3. **Two clouds must do real work.**
   - One cloud for the app and seeded data, another for AI or replay is fine if the split has a real reason.
   - Cosmetic multi-cloud loses.

4. **Impact has to be real and visible fast.**
   - The real user is the fraud or AML analyst.
   - The pain is a risky flow that needs a decision before payout.
   - The demo must make that pain and intervention obvious in under 4 minutes.

5. **Presentation is load-bearing.**
   - Clean deck, clean README, one sharp case, one sharp replay story.
   - No feature stuffing.

## Strongest Challenge To The Original Direction

Original direction:
- `real-time AML + sanctions screener`

Recommended direction:
- `agentic investigation and response layer`, with sanctions screening as one input

Why:
- generic screening already exists everywhere
- a prettier queue does not beat TNG's current stack or the market leaders
- the gap is analyst leverage, explanation quality, policy traceability, and replay/simulation

What changes:
- the demo becomes clearly next-gen
- the UI stops looking like an alert list
- the hackathon story becomes "we make existing controls smarter" instead of "we rebuilt controls badly"

## Phase 0: Scope Lock

### In scope for the hackathon MVP

1. Ingest fake or seeded events from fraud rules, watchlist matches, device risk, and merchant anomalies.
2. Resolve users, wallets, devices, merchants, and beneficiaries into one case graph.
3. Run specialist agents that produce facts, inferences, missing data requests, and recommended actions.
4. Show an investigator workspace with evidence, uncertainty, next steps, and action buttons.
5. Generate a case note or SAR-style draft from the evidence ledger.
6. Include a replay/simulator tab for synthetic attack scenarios.

### NOT in scope

- Replacing TNG's core payments switch.
- Building a full sanctions provider or external screening network.
- Training a proprietary fraud model from production traffic.
- Full consumer app redesign.
- Live bank, telco, or government integrations.
- Automatic irreversible enforcement without human approval.
- Full multilingual customer rescue workflow.
- Production-grade event streaming infra.

## What Already Exists

### In the repo

- `README.md`: idea inventory and ranked startup analogs
- `index.html`: plain-language fake queue UI with cases, reasons, and detail panel

### In the product environment

- TNG already appears to have strong front-door safety controls: device binding, TapSecure approval, cooling-off protection, transaction checks, and fraud reporting
- Ant already markets adaptive risk authentication and anti-fraud infrastructure

### In the market

- Sardine, Feedzai, Hawk, ComplyAdvantage, Flagright, and Unit21 already cover alerting, screening, monitoring, and case management

### Reuse decision

- Reuse current queue/detail UI structure from `index.html` as the base interaction pattern
- Reuse the original `AML + sanctions` idea as one agent inside the system
- Do not rebuild consumer authentication, raw risk scoring, or watchlist search from scratch

## Dream State Delta

### 12-month ideal

- all TNG risk signals unified in one case graph
- AI agents investigate every case in shadow mode
- low-risk cases auto-close with audit logs
- high-risk cases escalate with policy citations and regulator packs
- every new policy or rule can be replayed against synthetic attacks before launch
- analyst feedback continuously improves prompts, policies, and graph linking

### Hackathon delta

The MVP reaches roughly 60% of the story:

- yes: graph + agents + workspace + report draft + replay lab
- no: live integrations, production controls, real model feedback loops, full policy compiler

## Market Read: What Wins Now

### What the best companies already do

| Company | Current edge | What to learn |
|---|---|---|
| Sardine | unified fraud + compliance + graph-style reasoning + decisioning | one system, not point tools |
| Unit21 | agentic workflow across detection, investigation, and reporting | investigator leverage, not just scoring |
| Feedzai | end-to-end financial crime platform with AI and network intelligence | intelligence + operations in one place |
| Hawk | monitoring + case management + AI investigation tooling | investigation workflow matters |
| ComplyAdvantage | screening + monitoring + risk data with AI assistance | policy/compliance has to stay auditable |
| Flagright | AI-native AML/fraud monitoring + case ops | real-time plus explainability |

### What still feels open

The open wedge is not "do what they do, but smaller."

The open wedge is:

- local TNG-specific wallet abuse patterns
- regulator-safe agentic investigation
- simulator/backtesting for scam and AML controls
- plain-language action recommendations with evidence provenance

## CEO Review

### Premises that were wrong

1. "Differentiation comes from more rules."
   No. That is table stakes.

2. "The demo should start with sanctions screening."
   No. Screening is one signal, not the product.

3. "A good risk UI is a better alert table."
   No. The winning UI is a decision workspace.

4. "LLMs mainly summarize."
   No. The value is tool-using investigation, policy reasoning, and narrative assembly.

5. "We should compete with TNG's existing controls."
   No. The product should sit above them and make them easier to operate.

### Product definition

Working name: `TNG RiskOps Agent`

One-line pitch:
- `An AI-native investigation layer that turns TNG fraud and AML alerts into evidence-backed actions, SAR drafts, and replayable policy decisions.`

### Why judges care

- direct fit to Security and Fraud
- grounded in a real operator pain: too many alerts, too much manual triage, too much report writing
- looks new because it compresses analyst work, not because it adds another chart
- easy to demo with fake data and fake policy packs
- easier to defend under Q&A because the AI is doing reasoning and assembly work, not pretending to be a magic fraud oracle
- naturally supports a purposeful two-cloud story if the app and AI/replay workloads are split cleanly

### User

Primary user:
- fraud ops analyst

Secondary users:
- AML investigator
- compliance lead
- risk product manager

Core jobs to be done:

- tell me which cases matter first
- show me why
- tell me what evidence is still missing
- recommend the next action
- give me something I can sign off on and export
- let me test new controls before they hit customers

### Opinionated product choices

- the product is internal-first, not consumer-first
- facts and AI inferences are visually separated
- high-risk actions always require human approval
- replay/simulator ships in MVP because that is the clearest next-gen differentiator
- sanctions screening is an agent, not the homepage

### CEO DUAL VOICES - CONSENSUS TABLE

| Dimension | Codex | Claude subagent | Consensus |
|---|---|---|---|
| Another alert dashboard is enough | No | N/A | single-voice: reject |
| Build above existing controls | Yes | N/A | single-voice: approve |
| Agentic investigation should be core | Yes | N/A | single-voice: approve |
| Replay lab belongs in MVP | Yes | N/A | single-voice: approve |
| Consumer app redesign needed | No | N/A | single-voice: reject |
| Full core risk engine replacement | No | N/A | single-voice: reject |

Subagent note:
- not run in this session; no delegation was used

## Error & Rescue Registry

| Codepath | Failure mode | Rescue action | User impact | Logged |
|---|---|---|---|---|
| `watchlist_lookup` | provider timeout | use cached result, mark as stale, block auto-clear | analyst sees stale badge | Yes |
| `entity_resolver` | ambiguous graph link | lower confidence, require review, do not merge entities silently | analyst sees uncertainty chip | Yes |
| `agent_orchestrator` | malformed model output | retry once with structured output, then fallback to deterministic summary | slower case update, no silent break | Yes |
| `policy_evaluator` | missing policy code | default to escalate, do not allow auto-approve | more manual review | Yes |
| `report_drafter` | unsupported claim in draft | remove claim, mark evidence gap, require analyst edit | draft stays usable | Yes |
| `scenario_runner` | non-deterministic replay result | show seed mismatch warning and save run separately | no broken demo state | Yes |
| `customer_rescue_trigger` | false positive intervention | keep as recommended action only in MVP | no direct customer friction | Yes |

## Failure Modes Registry

| CODEPATH | FAILURE MODE | RESCUED? | TEST? | USER SEES? | LOGGED? |
|---|---|---|---|---|---|
| signal ingest | duplicate event creates duplicate case | Y | Y | clear merge state | Y |
| entity graph | wrong beneficiary link | Y | Y | confidence warning | Y |
| agent investigation | model invents unsupported reason | Y | Y | evidence gap warning | Y |
| action recommendation | unsafe auto-freeze on thin evidence | Y | Y | blocked by approval gate | Y |
| report draft | draft includes unverified statement | Y | Y | flagged field | Y |
| simulator replay | scenario score changes across same seed | Y | Y | replay mismatch banner | Y |
| case list refresh | narrative loads before facts | Y | Y | loading state | Y |
| policy update | stale policy version used in review | Y | Y | version mismatch badge | Y |

Critical gaps flagged:
- 0 after redesign

## Design Review

### Current design problem

The current fake UI is readable, but it is still old-gen:

- queue first
- reasons second
- no evidence provenance
- no uncertainty model
- no agent workflow
- no replay/simulator
- no regulator output

A user would say:

- "I still have to think through everything myself."
- "I see alerts, but not a decision path."
- "I cannot tell what is fact vs AI guess."
- "I cannot test policy changes before pushing them."

### New design north star

The UI should feel like `mission control for one case`, not `an inbox of scary rows`.

### Proposed surface

Left rail:
- ranked cases
- reason chips
- agent status

Center:
- evidence timeline
- graph of connected entities
- fact vs inference blocks
- missing data requests

Right rail:
- recommended action
- policy citations
- confidence
- analyst approve / hold / escalate
- export note / SAR draft

Second tab:
- Scenario Lab

### Design litmus scorecard

| Dimension | Initial | Revised | Notes |
|---|---|---|---|
| Clarity | 5/10 | 8/10 | top case and next step are obvious |
| Information hierarchy | 5/10 | 8/10 | evidence and action are separated |
| Trust / explainability | 4/10 | 9/10 | provenance and uncertainty are explicit |
| Workflow support | 4/10 | 9/10 | analyst can act, not just read |
| Differentiation | 3/10 | 9/10 | simulator and agent timeline change the story |
| Learnability | 7/10 | 8/10 | still plain-language, not compliance jargon |
| Demo strength | 5/10 | 9/10 | case -> action -> report -> replay is a complete arc |

### Design litmus checks

| Check | Result |
|---|---|
| Can the analyst see the highest-priority case in 3 seconds? | Yes |
| Can the analyst tell fact vs AI inference instantly? | Yes |
| Can the analyst see why the recommendation was made? | Yes |
| Can the analyst see uncertainty and missing data? | Yes |
| Can the analyst take the next action without switching tools? | Yes |
| Does the design show something TNG likely does not already have? | Yes |
| Is the demo understandable to a non-expert judge? | Yes |

### Design DUAL VOICES - CONSENSUS TABLE

| Dimension | Codex | Claude subagent | Consensus |
|---|---|---|---|
| Queue-only UI is enough | No | N/A | single-voice: reject |
| Facts and AI should be separated | Yes | N/A | single-voice: approve |
| Replay lab should be visible in the product | Yes | N/A | single-voice: approve |
| Plain language should win over compliance jargon | Yes | N/A | single-voice: approve |
| Mobile-first design required | No | N/A | single-voice: reject for MVP |
| Full design system needed now | No | N/A | single-voice: reject for MVP |
| Mission-control layout is the right metaphor | Yes | N/A | single-voice: approve |

## Eng Review

### Architecture choice

Use one app with one database and one background worker.

Do not build microservices.
Do not build a separate graph database in the hackathon.
Use explicit tables plus adjacency edges.

### System architecture

```text
                  +---------------------------+
                  |  Seeded alerts / fake tx  |
                  |  sanctions / device risk  |
                  +-------------+-------------+
                                |
                                v
                      +---------+---------+
                      |     Ingest API     |
                      +---------+---------+
                                |
                                v
                      +---------+---------+
                      |   Event / Case DB  |
                      +----+----------+---+
                           |          |
                           v          v
                    +------+--+   +---+----------------+
                    | Entity  |   | Policy / Rule DB   |
                    | Resolver|   +---+----------------+
                    +---+-----+       |
                        |             |
                        v             |
                 +------+-------------+------+
                 |     Evidence Graph Store   |
                 +--+-----------+-----------+-+
                    |           |           |
                    v           v           v
            +-------+--+ +------+-----+ +---+--------+
            | Behavior | | Sanctions  | | Policy     |
            | Agent    | | Agent      | | Agent      |
            +-------+--+ +------+-----+ +---+--------+
                    \           |           /
                     \          |          /
                      v         v         v
                    +-----------------------+
                    | Investigation Orchestrator |
                    +------+---------------+-----+
                           |               |
                           v               v
                 +---------+----+   +------+------+
                 | Action Engine |   | Report Draft |
                 +---------+----+   +------+------+
                           |               |
                           v               v
                     +-----+----------------+-----+
                     | Investigator Workspace UI  |
                     +----------------------------+
```

### Data flow

```text
alert -> case -> graph enrichment -> agent runs -> evidence ledger
      -> action recommendation -> human approval -> export / close
                                   |
                                   +-> replay scenario against same policy set
```

### State machine

```text
NEW_ALERT
  -> ENRICHING
  -> INVESTIGATING
  -> READY_FOR_REVIEW
      -> APPROVED_ACTION
      -> NEEDS_MORE_DATA
      -> CLOSED_NO_ACTION
  -> REPORT_DRAFTED
  -> CLOSED
  -> ERROR
```

### Error flow

```text
tool failure
  -> retry once
  -> deterministic fallback
  -> mark degraded state
  -> require analyst review
  -> log metric + keep case usable
```

### Deployment sequence

```text
seed data
  -> run local app
  -> shadow-generate agent outputs
  -> smoke check case list
  -> demo one case end-to-end
  -> demo replay lab
```

### Rollback flowchart

```text
bad build?
  -> yes -> disable agent actions -> keep read-only case browser -> use saved seeded runs
  -> no  -> continue demo
```

### Core schema

```ts
type EntityType =
  | "USER"
  | "WALLET"
  | "DEVICE"
  | "MERCHANT"
  | "BENEFICIARY"
  | "PHONE"
  | "EMAIL"
  | "ID_DOC"
  | "WATCHLIST_ENTRY";

type SignalSource =
  | "RULE"
  | "SANCTIONS"
  | "DEVICE"
  | "VELOCITY"
  | "MERCHANT"
  | "MANUAL"
  | "SIMULATOR";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type CaseStatus =
  | "NEW_ALERT"
  | "ENRICHING"
  | "INVESTIGATING"
  | "READY_FOR_REVIEW"
  | "NEEDS_MORE_DATA"
  | "REPORT_DRAFTED"
  | "CLOSED"
  | "ERROR";

type AgentName =
  | "ORCHESTRATOR"
  | "BEHAVIOR"
  | "SANCTIONS"
  | "POLICY"
  | "REPORTER";

type EvidenceKind = "FACT" | "INFERENCE" | "POLICY" | "EXTERNAL_MATCH";
type RecommendationAction =
  | "ALLOW"
  | "STEP_UP"
  | "HOLD"
  | "FREEZE"
  | "ESCALATE"
  | "FILE_SAR";
type ScenarioType =
  | "MULE_RING"
  | "DORMANT_TAKEOVER"
  | "MERCHANT_QR_ABUSE"
  | "WATCHLIST_PAYOUT"
  | "SMURFING";
```

### Core interfaces

```ts
interface Case {
  id: string;
  status: CaseStatus;
  riskLevel: RiskLevel;
  title: string;
  summary: string;
  primaryEntityIds: string[];
  createdAt: string;
}

interface Entity {
  id: string;
  type: EntityType;
  label: string;
  riskFlags: string[];
}

interface EvidenceItem {
  id: string;
  caseId: string;
  agent: AgentName;
  kind: EvidenceKind;
  summary: string;
  confidence: number;
  citations: string[];
}

interface ActionRecommendation {
  caseId: string;
  action: RecommendationAction;
  confidence: number;
  rationale: string;
  requiresHumanApproval: boolean;
}

interface AgentInput {
  caseId: string;
  signals: unknown[];
  entities: Entity[];
  evidence: EvidenceItem[];
  policyVersion: string;
}

interface AgentOutput {
  facts: string[];
  inferences: string[];
  missingInfo: string[];
  recommendedAction?: RecommendationAction;
  confidence: number;
}
```

### Architecture decisions

1. Keep graph storage relational.
   Reason: explicit and fast enough for the hackathon.

2. Put AI behind an orchestrator.
   Reason: one place for retries, logging, fallbacks, and approvals.

3. Make evidence ledger first-class.
   Reason: without provenance, the AI part looks fake and risky.

4. Keep irreversible actions human-gated.
   Reason: demo stays credible and safe.

5. Ship simulator/backtester.
   Reason: this is the clearest gap between old-gen and next-gen tooling.

### Test diagram

| Flow | Proposed files | Test type | Test file | Assertions |
|---|---|---|---|---|
| Seeded alert creates one case | `lib/ingest.ts`, `app/api/cases/route.ts` | integration | `tests/integration/case-ingest.test.ts` | duplicate events collapse into one case |
| Entity resolver links wallet, device, merchant | `lib/graph/resolve.ts` | unit | `tests/unit/entity-resolver.test.ts` | links are deterministic and confidence-scored |
| Agent orchestrator retries malformed output | `lib/agents/orchestrator.ts` | unit | `tests/unit/agent-orchestrator.test.ts` | one retry, then deterministic fallback |
| Policy agent blocks unsafe auto-freeze | `lib/policy/evaluate.ts` | unit | `tests/unit/policy-gate.test.ts` | thin evidence cannot auto-freeze |
| Evidence ledger separates fact from inference | `lib/evidence/ledger.ts` | unit | `tests/unit/evidence-ledger.test.ts` | display model cannot merge categories |
| Workspace shows action, evidence, and uncertainty | `app/page.tsx` or `app/cases/[id]/page.tsx` | e2e | `tests/e2e/investigation-workspace.spec.ts` | user can inspect, approve, export |
| Report draft cites evidence only | `lib/reports/draft.ts` | eval + integration | `evals/report-grounding.jsonl`, `tests/integration/report-draft.test.ts` | unsupported claims are rejected |
| Scenario replay is deterministic by seed | `lib/simulator/run.ts` | unit | `tests/unit/scenario-replay.test.ts` | same seed -> same result |

### Performance review

Likely slow paths:

- graph enrichment per case
- multiple agent calls per opened case
- regenerating narrative on every list refresh

Fix:

- precompute case summaries for the queue
- only run heavy agents when a case is opened or promoted
- cache watchlist and policy reads
- persist agent outputs by case version hash
- do not call the model from list rendering

### Security review

Key risks:

- prompt injection from KYC notes, merchant descriptions, or analyst text
- leakage of PII into logs or model prompts
- unsupported AI claims written into reports
- auto-actions without enough evidence

Controls:

- treat all free text as untrusted evidence
- log structured IDs, not full raw payloads
- keep prompts minimal and grounded on selected evidence
- require human approval for `FREEZE`, `ESCALATE`, and `FILE_SAR`

### Worktree parallelization strategy

| Step | Modules touched | Depends on |
|---|---|---|
| Data + schema layer | `lib/ingest`, `lib/graph`, DB schema | none |
| Agent + policy layer | `lib/agents`, `lib/policy`, `lib/reports` | schema |
| UI workspace + simulator | `app`, components, seeded data | schema, stable API contracts |

Parallelization note:
- three clean workstreams after schema lock

### Eng DUAL VOICES - CONSENSUS TABLE

| Dimension | Codex | Claude subagent | Consensus |
|---|---|---|---|
| Single app is better than microservices here | Yes | N/A | single-voice: approve |
| Relational graph beats separate graph DB for MVP | Yes | N/A | single-voice: approve |
| Human approval required for high-risk actions | Yes | N/A | single-voice: approve |
| Replay lab should stay in scope | Yes | N/A | single-voice: approve |
| AI-only narrative without evidence ledger is acceptable | No | N/A | single-voice: reject |
| Queue render may call agents directly | No | N/A | single-voice: reject |

## DX Review

### Product type

Internal operations app with light developer-facing configuration.

### Developer journey map

| Stage | Desired result |
|---|---|
| 1. Clone | repo opens with one obvious entrypoint |
| 2. Install | one package manager command |
| 3. Configure | copy one env example or use defaults |
| 4. Seed | one command loads fake cases and replay scenarios |
| 5. Run | local app starts and opens a ready case |
| 6. Inspect | one click shows evidence + action + report draft |
| 7. Change policy | edit one JSON or TS config file |
| 8. Replay | rerun a scenario and compare output |
| 9. Demo | export one report and walk through one case |

### Developer empathy narrative

I should be able to clone the repo, run one command, and immediately see a fake case that already tells a story. I should not need to wire five APIs before the app feels alive. If I change a policy threshold or scenario seed, I should see the effect fast. If something breaks, the error should tell me exactly whether the problem is seed data, policy config, or model output.

### TTHW assessment

- current implied TTHW: 20-30 minutes because there is no real app flow yet
- target TTHW: under 6 minutes

### DX scorecard

| Dimension | Score | Prior | Trend |
|---|---|---|---|
| Getting Started | 6/10 | 3/10 | up |
| API/CLI/SDK | 7/10 | 4/10 | up |
| Error Messages | 7/10 | 3/10 | up |
| Documentation | 7/10 | 4/10 | up |
| Upgrade Path | 6/10 | 4/10 | up |
| Dev Environment | 8/10 | 5/10 | up |
| Community | 5/10 | 3/10 | up |
| DX Measurement | 5/10 | 2/10 | up |

Overall DX:
- `6.4/10`

Competitive rank:
- `Competitive for a hackathon repo, not champion-tier`

Magical moment:
- `run seed + open a case + replay a scenario in under 6 minutes`

### DX implementation checklist

- [ ] one install command
- [ ] one seed command
- [ ] one run command
- [ ] first page loads with seeded cases
- [ ] one obvious demo path
- [ ] policy config lives in one file
- [ ] every error message includes problem + cause + fix
- [ ] replay scenario is deterministic by seed
- [ ] report export works offline with fake data

### DX DUAL VOICES - CONSENSUS TABLE

| Dimension | Codex | Claude subagent | Consensus |
|---|---|---|---|
| TTHW must be under 6 minutes | Yes | N/A | single-voice: approve |
| Seeded data should be first-class | Yes | N/A | single-voice: approve |
| Policy config should be one obvious file | Yes | N/A | single-voice: approve |
| Hidden env complexity is acceptable | No | N/A | single-voice: reject |
| Error messages need cause + fix | Yes | N/A | single-voice: approve |
| Multi-service dev setup is acceptable | No | N/A | single-voice: reject |

## Cross-Phase Themes

1. Do not rebuild what TNG or Ant likely already has.
2. Facts, inferences, and actions must be separate.
3. Human approval is part of the product, not a hackathon compromise.
4. Replay/simulation is the sharpest differentiator.
5. Local wallet abuse patterns matter more than generic fintech abstractions.

## Stale Diagram Audit

- `README.md`: no ASCII diagrams to audit
- `index.html`: no ASCII diagrams to audit

## Recommended Demo Script

1. Open the queue and show the highest-risk case.
2. Click into the case and show entity graph + evidence timeline.
3. Show three agents agreeing or disagreeing on the next step.
4. Show the policy reason for `HOLD` or `ESCALATE`.
5. Export the case note or SAR-style draft.
6. Switch to Scenario Lab and replay the `watchlist-payout` threshold tradeoff first.
7. Change one threshold or policy value and rerun.
8. If there is still time, show a second scenario such as `dormant-wallet takeover` or `merchant / mule-ring abuse`.

## Deferred To TODOS.md

- production watchlist adapters
- customer rescue workflow
- feedback learning loop
- cross-border remittance pack
- policy compiler and versioning UI

## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|---|---|---|---|---|---|
| 1 | Phase 0 | Use `SELECTIVE_EXPANSION` mode | Taste | P3 | User asked for next-gen thinking without losing hackathon feasibility | HOLD, EXPANSION |
| 2 | CEO | Replace `sanctions screener` framing with `agentic investigation layer` | User Challenge | P1 | More complete and more differentiated | generic screener |
| 3 | CEO | Build above TNG controls, not against them | Mechanical | P4 | Reuse beats duplicate | new auth / raw rules engine |
| 4 | CEO | Keep internal analyst as primary user | Mechanical | P3 | Clearest fit to the track and demo | consumer-first rescue app |
| 5 | CEO | Keep replay lab in MVP | Taste | P2 | Highest-value expansion inside the blast radius | defer replay entirely |
| 6 | Design | Move from queue UI to mission-control workspace | Taste | P5 | Clearer, more explicit action flow | list-first dashboard |
| 7 | Design | Separate facts from AI inference visually | Mechanical | P1 | Trust and auditability depend on it | mixed narrative blocks |
| 8 | Eng | Use one app + relational graph tables | Mechanical | P5 | Obvious, fast, low-risk | microservices, graph DB |
| 9 | Eng | Add evidence ledger as core data model | Mechanical | P1 | Needed for reports, audit, and UX trust | freeform summaries only |
| 10 | Eng | Require human approval for high-risk actions | Mechanical | P1 | Completeness and safety | full autonomous enforcement |
| 11 | DX | Optimize for seeded local demo in under 6 minutes | Mechanical | P5 | Fewer steps, better demo reliability | integration-heavy setup |
| 12 | DX | Keep policy config in one obvious file | Mechanical | P5 | New contributor can change behavior fast | scattered config |

## Completion Summary

### Review scores

- CEO: strong direction locked; biggest change is the product framing
- Design: `5/10 -> 8.6/10`
- Eng: solid MVP architecture; `0` critical gaps after redesign
- DX: `6.4/10`, acceptable for hackathon, needs tight setup path

### Final call

Build this:
- `AI-native financial crime investigation workspace with evidence graph, action engine, report draft, and replay lab`

Do not build this:
- `another fraud queue with a nicer skin`

### Next implementation slices

1. schema + seeded data
2. evidence graph + orchestrator
3. workspace UI
4. report draft + replay lab

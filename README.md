# TNG RiskOps Agent

Current call for this repo:

- Track: `Security & Fraud`
- Product: `AI-native pre-payout decision workspace for fraud + AML ops`
- Hero case: `case-301` in [index.html](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/index.html:1352)
- Hero replay: `watchlist-payout`
- Winning wedge: `evidence graph + specialist agents + human action rail + replay lab`

This repo is no longer "which idea should we do?" territory.

It already has a direction:

1. do **not** pitch another flat alert queue
2. do **not** pitch generic AML screening as the whole product
3. pitch the layer **above** existing controls, where analysts decide whether to `step-up`, `hold`, `escalate`, or export a report before money leaves

## Why This Can Win

### 1. AI & Intelligent Systems
- Use the right AI for the right job.
- No LLM theater.
- The strongest AI story here is evidence linking, action recommendation, policy reasoning, report drafting, and replaying policy tradeoffs.
- If a deterministic rule is better, say so.

### 2. Technical Implementation
- A beautiful first 30 seconds that collapses under Q&A loses.
- The prototype has to survive edge cases, seeded scenario changes, and security questions.
- The strongest technical path is one seeded end-to-end case flow, not five half-built systems.

### 3. Multi-Cloud Service Usage
- Two clouds must do real work.
- One cloud can hold the app or seeded data path.
- The second cloud should own AI, replay, or a clearly justified workload.
- "We used both because the rules said so" is a losing answer.

### 4. Impact & Feasibility
- The product needs a real user and a real pain.
- For this repo, that user is the fraud or AML analyst.
- The pain is not "fraud exists." The pain is "signals fired, money is about to move, and a human still has to decide fast."
- Real impact is necessary, but in a hackathon it still needs a memorable moment.

### 5. Presentation & Teamwork
- A worse idea can beat a better idea if the pitch is cleaner.
- The story must be straight:
  - what happened
  - what the AI checked
  - what the human should do
  - what policy change the replay lab suggests
- Design quality, documentation quality, and demo calm all matter.

## Current Product Story

One sentence:

> `TNG RiskOps Agent turns fraud and AML alerts into evidence-backed pre-payout decisions, export-ready case notes, and replayable policy tradeoffs.`

What judges should see:

1. one case opens already grouped into a single workspace
2. facts and AI inferences are separated
3. specialist agents explain what each one checked
4. the system recommends `hold`, `step-up`, or `escalate`
5. the analyst can export a note
6. the team replays a policy threshold change and shows the cost of being stricter

## Scam Patterns To Keep In Scope

These are the most relevant patterns to anchor the demo around:

1. near-watchlist cross-border payout
2. dormant-wallet takeover after device change
3. mule-account or third-party account misuse
4. malware or phishing-assisted compromise
5. merchant QR or payout abuse

Good default:

- hero case: cross-border near-watchlist payout
- backup case: dormant-wallet takeover
- optional second act: merchant abuse if the CTO or mentor says that is hotter

## Repo Map

Use each doc for one job. Do not make them all repeat the same pitch.

- [README.md](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/README.md:1)
  - short project entrypoint
  - current call
  - doc map
- [tng-doc-by-shiwei.md](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/tng-doc-by-shiwei.md:1)
  - hackathon handbook
  - judging criteria
  - logistics
  - track notes
- [AUTOPLAN_NEXTGEN_RISK_OPS_PLAN.md](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/AUTOPLAN_NEXTGEN_RISK_OPS_PLAN.md:1)
  - architecture
  - product strategy
  - demo sequence
  - test and risk plan
- [wbrya-unknown-design-20260425-101346.md](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/wbrya-unknown-design-20260425-101346.md:1)
  - current design brief
  - approach options
  - CTO questions
- [TODOS.md](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/TODOS.md:1)
  - post-MVP backlog only
- [index.html](/C:/Users/wbrya/OneDrive/Documents/GitHub/tng-hackathon-2026-personal/index.html:1033)
  - current prototype
  - seeded cases
  - replay scenarios

## Immediate Decisions

1. Keep `Security & Fraud` unless the CTO gives a very strong reason to switch.
2. Ask whether TNG wants the hero case to be cross-border payout, dormant-wallet takeover, merchant abuse, or mule-ring collection.
3. Lock the cloud split in one sentence and repeat it in the deck.
4. Decide whether to keep the demo internal-only or add one thin customer step-up moment after `hold` / `ask for more proof`.

## CTO Questions

The full list lives in the design doc. The first three to ask are:

1. Where is the real pain today: alert triage, evidence gathering, action approval, SAR drafting, or policy tuning?
2. Which abuse pattern should we make the hero case if we want it to feel closest to TNG reality?
3. What would make the multi-cloud split feel purposeful instead of cosmetic to you?

## Repo Hygiene

- Keep all data synthetic.
- Do not publish the current `.env` contents as-is.
- If this goes public, scrub secrets first and treat the repo as judge-facing.

## Inputs Worth Reusing

- [Fraud notes 1](https://www.bryanslab.com/blogs/fraud-2/)
- [Fraud notes 2](https://www.bryanslab.com/blogs/fraud-ml/)

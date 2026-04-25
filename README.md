# RO/A

**RiskOps / Agent — TNG Digital FINHACK 2026, Security & Fraud track**

An AI-assisted analyst workspace for account takeover detection, investigation, and intervention — built so a fraud analyst can review what AI couldn't decide on its own, approve an action in one click, and let the system carry out the rest of the post-detection workflow automatically.

---

## Project Description

### The problem

Fraud operations teams spend most of their day on the *boring half* of fraud handling — not detecting threats, but executing the manual workflow that follows a detection. After an alert fires, an analyst typically has to:

- read scattered raw logs and stitch together a timeline by hand
- copy evidence into a case note
- decide whether to freeze, step up, or release the account
- manually go and freeze the account in another tool
- manually contact the user to re-verify
- manually update the case status when the user responds

A high portion of these steps could be automated, but most fraud platforms stop at the score and leave the action layer to humans.

### Our solution

RO/A automates the **post-detection** workflow:

1. **Detection** — deterministic scoring on user behavior signals (login, device, geo, transaction attempts) produces a risk score and feature drivers.
2. **Triage** — the queue ranks suspicious accounts, surfaces *why* with reason chips, and shows which detections are about to trigger automated action.
3. **Investigation workspace** — one screen per case: behavior timeline, evidence, linked entities (entity risk graph), policy citations, AI-drafted recommendation, analyst action rail.
4. **Decision** — for high-confidence cases the system fires an action automatically (freeze, review). For ambiguous cases the analyst approves with one click and one-line reason.
5. **Customer prompt** — the system sends a WhatsApp message instructing the user to re-verify via `/tng-login`.
6. **Auto-resolution** — when the user replies, the Twilio webhook flips the case to `REACTIVATED` or `BLOCKED` without analyst touch.
7. **Replay Lab** — analysts can tighten a threshold, action band, or AI-suggested draft rule and replay the seeded dataset to see the tradeoff before shipping the change.

We are deliberately **not** trying to build a better fraud detection model. We are trying to remove the manual labour around what happens *after* a model fires — so analysts only spend judgement on cases that actually need judgement.

### Key features

- **ATO Command Center** (`/queue`) — spike banner, ranked queue, reason chips, next-action preview
- **Investigation workspace** (`/cases/[caseId]`) — behavior timeline, deterministic risk score with feature drivers, entity risk graph, evidence + policy citations, AI explanation, action rail with override-with-reason
- **Automated action layer** — `FREEZE_ACCOUNT`, `REVIEW`, `STEP_UP` fire from policy without an analyst click on high-confidence paths
- **WhatsApp re-verification flow** — real Twilio prompt, real reply webhook, real case-state transition
- **Audit-ready case note export** — every recommendation cites evidence-IDs and policy-IDs
- **Replay Lab** (`/controls`) — change a threshold or AI-drafted rule, replay the seeded dataset, see caught-bad vs delayed-good tradeoff
- **Multi-cloud split with a real reason** — see below

---

## Project Technical Details

### Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC + Client Components) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, lucide-react, react-markdown |
| Graph | `@xyflow/react` for the entity risk network |
| Validation | Zod schemas at every API boundary |
| Testing | Vitest + Testing Library, jsdom |
| Hosting | AWS Amplify (CI/CD from GitHub `main`) |
| LLM | Alibaba Cloud Model Studio (Bailian) — Qwen, via OpenAI-compatible endpoint |
| Messaging | Twilio WhatsApp (outbound prompt + inbound reply webhook) |

### Architecture

We deliberately kept the architecture small and honest for a 2-day hackathon. There is no database, no event bus, no message queue. The Next.js app is the entire system; state lives in versioned JSON files served from the same Amplify deployment.

```
                        ┌─────────────────────────────────────────┐
   Fraud Analyst ─HTTPS▶│ AWS Amplify — Next.js 15                │
                        │                                          │
                        │  Frontend pages                          │
                        │   /queue   /cases/[id]   /controls       │
                        │                                          │
                        │  API routes (app/api/*)                  │
                        │   /api/cases/[caseId]/{action,override,  │
                        │     prompt,draft-note,generate-          │
                        │     explanation,report}                  │
                        │   /api/controls/{config,replay,          │
                        │     generate-rule}                       │
                        │   /api/webhooks/twilio                   │
                        │                                          │
                        │  Service layer (lib/services/*)          │
                        │   case · queue · action-orchestrator ·   │
                        │   prompt · resolution · replay · report  │
                        │   ai-explanation · rule-generator        │
                        │                                          │
                        │  Repository (lib/repositories/*)         │
                        │   single read/write surface over         │
                        │   demo-core.json + runtime-state.json    │
                        └────────┬─────────────────────┬───────────┘
                                 │                     │
                       LLM call  │                     │ WhatsApp
                                 ▼                     ▼
                  ┌────────────────────┐    ┌──────────────────┐
                  │ Alibaba Cloud      │    │ Twilio           │
                  │ Model Studio       │    │ WhatsApp + reply │
                  │ (Qwen, Bailian)    │    │ webhook          │
                  └────────────────────┘    └──────────────────┘
```

A more detailed diagram lives at [docs/architecture.drawio](docs/architecture.drawio).

### Multi-cloud split — one judge sentence

> **AWS Amplify hosts the investigation system of record. Alibaba Model Studio is the AI analyst that explains behavior and drafts rules.**

Every AI call (case explanation, draft rule generation) crosses to Alibaba via `lib/integrations/alibaba-modelstudio.ts`. Everything else — the deterministic score, the action orchestrator, the audit log, the replay engine — runs in-process inside the Amplify-hosted Next.js app.

### Approach

- **Deterministic before AI.** The risk score, action ladder, and replay are all rule-based and reproducible by seed. AI is layered on top for *explanation*, *recommendation rationale*, and *draft rule suggestions* — never as the source of truth.
- **Repository boundary.** All state goes through `lib/repositories/risk-ops-repository.ts`. The seed JSON is swappable for a real database later without changing service code.
- **Zod at the edge.** Every API route validates input with Zod; the same schemas are reused on the client.
- **No mocked AI.** The Alibaba LLM calls and the Twilio WhatsApp prompts are real, not stubbed. The reply webhook actually advances case state.
- **Synthetic data only.** PII is masked at the seed layer. The repo is treated as judge-facing.

### Repository layout

```
app/                        Next.js App Router (pages + API routes)
components/                 UI shell and route screens
lib/
  domain/                   typed contracts (Case, Alert, Score, Policy…)
  repositories/             single read/write surface over JSON state
  services/                 in-process business logic
  integrations/             alibaba-modelstudio.ts, twilio-client.ts
  prompts/                  LLM prompt templates
  rules/                    deterministic scoring + policy logic
  seed/                     demo-core.json (read-only) + runtime-demo-state.json (mutable)
docs/                       architecture, plans, brainstorms
tests/                      vitest unit + integration tests
```

### Run locally

Requires Node.js 20.19+ and npm 10+. Setup details live in [setup.md](setup.md).

```bash
cp .env.example .env        # fill in TWILIO_* and ALIBABA_* if you want the real integrations
npm install
npm run dev
```

Open `http://localhost:3000/queue`, then walk a case from `/cases/CASE-ATO-001`, then visit `/controls` for the Replay Lab.

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

---

## Project Inspiration & Problem Statement

Our teammate Bryan works in fraud detection and has been studying the space for a while. And after speaking with one of the mentors who worked in this domain, Zenny, we reached a consensus on a frustration that bugged analysts: a huge chunk of what happens after a fraud alert could be done by AI — summarising the case, citing the policy, drafting the note — and the actions that follow a decision (freezing the fraudster's account, contacting the user, updating the case) should be automated rather than clicked through by a human.

So we built TNG RiskOps Agent around that gap. The premise is simple:

- Let AI handle the cases it can clearly explain and decide on.
- Surface the rest to an analyst with all the evidence in one place, so the analyst's job becomes *approve* rather than *investigate from scratch*.
- After the decision, automate every downstream step — freeze the account, prompt the user, wait for the reply, resolve the case — instead of asking the analyst to do them by hand.

We are not aiming to build a foolproof fraud detection model. We are aiming to **automate the manual workflow of a risk-ops analyst as much as possible, especially the post-detection flow** — so analysts spend their time on judgement, not on repetitive actions a system could carry out for them.

---

## Team

TouchnoGo — TNG Digital FINHACK 2026, Grand Summit, Connexion KL.

## For the team

Internal scope, build order, and doc map: [docs/internal-strategy.md](docs/internal-strategy.md).

## Disclaimer

All data is synthetic. Hackathon prototype — not production fraud infrastructure.

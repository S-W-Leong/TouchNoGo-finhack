# RO/A — Judge Q&A Cheat Sheet

For the live Q&A after the demo. Answers are tight on purpose — say the short version, expand only if pressed. Lean on the judge sentence whenever a question wanders.

> **Judge sentence:** *AWS Amplify hosts the investigation system of record. Alibaba Model Studio is the AI analyst that explains behavior and drafts rules.*

---

## A. Problem framing & differentiation

**Q1. What problem does RO/A actually solve?**
Most fraud platforms stop at the score. The analyst still has to manually stitch evidence, freeze the account in another tool, message the user, and wait for a reply. RO/A automates the post-detection workflow so analysts only spend judgement on cases that actually need judgement.

**Q2. Why focus on post-detection instead of building better detection?**
Detection is a crowded, model-heavy space. The pain TNG analysts described to us isn't "the score is wrong," it's "the work after the score is manual and slow." That's where AI and orchestration give an outsized lift in 48 hours.

**Q3. How is this different from a generic AI-fraud-agent wrapper?**
Three things. One: deterministic scoring is the source of truth — AI never decides on its own, it explains and drafts. Two: actions are real (freeze, WhatsApp prompt, webhook resolve) — not just text. Three: the Replay Lab lets analysts test policy changes before shipping them.

**Q4. Why account takeover (ATO) as the hero case?**
ATO is high-volume, time-sensitive (money is moving), and has a clean re-verification path through the existing TNG app. It's the case where automating the post-detection loop has the most visible operator value.

---

## B. AI & trust

**Q5. How do you stop the LLM from hallucinating evidence?**
Every AI output is grounded on structured case data passed in the prompt — evidence-IDs, policy-IDs, scored signals — and the rendered explanation cites those IDs back. If an ID isn't in the case payload, it can't appear in the output. The deterministic score is computed before the LLM ever sees the case.

**Q6. What if the AI's recommendation is wrong?**
The AI never executes. The action rail is human-approved on ambiguous cases, and even on the high-confidence auto-action path the analyst can override with a one-line reason — that override is logged in the audit trail. The final state is always traceable to a human or a rule, not the model.

**Q7. Why Qwen / Alibaba Model Studio?**
The hackathon required two clouds doing real work. Qwen is strong on structured reasoning, the Bailian endpoint is OpenAI-compatible so the integration was clean, and it kept all AI work on the second cloud — which made the multi-cloud split honest instead of theatrical.

**Q8. What stops analysts from rubber-stamping every AI recommendation?**
Two design choices. Recommendations show confidence and the *missing information* the AI couldn't resolve, so a low-confidence case visually demands attention. Overrides require a one-line reason that gets stored — that creates a paper trail managers can review for rubber-stamping patterns.

**Q9. How do you measure if AI is actually saving analyst time?**
Today: not yet — it's a hackathon prototype. Day-one production metric would be median case-resolution time before/after, plus the share of cases auto-resolved without analyst touch. Both fall straight out of the audit log.

---

## C. Architecture & tech

**Q10. Walk us through the architecture.**
Single Next.js 15 app on AWS Amplify. Pages are React Server Components; API routes are the backend. Service layer in `lib/services` does the orchestration in-process. State is JSON files — no DB, no event bus, on purpose. Two external calls: Alibaba Model Studio for LLM, Twilio for WhatsApp.

**Q11. Why no database?**
For a 48-hour demo, JSON files behind a repository boundary give us the same demo without the deployment overhead. The repository pattern (`lib/repositories/risk-ops-repository.ts`) is a single read/write surface — swapping in Postgres later changes one file.

**Q12. What's the multi-cloud split, in one sentence?**
[Use the judge sentence above, word for word.]

**Q13. What if Alibaba goes down mid-demo?**
The deterministic score, action ladder, and replay all run locally — they don't depend on the LLM. The case workspace still loads with evidence, policy citations, and the recommendation; only the AI explanation panel degrades. Analyst can still freeze, prompt, and resolve.

**Q14. How does the WhatsApp loop close?**
Outbound: `prompt-service` → Twilio → user's WhatsApp. Inbound: user replies `/tng-login` → Twilio webhook → `/api/webhooks/twilio` → `resolution-service` flips the case to `REACTIVATED` or `BLOCKED`. No analyst click in between.

**Q15. How does the audit trail work?**
Every state change goes through the repository and writes to `runtime-demo-state.json` with a timestamp, actor (rule, AI, or analyst), and reason. The case note export is a flat read of that history with evidence-IDs and policy-IDs. Production version would write to an append-only store.

---

## D. Production, scale, compliance

**Q16. Could this go to production?**
The shape is production-honest — repository boundary, Zod at every API edge, deterministic scoring, real Twilio and LLM integrations. To ship: replace JSON state with Postgres, put the action layer behind a real service mesh, add Cognito or TNG SSO, encrypt prompts in transit (we already use HTTPS), and add a proper audit store. None of that requires rewriting the service layer.

**Q17. PDPA / data residency?**
All AI inference goes to Alibaba Singapore region, which keeps data inside ASEAN. PII is masked at the seed layer in this prototype; production would mask before the prompt leaves the AWS side, and the LLM would only ever see hashed identifiers + structured features.

**Q18. What about prompt injection?**
The LLM only sees structured case payloads we generate server-side, not raw user-typed text. Even if a fraudster typed something into a transaction memo, that field is sanitized and labeled in the prompt, not concatenated into the system instructions.

**Q19. Throughput at TNG scale?**
The scoring is O(1) per event — Lambda-scale. The bottleneck is the LLM call (~1–2s), but only 5–15% of cases need AI explanation, and explanations can be generated lazily when an analyst opens the case. Bulk auto-action paths don't wait on the LLM.

**Q20. Access controls for analysts?**
Out of scope for the hackathon. Production version: TNG SSO + role-based authz (analyst, lead analyst, manager) + per-action policy gates. Override-with-reason is the audit primitive that hangs off this.

---

## E. Demo specifics & potential clarifications

**Q21. Where does the risk score come from?**
Deterministic rule engine in `lib/rules/`. Inputs are user behavior signals — login fingerprint, device delta, geo jump, transaction velocity. Each driver has a transparent weight, all visible in the case workspace. No black box.

**Q22. Was the WhatsApp message real?**
Yes. Real Twilio number, real WhatsApp delivery, real reply webhook. We can re-send live if you want to see the round trip.

**Q23. What was the difference between the queue order and the action ladder?**
Queue order = how urgently a human should look at it. Action ladder = what the system will do automatically if it crosses thresholds. A high-score case can be auto-actioned before it ever reaches the queue's analyst review pile.

**Q24. What does the Replay Lab actually do?**
Takes the seeded historical alerts, re-runs them against modified rules or thresholds, and shows the delta — caught-bad vs delayed-good. It's deterministic by seed, so the same change always produces the same numbers. That makes policy changes testable instead of a guess.

**Q25. Could you tighten a different threshold to show another tradeoff?**
Yes — every threshold in the rule engine is a config knob. We seeded one canonical replay for the demo, but the engine is general.

---

## F. Hard & adversarial

**Q26. The score is deterministic — can't fraudsters reverse-engineer it?**
Two mitigations. First, the *signals* (device fingerprint, behavior model) aren't deterministic to the attacker — they don't see what we collect. Second, deterministic doesn't mean static — production would version the rule set and rotate weights. Replay Lab is what makes that rotation safe.

**Q27. What if the user's WhatsApp is the one that got compromised?**
That's why WhatsApp re-verification routes back through the TNG app's MFA / face recognition flow, not just a "reply yes." The WhatsApp message is a *prompt*, not the verification itself. A compromised WhatsApp can't pass the in-app step-up.

**Q28. Isn't this just a wrapper over an LLM?**
The LLM is a thin layer on top of the system. Pull it out and the queue, the score, the action orchestrator, the audit trail, the WhatsApp loop, and the replay all still work. The LLM adds explanation and rule drafting — not the action layer.

**Q29. Why would TNG build this vs buy from a fraud-ops vendor?**
Vendors give you generic detection-and-alert. They don't deeply integrate with TNG's WhatsApp channel, the in-app re-verification flow, or TNG's policy DSL. RO/A is the orchestration tissue between detection (which TNG already has) and action (which only TNG can execute end-to-end inside its own ecosystem).

**Q30. What's your moat?**
The replay-driven policy loop. Detection is a commodity. Honest, auditable post-detection automation that lets ops teams change policy with confidence — that's the part that compounds.

---

## G. Closing-style questions

**Q31. What's the one thing you're most proud of?**
The deterministic-before-AI design. It would have been faster to let the LLM "decide" everything, but that wouldn't survive a real audit. Keeping the LLM bounded to *explain* and *draft* is what makes this defensible.

**Q32. What would v2 look like?**
Three additions. (1) Live behavior signal ingestion instead of seed. (2) AI-suggested *new* rules from clusters of unresolved cases. (3) A manager dashboard for override-pattern detection — catching analysts who rubber-stamp.

**Q33. What's the part you're most worried about scaling?**
Prompt/audit storage. JSON works for the demo; at TNG-scale you'd want columnar storage with retention policies, plus per-analyst access scoping on the audit log.

**Q34. If we gave you 2 more weeks, what would you build?**
Live signal ingestion + the manager-side override-pattern detector. Both turn this from "demo workspace" into "team operating system."

**Q35. Why should this win?**
[Land this last:] *We didn't build another fraud detector. We built the operations layer between detection and action — the part TNG analysts spend most of their day on. It's auditable, AI-grounded, and replayable. That's the wedge.*

---

## Last 30-second cheat strip

If you only remember three lines:

1. **Wedge:** post-detection automation, not better detection.
2. **AI is bounded:** explains and drafts; never decides; cites evidence-IDs and policy-IDs.
3. **Multi-cloud sentence:** AWS Amplify hosts the system of record; Alibaba is the AI analyst.

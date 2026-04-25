# Handbook

# TouchnoGo — TNG Digital FINHACK 2026 Participant Handbook

**Team:** TouchnoGo (4 members) **Event:** TNG Digital FINHACK 2026 — TNG Digital's first-ever nationwide fintech hackathon **When:** 25–26 April 2026 (Sat–Sun) **Where:** Grand Summit, Connexion Conference & Event Centre (CCEC), Bangsar South City, Kuala Lumpur **Handbook last updated:** 25 April 2026 (Day 1) — **v0.4 with judging-notes addendum**

---

## 0\. How to use this handbook

This is a living document the team should skim *before* walking into Grand Summit, and keep open during the hack. It condenses everything publicly available about FINHACK 2026 plus a strategy playbook tailored to a 4-person team.

- Sections 1–6 are **must-read the night before** (logistics, tracks, deliverables, judging).  
- Sections 7–9 are **operational** (schedule, checklist, venue intel).  
- Sections 10–12 are **game plan** (team strategy, submission hygiene, pitch prep).  
- Section 13 lists **open questions** where public sources conflicted or went silent — verify on-site from the Terms of Participation PDF / organisers.

✅ **Source status (v0.4):** The official briefing deck (Canva) has now been walked through end-to-end. Judging criteria, prize amounts, Day 1/2 schedule, AWS region constraints, mentorship mechanics, communication channels, housekeeping rules, and emergency contacts are now verified. This version also records Day 1 judging heuristics and official TNG scam/security context so the fraud story is grounded in something sharper than generic fintech vibes. Items still marked **\[VERIFY\]** below are ones that are **not in the briefing deck** — they're likely in the Terms of Participation PDF or have to be confirmed in person.

---

## 0.1 Day 1 addendum

This addendum captures what became clearer during the hackathon itself:

- the repo should now be treated as `Security & Fraud` first, not generic fintech ideation
- judges care whether AI is the **right** tool, not whether you stuffed the most AI into the product
- a flashy first 30 seconds means nothing if the system breaks under follow-up questions
- two clouds must do meaningful work for a real reason
- "real impact" is necessary, but in hackathons the impact still has to be easy to feel in 4 minutes

Use this handbook for event context, and use the repo strategy docs for the product call:

- `README.md` -> short current call
- `AUTOPLAN_NEXTGEN_RISK_OPS_PLAN.md` -> product + architecture strategy
- `wbrya-unknown-design-20260425-101346.md` -> latest design brief + CTO questions

## 1\. Event At-A-Glance

| Item | Detail |
| :---- | :---- |
| Event name | TNG Digital FINHACK 2026 |
| Organiser | TNG Digital (Touch 'n Go eWallet) — Tech division |
| Community / Advisory Partner | Developer Kaki |
| Official Event Partner | 3Particle |
| Platinum Sponsor | ✅ Alibaba Cloud |
| Dates | Saturday 25 Apr – Sunday 26 Apr 2026 |
| Duration | ✅ **36-hour hacking marathon** (build mode starts 11:00 AM Day 1, submissions 09:00 AM Day 2\) |
| Format | 2 days 1 night ending in pitches on Day 2 |
| Venue | Grand Summit, CCEC, Level M1, The Vertical, Bangsar South City, No. 8 Jalan Kerinchi, 59200 Kuala Lumpur |
| Designated overnight rest areas | ✅ **Pinnacle 7 & 8** |
| Capacity | 300 participants (selected by approval) |
| Cost | Free of charge |
| Eligibility | Malaysian citizens **\[VERIFY — not confirmed in deck\]** |
| Team size | 3–5 members (individual registrants get matched into a team) |
| Deliverables | ✅ **7 items** submitted via Google Form (see §4) |
| Submission window | ✅ **Sun 26 Apr, 09:00–09:30** (30-minute hard window) |
| Cloud credits | ✅ **Alibaba Cloud USD 300** (`ap-southeast-3` Malaysia ONLY) \+ ✅ **AWS USD 250** (**`ap-southeast-5` Malaysia OR `ap-southeast-1` Singapore only**) |
| Cloud accounts | ✅ **1 account per team** (pre-assigned username/email \+ password for each cloud) |
| Hard requirements | ✅ Must use **≥2 cloud platforms** \+ **meaningful AI integration** |
| Judging criteria | ✅ **5 criteria** (see §5); same for Preliminary Round AND Grand Final |
| Prize pool | ✅ **Total MYR 58,000** — Grand Champion MYR 25,000 \+ 4 tiered finalist prizes (see §6) |
| Lucky Draw prizes | ✅ MacBook Pro 14" M4, Nintendo Switch 2, iPhone 17 Pro, iPad Pro, PS5 Slim, Sony WH-1000XM6 (multiple units; see §6) |

### What makes this hackathon different

- It is TNG Digital's **first** nationwide hackathon — organisers are motivated to make it a flagship event, which usually means higher-quality mentors and sharper judging.  
- The focus is **real, shippable fintech impact** on TNG's actual user base (Touch 'n Go eWallet has tens of millions of users), not toy side projects. Prototypes that plausibly integrate with TNG's rails will score better than generic fintech demos.

---

## 2\. Team TouchnoGo — quick context

- **Members:** 4 (within the 3–5 range — no need to recruit a fifth, but you have one seat open if you want to add someone with a specific skill gap).  
- **Name:** TouchnoGo (obvious nod to Touch 'n Go — on-brand, but prepare a one-line "why the name" in case a judge asks).  
- **Roles to assign before you walk in** (see §10 for detail):  
  1. **Product/PM lead** — owns problem framing, judging-criteria alignment, pitch narrative.  
  2. **Tech lead** — owns architecture, repo hygiene, deployment/demo reliability.  
  3. **Builder** — pairs with tech lead on features; owns whichever stack half neither of the leads is holding.  
  4. **Designer/Storyteller** — owns deck, demo video, UI polish, user-journey walkthrough.

With only 4 people you cannot afford pure specialists — everyone writes code or content during crunch.

---

## 3\. Tracks & Challenge Statements

Pick **one** track at registration / kickoff. You cannot submit the same project to multiple tracks. Read all three before committing — the right track for TouchnoGo is the one where your idea has the clearest "TNG could ship this Monday" story.

### Track 1 — Financial Inclusion

Build solutions that empower underserved users — including the unbanked and low-income communities — to access, use, and benefit from digital financial services.

**Signals judges will look for:**

- Who specifically is the underserved user? (B40, foreign workers, elderly, rural Sabah/Sarawak, informal gig workers, micro-merchants, students with no credit history.)  
- Does the solution work on low-end Android / weak connectivity / without a full bank account?  
- Is there a plausible distribution path through TNG eWallet (already one of Malaysia's most-installed apps)?

**Idea seeds (not exhaustive):**

- USSD-style / offline-first payment flow for areas with patchy data.  
- Alternative credit scoring for gig workers using eWallet txn history.  
- Micro-savings or "round-up" tools for cash-heavy households.  
- Foreign worker remittance with transparent FX and identity onboarding.  
- Financial literacy nudges triggered by spending patterns.

### Track 2 — Security & Fraud

Build solutions that detect scams and fraud **before** users send money to fraudsters.

**Signals judges will look for:**

- The word *before* is doing a lot of work — post-hoc dispute flows don't win this track. Intervene at the moment of transfer.  
- How do you balance friction vs. false positives? A model that blocks 90% of scams but adds friction to 30% of legit txns is not shippable.  
- Real Malaysian scam patterns: love scams, fake Macau scam calls, Telegram investment scams, fake parcel/DHL SMS, Mule accounts, QR swap at merchants.

**Idea seeds:**

- Real-time recipient-risk score (age of wallet, first-time recipient, cross-reference reported mule accounts).  
- "Are you being pressured?" conversational check-in that triggers on heuristic red flags (urgency language, first-time high-value transfer, bank account → eWallet laundering pattern).  
- QR-code tamper detection for merchant scans.  
- Behavioural biometrics during transfer (unusual typing/pause patterns under coercion).  
- Community-sourced scam reporting layer feeding a shared fraud graph.

**TNG-relevant scam shortlist to anchor the demo around:**

- **Phishing links and impersonation calls.** Official TNG material explicitly warns about fake links, fake Touch 'n Go login pages, and callers asking for PIN or OTP.  
- **Malware or malicious app installs.** TNG calls out fake apps and malware that steal SMS, TAC, OTP, or wallet credentials.  
- **Mule-account abuse.** TNG and Malaysian scam guidance both highlight rented accounts and third-party fund transfers as a real pattern.  
- **Third-party binding and unauthorised purchases.** TNG's 2025 security write-up says scammers may trick users into linking the wallet to app stores or e-commerce platforms, then spend the balance without "taking over" the wallet itself.  
- **Merchant QR / payout abuse.** TNG's merchant guidebook warns against unauthorised QR usage, self-scanning, and illegal use of business QR codes.  

This matters because the best Security & Fraud demo does **not** show a made-up generic fraud score. It shows one concrete scam path TNG plausibly cares about, then shows the exact intervention before payout.

### Track 3 — Innovation

Build a secure, AI-driven eWallet platform that enhances digital-payment transparency, automates regulatory compliance, and delivers real-time financial insights for users and regulators.

**Signals judges will look for:**

- This is the "moonshot" track — more latitude, but the pitch has to land on concrete benefit for **either** users **or** regulators (ideally both).  
- "AI-driven" in the brief is explicit — expect judges to probe the AI layer: what model, what data, why not a simple rule?  
- Compliance automation is a strong angle — BNM's e-money framework, AML/CFT, FATF travel rule, data-localisation — if you can show a compliance workflow that shrinks from hours to seconds, that's memorable.

**Idea seeds:**

- Natural-language financial copilot for eWallet users ("how much did I spend on food delivery last month, and can I cut 20%?").  
- Automated SAR/STR draft generator for compliance officers.  
- Merchant-side analytics surfacing anomalies (pricing errors, refund abuse, chargeback spikes).  
- Explainable AI transaction categorisation users can correct in-line.  
- Regulator dashboard: systemic-risk view across anonymised txn patterns.

### How TouchnoGo should choose a track

Decision heuristic (apply in order, stop at first "yes"):

1. Do we already have a prototype-shaped idea where one team member has domain depth? → pick that track.  
2. Which track has the most *specific*, *Malaysian-context* insight we can show off (local scam flavours, local underserved segment, local regulatory quirk)? → pick that track.  
3. Security & Fraud tends to be the easiest to make visceral in a 4-minute demo (show the scam → show the intervention). Innovation is the highest ceiling but hardest to make concrete. Financial Inclusion is the most heart-strings-tugging but requires genuine user empathy to not feel generic.

---

## 4\. Deliverables & Submission ✅ VERIFIED

**Seven fields**, all required, all submitted through a **single Google Form** (link distributed by organisers). Submission window is a hard **30 minutes**: `09:00–09:30` on Sunday 26 April. Miss it and you're out of the pitching rounds.

### 4.0 The seven submission fields

| \# | Field | What to prep the night before |
| :---- | :---- | :---- |
| 1 | **Team Name** | `TouchnoGo` (copy-paste it exactly; don't freestyle). |
| 2 | **Project Name, Description, Track** | One catchy name \+ a 2–3 sentence description \+ chosen track. Paste-ready in Google Docs. |
| 3 | **Implementation & Inspiration** | Short write-up: what you built, the core insight, the "why this, why now". 150–250 words. |
| 4 | **Pitch Deck Link** | Google Slides link (set to "Anyone with the link can view"). PDF export optional as backup. |
| 5 | **Demo Video Link** | YouTube **unlisted** or Google Drive link (public view). |
| 6 | **Deployment Link** | Live URL that a judge can open from a phone. |
| 7 | **GitHub Repo Link** | Public repo. `README.md` front-loaded with problem → solution → architecture → run instructions. |

**Pre-submission drill (do this at 08:30 on Day 2):**

- Copy all 7 values into a single Google Doc. Cross-check every link opens in an incognito window.  
- Tag the repo `v1-submission` before pasting the URL so reviewers see a frozen snapshot.  
- Assign **one person** to hit Submit at 09:00 sharp. Everyone else stays off git.

### 4.1 GitHub repository

- Assume **public** (you're pasting the link to judges who won't ask to be added).  
- `README.md` should open with: problem statement, 2-line solution, architecture diagram, run instructions, team members, track, cloud-platform breakdown (which service on Alibaba `ap-southeast-3`, which on AWS `ap-southeast-5`/`ap-southeast-1`).  
- Commit hygiene matters: avoid one `final-FINAL-v2.zip` commit. Regular commits from multiple authors signal real teamwork.  
- Include a LICENSE (MIT or Apache-2.0 is safest).  
- Do **not** commit API keys, `.env` files, or cloud credentials. Rotate anything you accidentally pushed before submitting.

### 4.2 Pitch deck

- Target 8–12 slides. Suggested flow:  
  1. Team \+ track  
  2. The user and their pain (with a real persona, not "everyone")  
  3. The insight — *why is this painful / unsolved today?*  
  4. The solution in one sentence \+ hero screenshot  
  5. How it works (architecture, 1 diagram — **show the 2 clouds and the AI layer explicitly**)  
  6. AI integration detail (model, data flow, why not a simple rule) — **this maps directly to Judging Criterion \#1**  
  7. Security & compliance posture  
  8. Business impact / metrics we'd move — **this maps to Judging Criterion \#4 (Impact & Feasibility)**  
  9. What we built in 24h vs. what's next  
  10. Thanks / team contacts  
- Design: pick a template, keep type ≥ 24pt, no wall-of-text slides, one idea per slide.

### 4.3 Demo video

- No official length cap in the deck, but keep it **≤4 minutes** — judges won't watch longer and the pitching slots are tight.  
- Treat it like a movie trailer, not a product tour.  
- Structure: problem (30s) → demo of the happy path (2m) → differentiation / insight (1m) → ask / close (30s).  
- Record with OBS or Loom; voiceover \> live speaker head (easier to re-record).  
- Export 1080p MP4. Upload to YouTube **unlisted** and put the link in the GitHub README.  
- Start recording your "submission cut" by midnight Day 1\. Do not save it for the last hour.

### 4.4 Deployment

- Must be a **live URL** a judge can open — not "clone and run locally".  
- Use your Alibaba credits for anything hosted in Malaysia region; use AWS in Malaysia or Singapore region (see §4.6).  
- Seed data: preload realistic Malaysian-context data (RM amounts, real merchant names, Bahasa text) — generic `Lorem ipsum` kills immersion.  
- Have a **backup**: a screen-recorded walkthrough on your laptop in case WiFi dies during pitches. (It will. WiFi always dies during pitches.)

### 4.5 Submission mechanics ✅ VERIFIED

- **Channel:** a single Google Form (link shared by organisers on-site / in the Discord announcement channel).  
- **Window:** `09:00–09:30` Sun 26 Apr. **30 minutes, hard.**  
- **After 09:30:** Preliminary Judging begins (09:30–12:00), so there is zero slack.  
- **Freeze the repo** at 09:00 — any commits after that risk looking like retroactive work. Tag a release (`v1-submission`) right before you submit.

### 4.6 Cloud & AI requirements ✅ VERIFIED — **non-negotiable**

These are scoring-criterion requirements, not suggestions. "Multi-Cloud Service Usage" is literally Judging Criterion \#3; "AI & Intelligent Systems" is Judging Criterion \#1.

| Requirement | Detail | How to prove it in the pitch |
| :---- | :---- | :---- |
| **Alibaba Cloud** | **USD 300** credit. **Strictly `ap-southeast-3` (Malaysia) region only.** Provisioning outside this region won't be credited — and worse, may breach the rules. 1 account per team. | Screenshot the region selector in the deck. Name specific services (ECS, RDS, OSS, PAI, Model Studio, etc.). |
| **AWS** | **USD 250** credit. **ONLY `ap-southeast-5` (Malaysia) or `ap-southeast-1` (Singapore)** — NOT any region. Note: **Bedrock, Textract, Rekognition, Comprehend are Singapore-only**. 1 account per team. | Name specific services (Lambda, S3, Bedrock, SageMaker, etc.) and their region. |
| **Multi-cloud** | You **MUST use ≥2 cloud platforms**. | One architecture slide showing workloads split across both. Don't fake it — a trivial S3 bucket for logos doesn't count; judges will probe. |
| **AI integration** | Must be **meaningful** to the problem statement. | One slide answering: what model, what data, why AI solves this better than rules. Explainability \> flashy LLM calls. |

**Practical split that satisfies both clouds cleanly (pick what fits your stack):**

- Alibaba (`ap-southeast-3`) → primary backend \+ DB (ECS/RDS/OceanBase) \+ data residency story for BNM compliance angle.  
- AWS (`ap-southeast-1` Singapore) → AI/ML inference (**Bedrock / Textract / Rekognition / Comprehend are here**) or heavy serverless workloads.  
- AWS (`ap-southeast-5` Malaysia) → any backend/data you want to keep in-country but running on AWS infra.  
- Or inverted: AWS for backend, Alibaba Model Studio / PAI-EAS for the AI layer hosted in Malaysia.

**Avoid the multi-cloud trap:** don't waste 3 hours on Sunday morning wiring a second cloud just to tick the box. Decide the split during the first 2 hours on Saturday, stand both up by lunch, and treat them as load-bearing from the start.

---

## 5\. Judging Criteria ✅ VERIFIED — **5 criteria, same for Prelims and Grand Final**

The deck confirms **five** explicit criteria (no published numerical weights; assume broadly equal weighting). The deck also states: *"TNG Digital reserves the right to judge all submissions and determine final outcomes at its sole discretion. All decisions are final."*

| \# | Criterion | Official definition | What this means for TouchnoGo |
| :---- | :---- | :---- | :---- |
| 1 | **AI & Intelligent Systems** | Effective and meaningful integration of Artificial Intelligence to address the problem statements. | Don't bolt on an LLM. Have a crisp answer for "why AI, not rules" and a specific model/data flow. |
| 2 | **Technical Implementation** | Scalability, robustness, security, prototype. | Does it actually work? Reasonable architecture? Clean repo? Does not crash on the demo? |
| 3 | **Multi-Cloud Service Usage** | Effective and purposeful use of at least two or more cloud platforms. | Both clouds must do real work. Split must make sense (latency, cost, compliance, service availability). |
| 4 | **Impact & Feasibility** | Real-world use case relevance, sustainability and potential adoption. | Could TNG ship this? Unit economics? Who is the user and why do they care? |
| 5 | **Presentation & Teamwork** | Clarity in project demo and pitch, teamwork, documentation quality. | Rehearsed pitch. Clear README. Evidence everyone contributed. |

**Design your project backwards from these 5 criteria.** Every 2 hours during the hack, ask: "If a judge scored us right now on these 5, where would we lose the most?" Fix that.

**Strategic implication:** AI quality and multi-cloud *architecture* together represent \~40% of the rubric. A generic CRUD app with a ChatGPT-wrapper chatbot and a spare S3 bucket will flame out on criteria 1 and 3 no matter how polished the demo is.

### What the criteria mean in practice

#### 1. AI & Intelligent Systems

- The common failure mode is using the wrong AI for the wrong problem.
- Judges will ask **why this model or method**. Be ready to defend LLM vs rules vs supervised model vs unsupervised pattern detection.
- Do not spam AI features. One well-justified AI loop beats five shallow ones.
- The strongest answer is: `this part needs judgment, summarisation, evidence assembly, or tradeoff simulation, so AI belongs here; this other part is deterministic, so rules belong there.`

#### 2. Technical Implementation

- A beautiful first 30 seconds that fails after one click is a losing build.
- Expect pressure on edge cases, security, and whether the prototype still works after the scripted happy path.
- The team should be able to say what happens on timeout, weak evidence, stale data, duplicate events, and false positives.

#### 3. Multi-Cloud Service Usage

- "Provider 1 hosts the app, provider 2 hosts the model" is fine **only if** you can explain why that split exists.
- The split should map to latency, data residency, service availability, cost, or a specific managed capability.
- Do not add a second cloud just to satisfy the checkbox.

#### 4. Impact & Feasibility

- The user must be real, the pain must be real, and the workflow must sound like something TNG could actually pilot.
- That said, hackathons are performative. A boring but real problem can still lose if the pain is not visible fast.
- The best answer is a real operational pain with a sharp before/after moment in the demo.

#### 5. Presentation & Teamwork

- Clarity wins.
- The idea has to be easy to follow under stress: who is the user, what happened, what did the system do, why should TNG care.
- UI polish, deck clarity, repo hygiene, and documentation quality all feed this criterion.

### Practical judging traps

- LLM bolted onto a deterministic prediction problem with no justification
- feature stuffing instead of one sharp workflow
- "works in the first 30 seconds" but not under follow-up
- second cloud added for optics instead of a real workload split
- real problem, weak story
- good idea, bad deck

### Judges we know of

- **Leslie Lip** — ✅ **Chief Technology Officer (CTO), TNG Digital** (giving the Welcome Address 9:00–9:25 AM Day 1\)  
- **Wei Wing Chiew** — CPO, TNG Digital **\[VERIFY role from on-site\]**  
- **Choong Hon Keat** — GM, Alibaba Cloud (Platinum Sponsor; delivers keynote 9:25–9:35 AM)  
- Additional judges from sponsors (Visa, AWS, OceanBase) likely rotate through **\[VERIFY\]**

Judge-whispering tip: with TNG's CTO delivering the welcome *and* judging, technical execution and architectural soundness will carry real weight. Rehearse answers to "how does this scale to 10M users?" and "why this cloud split?"

---

## 6\. Prizes & Perks ✅ VERIFIED

### Competition prizes (Total pool: **MYR 58,000**)

| Place | Prize |
| :---- | :---- |
| 🏆 **Grand Champion** | **MYR 25,000** |
| 🥈 **First Runner Up** | MYR 15,000 |
| 🥉 **Second Runner Up** | MYR 10,000 |
| Fourth Finalist | MYR 5,000 |
| Fifth Finalist | MYR 3,000 |

Note: the deck lists "Fourth Finalist" and "Fifth Finalist" but no "Third" — likely means 4th and 5th place in the Top 10\. Top 10 reach Grand Final; placements 1–5 get cash. **\[VERIFY whether places 6–10 get anything beyond finalist recognition\]**

### Lucky Draw prizes (for all participants, drawn during both days)

- 1× **MacBook Pro 14" M4 chip, 10-core, 512 GB**  
- 2× **Nintendo Switch 2**  
- 2× **iPhone 17 Pro 512 GB**  
- 2× **iPad Pro 11-inch 256 GB**  
- 2× **PS5 Slim Disc Edition (with 2 controller bundle)**  
- 2× **Sony WH-1000XM6 headphones**

Attend the lucky draw sessions — they run 1:45–6:00 PM Day 1 and during the 1:00–4:00 PM Day 2 slot. Separate **Grand Lucky Draw** at closing (4:00–5:00 PM Day 2).

### Non-cash perks

- **Cloud credits** — USD 300 Alibaba \+ USD 250 AWS (see §4.6).  
- **Swag** — T-shirts, bottles, stickers, **participant lanyard** (required — see §9).  
- **Food & drinks** — Breakfast (both days), Lunch (both days), Dinner (Day 1), snacks throughout.  
- **Mentor access** — 10–15 min slots per team, Day 1 1:30–6:00 PM (see §10.3).  
- **Tech talks** — TNG Digital, Alibaba Cloud, AWS, Visa, OceanBase (1:45–6:00 PM Day 1).  
- **Networking** — recruiters from TNG Digital and sponsors; bring a one-line elevator pitch per team member.  
- **Portfolio / LinkedIn value** — win or not, FINHACK 2026 is a strong line item; get a photo at the venue banner for posts later.

---

## 7\. Schedule ✅ VERIFIED from deck

### Day 1 — Saturday 25 April 2026

| Time | Item | TouchnoGo action |
| :---- | :---- | :---- |
| 8:15–8:45 AM | Arrival, Registration & Networking \+ **Breakfast** | Collect swag & badges (lanyard\!); grab a table with power sockets. |
| 8:45–9:00 AM | Adjourn into Main Hall per team mapping | Sit together; confirm everyone's logged into Alibaba SSO \+ AWS \+ Qoder. |
| 9:00–9:25 AM | **Welcome Address by Leslie Lip** (CTO, TNG Digital) | Scribe takes full notes — any judging hints, rule clarifications. |
| 9:25–9:35 AM | **Keynote by Alibaba Cloud** — Choong Hon Keat, GM | Listen for service recommendations; they're hints about what judges will look for. |
| 9:35–9:50 AM | Official Launch of TNGD FINHACK 2026 🚀 | Group photo moment. |
| 9:50–10:00 AM | Group Photo 📸 | Get a TouchnoGo team shot at the banner too. |
| 10:00–10:45 AM | **Hackathon Briefing** | **CRITICAL** — scribe captures rules, DQ triggers, IP clauses, pitch format, WiFi creds. |
| **11:00 AM** | **Build Mode Begins** 💻 | 45 min buffer from briefing end — use it to lock track, persona, killer moment (see §10.2). |
| 12:30–1:30 PM | Lunch Break | Eat *with* a mentor if one is free; steal feedback. |
| **1:30–6:00 PM** | **Mentorship Session** — 10–15 min per team, guided-free-form | See §10.3. Product lead \+ Tech lead split mentors and compare notes. |
| 1:45–6:00 PM | Tech Talks (TNG Digital, Alibaba Cloud, AWS, Visa, OceanBase) \+ Lucky Draws | Send 1 person to relevant tech talks; rest keeps building. |
| 6:30–8:00 PM | Dinner Break | Record a rough v0 demo video before anyone leaves. |
| 8:00 PM onwards | Free and Easy / Fun Mini Engagements | Attend enough to network; treat the rest as build time. |
| 00:00 onwards | **Night Shift** — quiet hours | Rest areas are **Pinnacle 7 & 8**. No loitering in corridors/restricted areas. |

### Day 2 — Sunday 26 April 2026

| Time | Item | TouchnoGo action |
| :---- | :---- | :---- |
| 7:30–8:45 AM | **Breakfast & Mingle** | Final polish — no new features. Deck final pass, deploy URL smoke-test, README final pass, all 7 submission values copied into one Google Doc. |
| 8:45–9:00 AM | Welcome Back \+ Final Briefing | Listen for any last-minute submission instructions. |
| **09:00–09:30** | ✅ **Submission Window (Google Form — 30 min hard)** | One person submits. Tag repo `v1-submission` at 09:00. Everyone else freezes git. |
| **09:30–12:00** | ✅ **Preliminary Judging Session** (group-by-group, in designated pitching stations) | Know your group/station as soon as announced. Do not leave the pitching area. |
| 12:00–1:00 PM | Lunch | Eat fast. If Top 10: start prepping Grand Final deck rehearsal on the pitch laptop. |
| **1:00–4:00 PM** | ✅ **Top 10 Finalist Pitching (Main Hall)** \+ Lucky Draw | Finalists only in Main Hall. Non-finalists: spectate, network with sponsor booths, enter lucky draws. |
| 4:00–5:00 PM | **Winner Announcement \+ Prize Presentation \+ Grand Lucky Draw \+ Closing Ceremony** | Photos, LinkedIn post, thank the mentors who helped. |
| 5:00 PM | Networking & Mingle | Trade LinkedIn contacts with mentors and TNG Digital folks. |

**Two pitching rounds with the same 5 judging criteria** — this means the pitch you land in the group round is essentially the pitch you repeat (better, calmer) in the Main Hall. Build one excellent 4-minute pitch, not two mediocre ones.

---

## 8\. Pre-event checklist (do tonight)

### Every team member brings

- [ ] Laptop \+ charger (bring a second charger if you have one; they vanish at hackathons)  
- [ ] Power extension / multi-plug (one per team saves fights for sockets)  
- [ ] Phone charger \+ power bank  
- [ ] Headphones / earbuds  
- [ ] **Thick jacket or hoodie** ✅ — deck explicitly warns "AC will get super cold during late hours of the night". Neck pillow nice-to-have.  
- [ ] Water bottle  
- [ ] Photo ID / MyKad (registration check)  
- [ ] Printed or screenshotted registration confirmation  
- [ ] **Participant lanyard** ✅ — must be worn **visibly at all times** (venue access \+ meal stations). Don't remove it even when sleeping.  
- [ ] Comfortable shoes — Connexion is a big complex  
- [ ] ✅ **Toiletries for overnight stay** — toothbrush & toothpaste, small towel, deodorant, face wash  
- [ ] ✅ Any allergy-related or prescription medication (deck explicitly calls this out)

### Team-level prep

- [ ] Decide **roles** (see §10.1) before kickoff — don't waste Day 1 hacking hour arguing.  
- [ ] Shortlist 2–3 **problem statements** per track so you can pivot fast after the briefing.  
- [ ] Create the GitHub repo tonight: `touchnogo-finhack` under a shared org or a personal account with all 4 as collaborators. Push a hello-world commit so auth is verified.  
- [ ] Spin up a shared **Google Drive** folder for the deck, demo script, video.  
- [ ] ✅ **Join the FINHACK 2026 Discord server** (invite distributed by organisers). Channels: `General`, `Announcement`, `Tech Support Ticketing System`, `AWS Support`, `Alibaba Cloud Support`.  
- [ ] Pre-install the stack on every laptop: Node/Python/whatever runtime, `git`, Docker (if using), editor, cloud CLIs (`aws`, Alibaba Cloud CLI).  
- [ ] ✅ **Log in to Alibaba Cloud SSO** using assigned username (e.g. `finhackuser2`) \+ assigned password: [https://signin-ap-southeast-1.alibabacloudsso.com/finhack/login](https://signin-ap-southeast-1.alibabacloudsso.com/finhack/login). After login click "Show Details" → "Developers" to enter console. **Set default region to `ap-southeast-3`**. One account per team.  
- [ ] ✅ **Log in to AWS Console** using assigned email \+ password: [https://d-9667a99701.awsapps.com/start/](https://d-9667a99701.awsapps.com/start/). Click `finhack_IsbUsersPS`. **Default region dropdown: set to `ap-southeast-5` (Malaysia) or `ap-southeast-1` (Singapore)**. Bedrock/Textract/Rekognition/Comprehend are Singapore-only. One account per team.  
- [ ] ✅ **Accept the Qoder invite** with your **personal email** (not team email): [https://qoder.com/organization/invitation/qdH0yjoCGArxKE0NlScnGMjpOzONCoR0](https://qoder.com/organization/invitation/qdH0yjoCGArxKE0NlScnGMjpOzONCoR0)  
- [ ] Pre-commit an architecture-diagram placeholder showing **two clouds \+ AI layer** — you'll fill it in during Day 1, but having the scaffold stops the "did we forget the architecture slide?" panic.  
- [ ] Book one **scribe** for the opening briefing (10:00–10:45 AM Day 1\) — someone who writes down every rule, judging clarification, WiFi SSID, and deadline verbatim.  
- [ ] ✅ Save the **emergency contact numbers** (see §12) into everyone's phones.

### Team name & identity prep

- [ ] One-line "what does TouchnoGo mean" answer — a judge **will** ask.  
- [ ] Team slide ready (logo optional but adds polish).  
- [ ] Group photo at the venue banner — plan to take it during the 9:50–10:00 AM slot.

---

## 9\. Venue & Logistics

### Address

**Grand Summit, Connexion Conference & Event Centre (CCEC)** Level M1, The Vertical, Bangsar South City No. 8, Jalan Kerinchi, 59200 Kuala Lumpur

### Getting there — LRT (recommended)

✅ Deck-confirmed 8-step route from Kerinchi LRT (KJ18):

1. Get off at **Kerinchi LRT Station**  
2. Walk through the **Kerinchi Link Bridge** heading towards **Avenue 7, The Horizon, Bangsar South**  
3. Take the escalator up and walk towards **Avenue 7 Luckin Coffee**  
4. From Luckin Coffee, walk straight till you see **e-mart** on the left side  
5. Continue past e-mart Bangsar South  
6. Walk straight until you see **AEON MaxValu Prime Sphere Bangsar**  
7. **Turn right** at the roundabout  
8. **Cross** the zebra crossing towards the **Vertical Podium**  
9. Reach the Vertical Podium, take the escalator to the **first floor**, **turn left** to the Connexion hall at the top of the escalator  
10. **Pro tip:** Look out for **Botanica \+ Co** and go up the elevator at their storefront to reach **Grand Summit (Level M1)**

### Getting there — self-drive

- Accessible via Federal Highway, New Pantai Expressway (NPE), SPRINT Highway, and Setiawangsa-Pantai Expressway (SPE).  
- Parking at The Vertical or Nexus @ Bangsar South.  
- ✅ **Parking fee (Sat/Sun & Public Holidays, 12:00 AM – 11:59 PM): Flat rate RM 3.00** — deck-confirmed.  
- Parking fills up fast on event days — arrive early or use LRT.

### On-site notes

- WiFi is usually provided; **\[VERIFY SSID \+ password at briefing\]**. Assume it will degrade under 300-person load. Have a hotspot backup on at least two phones.  
- Power sockets at Grand Summit tables are typically limited — that's why you bring a multi-plug.  
- Dress: smart casual. You'll be on-camera during opening and pitches.

### ✅ Housekeeping rules (from deck)

- **Respect the "Night Shift"** — keep noise to a minimum after 12:00 AM, especially near designated rest areas at **Pinnacle 7 & 8**.  
- **No loitering in restricted areas after 12:00 AM** — security rule.  
- **Cleanliness & waste disposal** — all food/waste in designated bins at the F\&B area.  
- **Technical support** — go straight to the **Tech Partner Booth** for any tech/system issues (also tracked via Discord `Tech Support Ticketing System` channel).  
- **Lanyard worn visibly at all times** — required for venue access AND meal stations. Losing it is a real problem.

### Overnight sleeping

- Claim a spot in **Pinnacle 7 or Pinnacle 8** before midnight — floor space and quiet corners fill up fast.  
- Rotate sleep in 2-hour blocks if staying on-site.  
- Bring toothbrush, small towel, deodorant, face wash — deck explicitly flags these.

### When something breaks ✅ VERIFIED

- **Tech / system / cloud issues:** Tech Partner Booth (on-site) OR `Tech Support Ticketing System` channel on Discord. Don't burn an hour debugging credits or region errors alone.  
- **AWS-specific issues:** `AWS Support` channel on Discord.  
- **Alibaba Cloud-specific issues:** `Alibaba Cloud Support` channel on Discord.  
- **Venue / food / access issues:** organiser registration desk.  
- **Medical / emergency:** notify organisers immediately (see §12 for emergency contacts); CCEC has on-site first aid.

---

## 10\. TouchnoGo Strategy Playbook

### Current best call after Day 1 judging notes

If the team needs a default right now, use this:

- Track: `Security & Fraud`
- Product: `AI-native pre-payout decision workspace for fraud + AML ops`
- Hero case: `cross-border near-watchlist payout`
- Hero replay: `watchlist threshold tradeoff`
- Core wedge: `evidence graph + specialist agents + human action rail + replay lab`

Why this is the best current call:

- it fits the repo direction already in flight
- it shows AI where AI helps, not where AI looks flashy
- it lands on a real intervention before money moves
- it gives the pitch a clear "before / after" moment

Use the exact CTO / mentor questions from `wbrya-unknown-design-20260425-101346.md`.

### 10.1 Role assignment (do this on Friday night)

With 4 people, aim for primary \+ secondary responsibilities:

| Person | Primary | Secondary |
| :---- | :---- | :---- |
| A — **Product/PM** | Problem framing, rubric alignment, pitch narrative, judge Q\&A | Writes backend glue code / deck |
| B — **Tech lead** | Architecture, repo, deployment, demo reliability | Pairs on frontend when needed |
| C — **Builder** | Whatever half of the stack tech lead isn't holding (usually frontend) | Handles seed data, demo script |
| D — **Design / Storyteller** | UI polish, pitch deck, 4-min video, screenshots | Scribe during briefing; one-pager README |

Principles:

- **Everyone codes or writes content during crunch.** No pure "manager" role at 4-person scale.  
- **One person owns the demo laptop** from hour 20 onwards — they don't touch git after that; they only polish the demo and rehearse.  
- **No late merges.** Freeze main branch 2 hours before submission. Polish on a `polish` branch and cherry-pick only safe commits.

### 10.2 The \~22-hour build plan (11:00 Sat → 09:00 Sun submission)

Build Mode officially starts 11:00 AM Day 1, not 09:00 AM. That's \~22 hours of actual build time — tighter than the "24-hour" mental model.

**Hours 0–1.5 (Sat 11:00–12:30): frame**

- Lock track, user persona, one-sentence solution, success metric for the demo.  
- Sketch the happy-path user journey on paper, end-to-end.  
- **Decide the 2-cloud split \+ AI layer** right here. Draw it on paper. Assign owners. Remember: **AWS AI services (Bedrock/Textract/Rekognition/Comprehend) \= Singapore region only**.  
- Identify the **single killer moment** in the demo — the 10 seconds that make a judge go "oh".

**Hours 1.5–6 (Sat 12:30–17:00, through lunch): walking skeleton on both clouds**

- End-to-end thinnest-possible version with workloads actually running on **both Alibaba (`ap-southeast-3`) and AWS (`ap-southeast-1` or `ap-southeast-5`)**. Ugly UI, fake data, but every step clickable.  
- If you can't get end-to-end on both clouds by hour 6, **cut scope ruthlessly**. The multi-cloud requirement has to be real, not cosmetic.  
- Book a mentor slot early — mentorship runs 1:30–6:00 PM with 10–15 min per team.

**Hours 6–12 (Sat 17:00–23:00, through dinner): deepen the killer moment \+ wire real AI**

- Every hour spent here should directly make the killer moment more convincing. Nothing else.  
- Replace any placeholder AI calls with the real model you're pitching. Log prompt/response pairs for the demo.

**Hours 12–18 (Sat 23:00 – Sun 05:00): polish**

- Real-ish data, Bahasa strings where relevant, brand-safe colours.  
- Write the README (with the 2-cloud architecture diagram). Write the deck outline. Write the demo script.  
- Record a **rough backup demo video** before anyone sleeps. You'll thank yourself.  
- **Quiet hours after midnight** — no loud speakerphones, mechanical keyboards muted near Pinnacle 7/8.

**Hours 18–21 (Sun 05:00–08:00): submission build**

- Tag `v1-submission` candidate. Diff against last night — you'll spot bugs.  
- Record the **submission-cut** demo video. Upload. Get the unlisted YouTube link.  
- Finalise the deck. Export to PDF as backup.  
- Copy all 7 submission values into the pre-flight Google Doc.

**Hour 21–22 (Sun 08:00–09:00): pre-flight**

- **Breakfast & Mingle** (7:30–8:45 AM); then **Welcome Back \+ Final Briefing** (8:45–9:00 AM).  
- No new features. No new commits after 08:55.  
- Open every link in an incognito window. Confirm deployment URL works on a phone on cellular.  
- Stand by the Google Form at 08:58. Submit at 09:00.

**Hour 22+ (Sun 09:30–12:00): preliminary pitch**

- Run the pitch 2x before your slot. Stopwatch it. One hostile Q\&A rehearsal.  
- If you advance to Top 10 (Main Hall, 1:00–4:00 PM), lunch window is prep — spend it on the laptop/HDMI/audio dry run, not on slide edits. Same pitch; same 5 judging criteria.

### 10.3 Mentor leverage ✅ VERIFIED mechanics

- **When:** Day 1, 1:30 PM – 6:00 PM.  
- **Format:** Guided free-and-easy — teams steer the conversation; mentors provide direction where needed.  
- **Duration:** **10–15 minutes per team**. That's short. Come prepared.

Rules:

1. **Bring a specific question** ("should we use rules or ML for fraud scoring given we have 22h left?") not "what do you think?"  
2. **Show, don't tell** — open the prototype on a laptop, let them click.  
3. **End with a commit** — "we'll try your suggestion on X, can we circle back at 17:00?" Mentors remember teams who close the loop.  
4. **Split mentor-hunting** between Product lead and Tech lead; they go to different mentors and compare notes. With 4.5 hours of mentorship and 10–15 min per team, you could get 2 slots if you move fast.

### 10.4 Avoiding common failure modes

- **Over-scoping** — 80% of hackathon teams fail here. If your skeleton isn't running by lunch on Day 1, you're in trouble.  
- **Demo that breaks on stage** — always run on localhost as a fallback; always have the screen-recorded demo ready.  
- **Deck made in the last 2 hours** — the deck is an *output* of your thinking, so start the outline on Day 1\.  
- **Team drift after dinner** — the "tired 19:00 lull" is real. Schedule a 15-min standup at 20:00 to realign.  
- **No story** — judges forget features; they remember *people whose lives got better*. Name your user. Say their name in the pitch. ("Aunty Siti sells nasi lemak at KL Sentral, and today she...").  
- **Cosmetic multi-cloud** — Judging Criterion \#3 is about *purposeful* use. An S3 bucket for logos won't pass.  
- **Shallow AI** — Judging Criterion \#1 rewards meaningful integration. "LLM wrapper" is not meaningful.

### 10.5 Pitch structure (4 minutes, maps to the 5 criteria)

Design the pitch for the preliminary group round. If you make the Top 10, you'll have a touch more room in the Main Hall — but don't rewrite; just breathe more.

00:00–00:30  Hook: the problem in a real Malaysian voice. One sentence of data.

00:30–01:00  Meet the user. Named persona, specific context.            → Criterion 4 (Impact)

01:00–02:30  Live demo of the killer moment. Talk over it.              → Criterion 2 (Tech Impl)

02:30–03:00  Architecture flash: 2 clouds \+ AI layer on one slide.      → Criteria 1 & 3 (AI \+ Multi-cloud)

             "Alibaba in Malaysia region for data residency, AWS

              Singapore for Bedrock inference, custom model for X."

03:00–03:30  Why this is hard / why now. The insight no-one else sees.

03:30–03:50  What we built in 22h vs. what comes next. (Shows realism.)

03:50–04:00  Team \+ ask. "We're TouchnoGo, and we'd love to ship

             this with TNG Digital."                                    → Criterion 5 (Presentation/Teamwork)

**Q\&A prep — rehearse answers to these:**

- "How exactly does your AI make this better than rules?" → Criterion 1  
- "Why two clouds? Walk me through what runs where and why." → Criterion 3  
- "How does this scale to 10 million TNG users?" → Criterion 4  
- "What's your false-positive / churn risk?" (Security & Fraud) → Criterion 4  
- "How does this reach people who don't have a smartphone?" (Financial Inclusion) → Criterion 4  
- "What would a BNM compliance officer say?" (Innovation) → Criterion 4  
- "How did your team divide the work?" → Criterion 5

---

## 11\. Rules, Ethics & Code of Conduct

### Participation rules **\[Most specifics VERIFY from Terms of Participation PDF\]**

- Code must be **written during the hackathon window** — typical hackathon rule. Pre-existing libraries / SDKs / your own boilerplate is usually fine if cited; pre-built feature code is not. **\[VERIFY from Terms of Participation\]**  
- No sharing of submissions between teams.  
- Respect other teams — no poaching mid-event, no shoulder-surfing other teams' laptops.  
- Follow housekeeping rules (§9): quiet hours, no loitering, lanyard on, waste in bins.  
- TNG Digital reserves the right to judge all submissions and determine final outcomes at its sole discretion. **All decisions are final.** ✅

### Intellectual property

- Expect a clause saying **teams retain IP** to what they build, while granting the organiser a **licence** to showcase / reference the project for marketing. Read the Terms of Participation PDF before you sign. **\[VERIFY specifics\]**  
- Do **not** use copyrighted images, music, or datasets you don't have a licence for in your deck or video — some hackathons DQ for this.

### Data & privacy

- If you use any real or simulated TNG transaction data, keep it synthetic. Never scrape real user data.  
- For the Security & Fraud track especially, use **synthetic scam transcripts** and **anonymised patterns** — do not use named real victims' data.

### Code of conduct

Be respectful. No harassment of any kind. Report issues to the organiser desk or emergency contacts (see §12). TNG Digital has its own CoC that applies; if you're unsure, err on the side of professionalism.

---

## 12\. Comms & Useful Links

### Primary channels

- **Website**: [https://www.tngdigitalfinhack.com](https://www.tngdigitalfinhack.com)  
- **Registration portal**: [https://register.tngdigitalfinhack.com/](https://register.tngdigitalfinhack.com/)  
- **Terms of Participation** (PDF): [https://tngdigitalfinhack.com/docs/Terms%20of%20Participation.pdf](https://tngdigitalfinhack.com/docs/Terms%20of%20Participation.pdf)  
- **Official briefing slides** (Canva): [https://canva.link/lzlidhwtoukod2w](https://canva.link/lzlidhwtoukod2w) — ✅ walked through end-to-end for v0.3

### ✅ Critical operational links (verified)

- **Alibaba Cloud SSO login** (for the USD 300 credit — Malaysia `ap-southeast-3` only): [https://signin-ap-southeast-1.alibabacloudsso.com/finhack/login](https://signin-ap-southeast-1.alibabacloudsso.com/finhack/login) — use assigned username (e.g. `finhackuser2`) \+ unique password. 1 account per team.  
- **AWS Console login** (for the USD 250 credit — Malaysia `ap-southeast-5` OR Singapore `ap-southeast-1`): [https://d-9667a99701.awsapps.com/start/](https://d-9667a99701.awsapps.com/start/) — use assigned email \+ unique password. Click `finhack_IsbUsersPS` to enter console. 1 account per team.  
- **Qoder organisation invite** (sign up with your **personal email**): [https://qoder.com/organization/invitation/qdH0yjoCGArxKE0NlScnGMjpOzONCoR0](https://qoder.com/organization/invitation/qdH0yjoCGArxKE0NlScnGMjpOzONCoR0)  
- **Submission Google Form**: link distributed by organisers on-site / in Discord `Announcement` channel — **do not** use a form link shared by another team.  
- **Tech Partner Booth** (on-site) — first stop for any cloud / system / tooling issue.

### ✅ Discord server channels (verified)

- `General`  
- `Announcement`  
- `Tech Support Ticketing System`  
- `AWS Support`  
- `Alibaba Cloud Support`

### ✅ Emergency contacts (verified)

| Contact | Role | Phone |
| :---- | :---- | :---- |
| **Carl** | Event Team | \+6012-690 8511 |
| **Lee Tian** | Event Team | \+6012-243 1204 |
| **Emily** | TNG Digital | \+6012-883 3718 |
| **Jeng Yee** | Developer Kaki | \+6019-476 5833 |

### Social / community

- Instagram: `@LifeAtTNGD`, `@touchngoewallet`  
- LinkedIn: TNG Digital company page  
- Facebook group: Hackathon Kaki (Developer Kaki community)

### Sponsors

- ✅ **Alibaba Cloud** (Platinum Sponsor) — USD 300 credits \+ OceanBase integration angle  
- ✅ **AWS** — USD 250 credits  
- ✅ **OceanBase** — distributed DB; Tech Talk Day 1; strong fit for Innovation track  
- ✅ **Visa** — payment-rail expertise; Tech Talk Day 1; strong fit for Security & Fraud track  
- **3Particle** — Official Event Partner  
- **Developer Kaki** — Community & Advisory Partner

---

## 13\. Open questions — what's left to confirm at Day 1 kickoff

Thanks to the deck walk-through, most items are now **resolved** ✅. The short list below is what's **still** outstanding — assign the scribe to close these out during the opening briefing on Day 1 (10:00–10:45 AM).

1. ~~Exact judging criteria~~ ✅ **RESOLVED — 5 criteria (§5); weights unpublished, assume broadly equal.**  
2. ~~Prize breakdown in RM~~ ✅ **RESOLVED — MYR 25k/15k/10k/5k/3k for places 1–5.** *(Outstanding: do places 6–10 get anything beyond finalist recognition?)*  
3. ~~Mentor schedule~~ ✅ **RESOLVED — Day 1 1:30–6:00 PM, 10–15 min/team, guided-free-form.** *(Outstanding: how exactly to book a slot — sign-up sheet, Discord, walk-up?)*  
4. **WiFi SSID \+ password** — still to confirm at briefing. **\[VERIFY\]**  
5. **IP / licensing clauses** — confirm what licence you grant the organiser and whether the repo must be public. **\[VERIFY from Terms of Participation PDF\]**  
6. **Pre-existing-code policy** — how much boilerplate / prior work is allowed. **\[VERIFY from Terms of Participation PDF\]**  
7. **Eligibility specifics** — is it Malaysian-citizens-only or open to PR/foreigners? Not in the deck. **\[VERIFY\]**  
8. **Preliminary pitch format specifics** — time limit per team (3 min? 5 min?), judges per group, whether the deck runs on org laptop or your own. **\[VERIFY at briefing\]**  
9. ~~Top 10 selection mechanism~~ Deck confirms Top 10 advance to Main Hall 1:00–4:00 PM. *(Outstanding: how many judges per prelim group, when exactly is the shortlist announced — right before 1:00 PM or during lunch?)*  
10. **Disqualification triggers** — late commits? unlicensed assets? incomplete deliverables? missing one of the 7 submission fields? wrong AWS region? **\[VERIFY\]**  
11. **Dietary requirements** — confirmed handled at registration, but double-check on arrival.  
12. **Google Form submission URL** — capture and pin in team chat \+ Discord the moment organisers share it.  
13. **Wei Wing Chiew's exact role at TNG Digital** — handbook earlier said CPO; not confirmed in deck. **\[VERIFY\]**

---

## Appendix A — Handbook changelog

| Version | Date | Notes |
| :---- | :---- | :---- |
| 0.1 | 2026-04-24 | Initial draft compiled from public sources (LinkedIn, Instagram, Facebook, Developer Kaki, Hackathon Kaki). Canva deck and tngdigitalfinhack.com not scrapable from server-side fetch — items marked **\[VERIFY\]** flagged for on-site confirmation. |
| 0.2 | 2026-04-24 | Incorporated verified organiser info: 7 submission fields, 09:00–09:30 Google Form window, Alibaba $300 (`ap-southeast-3` only) \+ AWS $200 credits, ≥2 clouds \+ meaningful AI required, Day 2 timeline (09:30–12:00 prelims, 13:00–16:00 Top 10 finals), midnight quiet hours, lanyard / Tech Partner Booth, Alibaba SSO & Qoder invite links. |
| **0.3** | **2026-04-24** | **Full Canva briefing deck walked through (30 slides).** Added: 5 verified judging criteria (§5, replacing estimated 6-criterion rubric); full prize breakdown MYR 58k total pool (§6); full Lucky Draw prize list (§6); verified Day 1 itinerary with named speakers (§7); verified Day 2 itinerary (§7); mentorship mechanics — 10–15 min/team guided-free-form (§10.3); Discord channel list (§12); AWS login URL (§12); emergency contacts (§12); Pinnacle 7 & 8 overnight rest areas (§9); housekeeping rules (§9); LRT route 10-step walkthrough (§9); parking fee RM 3 flat (§9). **Corrections made:** AWS credit is USD 250 not USD 200; AWS region is `ap-southeast-5`/`ap-southeast-1` only, not "any region" (Bedrock/Textract/Rekognition/Comprehend Singapore-only); Build Mode starts 11:00 AM not at kickoff (re-baselined §10.2 to \~22-hour plan); Leslie Lip is CTO giving Welcome Address, not just a judge. Cleared 7 of 13 open questions. |

| **0.4** | **2026-04-25** | **Day 1 judging-notes addendum.** Added: practical reading of all 5 judging criteria (§5); scam shortlist grounded in official TNG security material and Malaysian scam guidance (§3 Track 2); cleaner doc split between README / handbook / autoplan / design brief (§0.1); current best product call for the team (§10). This version is meant to reduce redundancy and keep the repo aligned on one product story. |

## Appendix B — Sources used to compile this handbook

- ✅ **TNG Digital FINHACK 2026 Pre-Hack Briefing (Canva deck)** — walked through end-to-end for v0.3: [https://www.canva.com/design/DAHHXcrKHaw/](https://www.canva.com/design/DAHHXcrKHaw/)  
- TNG Digital FINHACK 2026 official site (homepage metadata) — [https://www.tngdigitalfinhack.com](https://www.tngdigitalfinhack.com)  
- Instagram launch post — [https://www.instagram.com/p/DVtN\_hqEm1B/](https://www.instagram.com/p/DVtN_hqEm1B/)  
- Instagram reel on event — [https://www.instagram.com/reel/DVU-CJUgXkS/](https://www.instagram.com/reel/DVU-CJUgXkS/)  
- LinkedIn — Daren Tan announcement — [https://www.linkedin.com/posts/daren-tan\_finhack2026-tngd-developerkaki-activity-7434027948782866432-8GED](https://www.linkedin.com/posts/daren-tan_finhack2026-tngd-developerkaki-activity-7434027948782866432-8GED)  
- LinkedIn — Leslie Lip (CTO, TNG Digital) post — [https://www.linkedin.com/posts/leslie-lip-9a432996\_tng-digital-finhack-2026-activity-7434830855363051520-hMpJ](https://www.linkedin.com/posts/leslie-lip-9a432996_tng-digital-finhack-2026-activity-7434830855363051520-hMpJ)  
- LinkedIn — TNG Digital sponsor post — [https://www.linkedin.com/posts/tng-digital-ewallet\_tngd-finhack-2026-sponsors-activity-7442151993172934656-R1CL](https://www.linkedin.com/posts/tng-digital-ewallet_tngd-finhack-2026-sponsors-activity-7442151993172934656-R1CL)  
- Facebook — Developer Kaki announcement — [https://www.facebook.com/developerkaki/videos/tng-digital-finhack-hackathon-2026/932040759770075/](https://www.facebook.com/developerkaki/videos/tng-digital-finhack-hackathon-2026/932040759770075/)  
- Facebook — Hackathon Kaki group listing — [https://www.facebook.com/groups/hackathonkaki/posts/2008456063037106/](https://www.facebook.com/groups/hackathonkaki/posts/2008456063037106/)  
- TikTok promo — [https://www.tiktok.com/@touchngoewallet/video/7614069738825796885](https://www.tiktok.com/@touchngoewallet/video/7614069738825796885)  
- Terms of Participation (PDF, not accessible via automated fetch — open in browser to verify) — [https://tngdigitalfinhack.com/docs/Terms%20of%20Participation.pdf](https://tngdigitalfinhack.com/docs/Terms%20of%20Participation.pdf)
- Touch 'n Go eWallet Security Centre — [https://www.touchngo.com.my/ewallet/security-centre/](https://www.touchngo.com.my/ewallet/security-centre/)  
- Touch 'n Go digital wallet security tips (2025) — [https://www.touchngo.com.my/blog/Digital-wallet-security-tips](https://www.touchngo.com.my/blog/Digital-wallet-security-tips)  
- Touch 'n Go merchant guidebook — [https://www.touchngo.com.my/policies/touch-n-go-ewallet-merchant-s-guidebook/](https://www.touchngo.com.my/policies/touch-n-go-ewallet-merchant-s-guidebook/)  
- Touch 'n Go phishing report page — [https://www.touchngo.com.my/customer-service/report-phishing/](https://www.touchngo.com.my/customer-service/report-phishing/)  
- MCMC scam-pattern explainer — [https://mcmc.gov.my/en/media/press-clippings/spotting-signs-of-scams](https://mcmc.gov.my/en/media/press-clippings/spotting-signs-of-scams)  
- Bryan's Lab fraud notes — [https://www.bryanslab.com/blogs/fraud-2/](https://www.bryanslab.com/blogs/fraud-2/)  
- Bryan's Lab fraud ML notes — [https://www.bryanslab.com/blogs/fraud-ml/](https://www.bryanslab.com/blogs/fraud-ml/)

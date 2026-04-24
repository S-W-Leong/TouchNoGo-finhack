# TNG Digital FinHack Notes

## Hackathon

- Event: [TNG Digital FinHack](https://www.tngdigitalfinhack.com/)
- Format mentioned in chat:
  - teams of 5
  - 2 days, 1 night
  - day 1: 24-hour build
  - day 2: pitch and finals
  - physical event at Connexion, Bangsar South
  - Malaysian citizens only

## Tracks

1. Security and Fraud
2. Financial Inclusion
3. Innovation

## Theme from chat

- Build a secure, AI-driven eWallet platform that:
  - improves payment transparency
  - automates regulatory compliance
  - gives real-time financial insights to users and regulators

## Deliverables from chat

- GitHub repo
- pitch deck
- 4-minute demo video
- prototype

## TNG context from chat

- JV: Touch 'n Go + Ant International
- Chat claim: 23M+ verified users
- Chat claim: 2M+ merchants
- Products mentioned:
  - GO+
  - GOfinance
  - payments
  - insurance
  - investments
  - remittance
- Chat claim: $1B+ valuation
- Chat claim: Malaysia's first fintech unicorn
- Chat claim: about 45% owned by CIMB

## Judge context from chat

- Judges were not publicly named in the pasted notes
- Assumption in chat:
  - TNG Digital leadership
  - CTO / Head of Risk / CPO types
  - possibly BNM-adjacent reviewers
- Core pain point mentioned:
  - BNM fine tied to sanctioned individuals using the eWallet
  - strongest projects directly address fraud, AML, sanctions, compliance

## Best fit from chat

- Best track: Security and Fraud

## Deduped idea list

1. Real-time AML and sanctions screener
   - Analogs: Sardine, Unit21, ComplyAdvantage
   - Build: sanctions screening + transaction velocity rules + risk scoring + LLM-generated SAR drafts
   - Chat rank: 1

2. Automated suspicious activity report generator
   - Analogs: Hummingbird, NICE Actimize
   - Build: ingest flagged transaction clusters and auto-draft BNM-format SAR reports
   - Chat rank: 2

3. Behavioral fraud scoring engine
   - Analogs: Feedzai, Stripe Radar, Hawk AI, Sift
   - Build: real-time scoring using device fingerprint, transaction velocity, merchant category, time-of-day, explainability
   - Chat rank: 3

4. Drag-and-drop AML rules builder
   - Analogs: Unit21
   - Build: rules engine with LLM-assisted rule generation

5. Suspicious transaction monitoring for Malaysian eWallet patterns
   - Analogs: Hawk AI
   - Build: transaction monitoring tuned for local wallet behavior

6. Synthetic identity detection for eKYC
   - Analogs: Resistant AI
   - Build: detect fake or synthetic identities during onboarding

7. Identity risk scoring at onboarding
   - Analogs: Socure
   - Build: risk score using alternative identity signals

8. On-chain / crypto-adjacent payment risk scoring
   - Analogs: Elliptic
   - Build: risk scoring for BNPL or crypto-adjacent flows

9. Cross-border remittance anomaly detection
   - Analogs: ThetaRay
   - Build: anomaly detection for remittance patterns

10. Unified fraud scoring dashboard for risk ops
    - Analogs: Sift
    - Build: one dashboard for alerts, scores, triage

11. Open-source Radar-style rule engine
    - Analogs: Stripe Radar
    - Build: rules-based fraud engine for eWallet transactions

12. Liveness and document checks for high-risk actions
    - Analogs: Onfido
    - Build: extra verification step for risky account actions

13. KYC re-verification for dormant high-risk accounts
    - Analogs: Jumio
    - Build: trigger re-verification before risky reactivation or transactions

14. SAR prioritization
    - Analogs: NICE Actimize
    - Build: prioritize investigator queue by risk and expected value

## Top 3 from chat

### 1. Real-time AML + Sanctions Screener

- Why it ranked first in chat:
  - direct response to sanctions/compliance pain
  - immediate judge relevance
  - combines screening, transaction monitoring, and compliance output

### 2. Automated SAR Report Generator

- Why it ranked second in chat:
  - narrow but high-value ops tool
  - clear demo
  - saves investigator time

### 3. Behavioral ML Fraud Scoring

- Why it ranked third in chat:
  - strong DS/ML fit
  - easy to demo with synthetic data
  - good explainability story

## Bottom line from chat

- Best direction: Security and Fraud
- Highest-signal project: real-time AML + sanctions screener

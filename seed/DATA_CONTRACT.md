# Seed Data Contract

## Purpose

This contract defines the minimum data needed to make the demo believable.

The seed data must support:

- queue ranking
- case investigation
- evidence-backed recommendation
- human override
- note export
- scenario replay
- AI-assisted draft rule suggestion

## Naming Rules

- IDs should be stable and human-readable.
- Use prefixes like `CASE-`, `USR-`, `WAL-`, `DEV-`, `BEN-`, `WL-`, `ALT-`, `EV-`, `REC-`, `RPL-`, `PROP-`.
- Timestamps should be ISO 8601.
- Currency values should use `amount` plus `currency`.
- Ratios should be explicit decimal fields, not inferred strings.

## Enums

Use the allowed values in [schema/enums.json](./schema/enums.json).

The most important enums are:

- `scenario_type`
- `risk_level`
- `case_status`
- `entity_type`
- `edge_type`
- `evidence_kind`
- `agent_name`
- `recommendation_action`
- `review_label`
- `proposal_state`

## Top-Level Seed Files

### 1. Scenario Template

Purpose:

- define the narrative and value ranges for a scenario family

Required fields:

- `scenario_type`
- `title`
- `narrative`
- `must_have_signals`
- `variable_ranges`
- `default_recommendation`
- `replay_knobs`
- `generation_guardrails`

### 2. Case File

Purpose:

- provide the full data needed to render one investigation case

Required top-level fields:

- `seed_version`
- `case`
- `metrics`
- `entities`
- `entity_edges`
- `transactions`
- `alerts`
- `evidence_items`
- `agent_runs`
- `recommendation`
- `audit_events`

### 3. Policy Config File

Purpose:

- define deterministic policy evaluation and replay knobs

Required fields:

- `policy_version`
- `seed_version`
- `thresholds`
- `editable_in_scenario_lab`
- `policies`

### 4. Reviewed Anomaly Cluster File

Purpose:

- summarize 10 past reviewed anomalies for AI-assisted rule drafting

Required fields:

- `cluster_id`
- `scenario_family`
- `objective`
- `reviewed_cases`
- `common_patterns`
- `excluded_patterns`

### 5. Draft Rule Proposal File

Purpose:

- represent the AI-generated candidate rule as a reviewable artifact

Required fields:

- `proposal_id`
- `state`
- `source_cluster_id`
- `source_case_ids`
- `plain_language_rule`
- `structured_condition`
- `include_features`
- `excluded_features`
- `projected_impact`
- `required_human_checks`

### 6. Replay Result File

Purpose:

- compare baseline policy behavior against a candidate policy or draft rule

Required fields:

- `replay_run_id`
- `seed_version`
- `baseline_policy_version`
- `candidate_policy_version`
- `scenario_family`
- `case_ids`
- `summary`

## Object Shapes

### `case`

Required fields:

- `case_id`
- `title`
- `scenario_type`
- `status`
- `risk_level`
- `queue_score`
- `priority_rank`
- `created_at`
- `country_context`
- `currency`
- `assigned_queue`
- `reason_chips`

### `metrics`

Required fields:

- `watchlist_similarity`
- `device_age_hours`
- `wallet_inactive_days`
- `amount_myr`
- `avg_30d_amount_myr`
- `amount_to_30d_avg_ratio`
- `linked_prior_case_count`

### `entity`

Required fields:

- `entity_id`
- `entity_type`
- `display_name`
- `risk_level`
- `attributes`

Suggested `attributes` examples:

- user: `kyc_level`, `home_state`, `account_age_days`
- wallet: `wallet_tier`, `reactivated_at`, `last_active_at`
- device: `device_fingerprint`, `age_hours`, `is_new_for_payout`
- beneficiary: `bank_name`, `country`, `first_seen_at`
- watchlist: `list_name`, `matched_name`, `similarity`

### `entity_edge`

Required fields:

- `edge_id`
- `from_entity_id`
- `to_entity_id`
- `edge_type`
- `confidence`
- `explanation`

### `transaction`

Required fields:

- `transaction_id`
- `transaction_type`
- `direction`
- `status`
- `amount`
- `currency`
- `origin_country`
- `destination_country`
- `counterparty_entity_id`
- `occurred_at`

### `alert`

Required fields:

- `alert_id`
- `signal_source`
- `signal_code`
- `severity`
- `title`
- `summary`
- `related_entity_ids`
- `related_transaction_ids`
- `triggered_at`

### `evidence_item`

Required fields:

- `evidence_id`
- `kind`
- `title`
- `summary`
- `source`
- `confidence`
- `entity_ids`
- `alert_ids`
- `policy_ids`
- `observed_at`

Rules:

- `FACT` items should come from seeded facts or deterministic transforms
- `INFERENCE` items should be traceable to agent runs
- `POLICY` items should cite policy IDs
- `EXTERNAL_MATCH` items should carry match scores

### `agent_run`

Required fields:

- `run_id`
- `agent_name`
- `status`
- `summary`
- `evidence_ids`
- `policy_ids`
- `generated_at`

### `recommendation`

Required fields:

- `recommendation_id`
- `action`
- `confidence`
- `state`
- `rationale`
- `evidence_ids`
- `policy_ids`
- `human_override_options`
- `uncertainty`
- `generated_at`

Rules:

- every recommendation must cite at least 2 evidence IDs
- every `HOLD` or `ESCALATE` recommendation must cite at least 1 policy ID
- every override option should require a reason

### `audit_event`

Required fields:

- `event_id`
- `event_type`
- `actor_type`
- `actor_name`
- `summary`
- `created_at`

### `draft_rule_proposal`

Required fields:

- `proposal_id`
- `title`
- `state`
- `source_case_ids`
- `plain_language_rule`
- `structured_condition`
- `include_features`
- `excluded_features`
- `projected_impact`
- `required_human_checks`

Rules:

- keep the proposal readable by an analyst
- avoid conditions tied to one merchant, one device model, or one country unless the support is very strong
- include why some candidate fields were excluded as overfit or weak support

## Fake Data Quality Bar

Each hero case should have:

- 3 to 5 alerts
- 5 to 8 evidence items
- 4 to 6 entities
- at least 1 ambiguous element
- 1 recommendation
- 3 human override options

Each replay set should have:

- at least 8 cases
- a mix of true positives and false positives
- at least 1 policy tradeoff that is visible after replay

Each anomaly cluster should have:

- exactly 10 reviewed cases for the demo
- at least 2 counterexamples
- enough overlap to justify a candidate rule
- enough variation that the rule cannot be a copy-paste exact match

## What Makes The Fake Data Good

Good:

- the beneficiary similarity is near the warning threshold, not at a cartoonish 0.999
- the amount is high relative to the user's baseline, not randomly huge
- the new device age and reactivation window line up in time
- the rule proposal explains why `beneficiary_country` was excluded as too narrow

Bad:

- every risky case has every signal turned on
- the rule proposal uses 9 conditions and only matches one case
- the replay result changes on every run
- the recommendation cites no evidence IDs

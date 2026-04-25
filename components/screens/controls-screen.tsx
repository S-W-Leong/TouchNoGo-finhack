"use client";

import { startTransition, useMemo, useState } from "react";
import {
  CirclePlus,
  Play,
  Save,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type {
  ControlsWorkspace,
  RuleCondition,
  RuleDefinition,
} from "@/lib/domain/schema";
import { simulateReplay } from "@/lib/replay/simulate";

const actionOptions: RuleDefinition["action"][] = [
  "ALLOW",
  "REVIEW",
  "STEP_UP_VERIFICATION",
  "FREEZE_ACCOUNT",
  "ESCALATE",
];

const operatorOptions: RuleCondition["operator"][] = [
  "=",
  "!=",
  "<",
  ">",
  "<=",
  ">=",
  "IN",
  "INCLUDES",
];

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function cloneRule(rule: RuleDefinition) {
  return {
    ...rule,
    conditions: rule.conditions.map((condition) => ({ ...condition })),
  };
}

function formatTimeLabel(timestamp: number) {
  return new Intl.DateTimeFormat("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function buildRuleExpression(rule: RuleDefinition) {
  return `${rule.action} if ${rule.conditions
    .map(
      (condition) =>
        `:${condition.variableName} ${condition.operator} ${condition.value}`,
    )
    .join(" and ")}`;
}

function computeReplayRows(workspace: ControlsWorkspace, appliedRule: RuleDefinition) {
  return workspace.replayScenarios.map((scenario, index): ControlsWorkspace["replayScenarios"][number] => {
    if (index === 0) {
      return {
        ...scenario,
        afterAction:
          appliedRule.freezeThreshold <= 85
            ? appliedRule.action
            : "STEP_UP_VERIFICATION",
      };
    }

    if (index === 1) {
      return {
        ...scenario,
        afterAction:
          appliedRule.freezeThreshold <= 82 ? "STEP_UP_VERIFICATION" : "ALLOW",
      };
    }

    return {
      ...scenario,
      afterAction:
        appliedRule.action === "ESCALATE" || appliedRule.freezeThreshold <= 80
          ? "ESCALATE"
          : "REVIEW",
    };
  });
}

export function ControlsScreen({ workspace }: { workspace: ControlsWorkspace }) {
  const initialRule = workspace.rules[0];
  const [rules, setRules] = useState(workspace.rules.map(cloneRule));
  const [selectedRuleId, setSelectedRuleId] = useState(initialRule.ruleId);
  const [draftRule, setDraftRule] = useState(cloneRule(initialRule));
  const [appliedRule, setAppliedRule] = useState(cloneRule(initialRule));
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [replayedAt, setReplayedAt] = useState<string | null>(null);

  const replay = simulateReplay(workspace, appliedRule.freezeThreshold);
  const replayRows = useMemo(
    () => computeReplayRows(workspace, appliedRule),
    [appliedRule, workspace],
  );
  const hasPendingChanges =
    JSON.stringify(draftRule) !== JSON.stringify(appliedRule);

  const selectRule = (ruleId: string) => {
    const nextRule = rules.find((rule) => rule.ruleId === ruleId);

    if (!nextRule) {
      return;
    }

    startTransition(() => {
      setSelectedRuleId(ruleId);
      setDraftRule(cloneRule(nextRule));
      setAppliedRule(cloneRule(nextRule));
      setSavedAt(null);
      setReplayedAt(null);
    });
  };

  const updateDraftRule = (updater: (rule: RuleDefinition) => RuleDefinition) => {
    startTransition(() => {
      setDraftRule((current) => updater(cloneRule(current)));
    });
  };

  const saveDraft = () => {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.ruleId === selectedRuleId ? cloneRule(draftRule) : rule,
      ),
    );
    setSavedAt(formatTimeLabel(Date.now()));
  };

  const replayDraft = () => {
    setAppliedRule(cloneRule(draftRule));
    setReplayedAt(formatTimeLabel(Date.now()));
  };

  return (
    <div className="flex flex-col gap-3">
      <SectionCard
        compact
        title="Rules workspace"
        subtitle="Keep draft saves the working copy. Replay draft applies the current rule to the seeded scenarios so the tradeoff is visible before code changes."
        action={
          <div className="flex flex-wrap gap-1.5">
            <button className="button-secondary" onClick={saveDraft} type="button">
              <Save size={14} absoluteStrokeWidth />
              Keep draft
            </button>
            <button className="button-primary" onClick={replayDraft} type="button">
              <Play size={14} absoluteStrokeWidth />
              Replay draft
            </button>
          </div>
        }
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid gap-2">
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label={draftRule.status} tone={draftRule.status === "ACTIVE" ? "ALLOW" : draftRule.status === "DRAFT" ? "STEP_UP_VERIFICATION" : "REVIEW"} />
                {hasPendingChanges ? (
                  <StatusBadge label="Pending replay" tone="PENDING_USER" />
                ) : (
                  <StatusBadge label="Replay synced" tone="DELIVERED" />
                )}
              </div>
              <div className="mt-3 text-sm text-[var(--muted-strong)]">
                {draftRule.rationale}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
                <span className="mono">{draftRule.version}</span>
                <span>{draftRule.owner}</span>
                <span>{draftRule.appliesTo}</span>
                {savedAt ? <span>Draft saved {savedAt}</span> : null}
                {replayedAt ? <span>Last replay {replayedAt}</span> : null}
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal size={15} absoluteStrokeWidth />
                Applied rule expression
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-6">
                {buildRuleExpression(appliedRule)}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["Bad caught", replay.badCasesCaught],
              ["Good delayed", replay.goodUsersDelayed],
              ["Reviews", replay.analystReviews],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-3"
              >
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {label}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        <SectionCard
          compact
          title="All rules"
          subtitle="This replaces the vague controls page. Operators can now see the whole rule inventory before editing the selected one."
        >
          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="dense-table min-w-[780px]">
                <thead>
                  <tr>
                    <th>Rule</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Threshold</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr
                      key={rule.ruleId}
                      className={
                        rule.ruleId === selectedRuleId
                          ? "bg-slate-900/[0.03]"
                          : undefined
                      }
                    >
                      <td>
                        <button
                          className="text-left"
                          onClick={() => selectRule(rule.ruleId)}
                          type="button"
                        >
                          <div className="text-sm font-semibold">{rule.name}</div>
                          <div className="mt-1 text-xs text-[var(--muted)]">
                            {rule.ruleId} | {rule.appliesTo}
                          </div>
                        </button>
                      </td>
                      <td>
                        <StatusBadge
                          label={rule.status}
                          tone={
                            rule.status === "ACTIVE"
                              ? "ALLOW"
                              : rule.status === "DRAFT"
                                ? "STEP_UP_VERIFICATION"
                                : "REVIEW"
                          }
                        />
                      </td>
                      <td>
                        <StatusBadge label={formatLabel(rule.action)} tone={rule.action} />
                      </td>
                      <td className="mono text-sm">{rule.freezeThreshold}</td>
                      <td className="mono text-xs text-[var(--muted)]">{rule.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          compact
          title="Rule builder"
          subtitle="Edit the selected rule in UI instead of touching TypeScript. The code stays typed because the UI still maps to the schema."
        >
          <div className="grid gap-3">
            <div className="grid gap-2 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--muted)]">Rule name</span>
                <input
                  className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 outline-none"
                  onChange={(event) =>
                    updateDraftRule((rule) => ({
                      ...rule,
                      name: event.target.value,
                    }))
                  }
                  value={draftRule.name}
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="text-[var(--muted)]">Action</span>
                <select
                  className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 outline-none"
                  onChange={(event) =>
                    updateDraftRule((rule) => ({
                      ...rule,
                      action: event.target.value as RuleDefinition["action"],
                    }))
                  }
                  value={draftRule.action}
                >
                  {actionOptions.map((action) => (
                    <option key={action} value={action}>
                      {formatLabel(action)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_112px]">
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--muted)]">Freeze threshold</span>
                <input
                  className="w-full accent-[var(--accent)]"
                  max={90}
                  min={75}
                  onChange={(event) =>
                    updateDraftRule((rule) => ({
                      ...rule,
                      freezeThreshold: Number(event.target.value),
                    }))
                  }
                  step={1}
                  type="range"
                  value={draftRule.freezeThreshold}
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="text-[var(--muted)]">Score</span>
                <input
                  className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 outline-none"
                  max={90}
                  min={75}
                  onChange={(event) =>
                    updateDraftRule((rule) => ({
                      ...rule,
                      freezeThreshold: Number(event.target.value),
                    }))
                  }
                  type="number"
                  value={draftRule.freezeThreshold}
                />
              </label>
            </div>

            <div className="panel overflow-hidden">
              <div className="overflow-x-auto">
                <table className="dense-table min-w-[760px]">
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Operator</th>
                      <th>Value</th>
                      <th>Hint</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {draftRule.conditions.map((condition, index) => (
                      <tr key={condition.clauseId}>
                        <td>
                          <select
                            className="w-full rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 text-sm outline-none"
                            onChange={(event) =>
                              updateDraftRule((rule) => ({
                                ...rule,
                                conditions: rule.conditions.map((entry, entryIndex) =>
                                  entryIndex === index
                                    ? { ...entry, variableName: event.target.value }
                                    : entry,
                                ),
                              }))
                            }
                            value={condition.variableName}
                          >
                            {workspace.variableDefinitions.map((variable) => (
                              <option key={variable.name} value={variable.name}>
                                :{variable.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="w-full rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 text-sm outline-none"
                            onChange={(event) =>
                              updateDraftRule((rule) => ({
                                ...rule,
                                conditions: rule.conditions.map((entry, entryIndex) =>
                                  entryIndex === index
                                    ? {
                                        ...entry,
                                        operator: event.target.value as RuleCondition["operator"],
                                      }
                                    : entry,
                                ),
                              }))
                            }
                            value={condition.operator}
                          >
                            {operatorOptions.map((operator) => (
                              <option key={operator} value={operator}>
                                {operator}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            className="w-full rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 text-sm outline-none"
                            onChange={(event) =>
                              updateDraftRule((rule) => ({
                                ...rule,
                                conditions: rule.conditions.map((entry, entryIndex) =>
                                  entryIndex === index
                                    ? { ...entry, value: event.target.value }
                                    : entry,
                                ),
                              }))
                            }
                            value={condition.value}
                          />
                        </td>
                        <td className="text-sm text-[var(--muted)]">{condition.hint}</td>
                        <td>
                          <button
                            className="button-ghost px-2.5"
                            onClick={() =>
                              updateDraftRule((rule) => ({
                                ...rule,
                                conditions: rule.conditions.filter(
                                  (_, entryIndex) => entryIndex !== index,
                                ),
                              }))
                            }
                            type="button"
                          >
                            <Trash2 size={14} absoluteStrokeWidth />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                className="button-secondary"
                onClick={() =>
                  updateDraftRule((rule) => ({
                    ...rule,
                    conditions: [
                      ...rule.conditions,
                      {
                        clauseId: `C-${rule.conditions.length + 10}`,
                        variableName: workspace.variableDefinitions[0]?.name ?? "is_new_device",
                        operator: "=",
                        value: "true",
                        hint: "New clause added in the workspace.",
                      },
                    ],
                  }))
                }
                type="button"
              >
                <CirclePlus size={14} absoluteStrokeWidth />
                Add clause
              </button>

              <div className="text-xs text-[var(--muted)]">
                Draft expression: <span className="mono">{buildRuleExpression(draftRule)}</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        compact
        title="Replay output"
        subtitle="Same seed, deterministic result, visible tradeoff. Replay only changes when the user presses replay."
      >
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="dense-table min-w-[860px]">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {replayRows.map((scenario) => (
                  <tr key={scenario.scenarioId}>
                    <td className="text-sm font-semibold">{scenario.label}</td>
                    <td>
                      <StatusBadge
                        label={formatLabel(scenario.beforeAction)}
                        tone={scenario.beforeAction}
                      />
                    </td>
                    <td>
                      <StatusBadge
                        label={formatLabel(scenario.afterAction)}
                        tone={scenario.afterAction}
                      />
                    </td>
                    <td className="text-sm text-[var(--muted)]">{scenario.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        compact
        title="Variable registry"
        subtitle="This becomes the operator-friendly source of truth for what fields the rule builder can use."
      >
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="dense-table min-w-[820px]">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Type</th>
                  <th>Lookback</th>
                  <th>Source</th>
                  <th>Transform</th>
                </tr>
              </thead>
              <tbody>
                {workspace.variableDefinitions.map((variable) => (
                  <tr key={variable.name}>
                    <td>
                      <div className="mono text-sm">:{variable.name}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {variable.description}
                      </div>
                    </td>
                    <td>
                      <StatusBadge label={variable.type} tone="MEDIUM" />
                    </td>
                    <td className="text-sm">{variable.lookbackWindow}</td>
                    <td className="text-sm text-[var(--muted)]">
                      {variable.sourceFields.join(", ")}
                    </td>
                    <td className="mono text-xs">{variable.transform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

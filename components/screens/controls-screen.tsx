"use client";

import { startTransition, useState } from "react";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ControlsWorkspace } from "@/lib/domain/schema";
import { simulateReplay } from "@/lib/replay/simulate";

export function ControlsScreen({ workspace }: { workspace: ControlsWorkspace }) {
  const [freezeThreshold, setFreezeThreshold] = useState(85);
  const replay = simulateReplay(workspace, freezeThreshold);

  return (
    <div className="flex flex-col gap-3">
      <SectionCard
        compact
        title="Controls"
        subtitle="Edit one threshold. Replay immediately. Keep the diff readable."
        action={
          <div className="flex flex-wrap gap-1">
            <button className="button-primary">Keep draft</button>
            <button className="button-secondary">Replay</button>
          </div>
        }
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm">
              <span className="font-semibold">Freeze threshold</span>
              <span className="mono">{freezeThreshold}</span>
            </div>
            <input
              className="w-full accent-[var(--accent)]"
              max={90}
              min={75}
              onChange={(event) => {
                const nextValue = Number(event.target.value);
                startTransition(() => setFreezeThreshold(nextValue));
              }}
              step={1}
              type="range"
              value={freezeThreshold}
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {[78, 82, 85].map((preset) => (
                <button
                  key={preset}
                  className={preset === freezeThreshold ? "button-primary" : "button-secondary"}
                  onClick={() => startTransition(() => setFreezeThreshold(preset))}
                  type="button"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["Bad caught", replay.badCasesCaught],
              ["Good delayed", replay.goodUsersDelayed],
              ["Reviews", replay.analystReviews],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {label}
                </div>
                <div className="mt-1 text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard compact title="Rule configuration" subtitle="Readable for operators, explicit for engineers.">
          <div className="grid gap-2">
            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Draft rule</div>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-6">{workspace.draftRule}</pre>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Action bands</div>
                <div className="mt-2 space-y-2">
                  {workspace.actionBands.map((band) => (
                    <div key={`${band.minScore}-${band.maxScore}`} className="flex items-center justify-between gap-2 text-sm">
                      <span className="mono">{band.minScore}-{band.maxScore}</span>
                      <StatusBadge
                        label={band.action.replaceAll("_", " ")}
                        tone={band.action}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Prompt mapping</div>
                <div className="mt-2 text-sm">{workspace.promptTemplate}</div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard compact title="Replay output" subtitle="Same seed, deterministic result, visible tradeoff.">
          <div className="panel overflow-hidden border border-[var(--line)] bg-white/90 shadow-none">
            <table className="dense-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {workspace.replayScenarios.map((scenario) => (
                  <tr key={scenario.scenarioId}>
                    <td className="text-sm font-semibold">{scenario.label}</td>
                    <td>
                      <StatusBadge
                        label={scenario.beforeAction.replaceAll("_", " ")}
                        tone={scenario.beforeAction}
                      />
                    </td>
                    <td>
                      <StatusBadge
                        label={
                          scenario.afterAction === "FREEZE_ACCOUNT" && freezeThreshold < 85
                            ? "FREEZE ACCOUNT"
                            : scenario.afterAction.replaceAll("_", " ")
                        }
                        tone={scenario.afterAction}
                      />
                    </td>
                    <td className="text-sm text-[var(--muted)]">{scenario.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard compact title="Variable registry" subtitle="Compact table, not stacked cards.">
        <div className="overflow-x-auto">
          <table className="dense-table min-w-[720px]">
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
      </SectionCard>
    </div>
  );
}

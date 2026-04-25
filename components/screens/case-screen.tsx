"use client";

import { useState } from "react";
import {
  FileText,
  Files,
  Lock,
  MessageSquareShare,
  Scale,
  Send,
  ShieldAlert,
  Timer,
} from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { Sheet } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CaseRecord } from "@/lib/domain/schema";

type SheetKind = "score" | "evidence" | "policy" | "note" | null;

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function CaseScreen({ record }: { record: CaseRecord }) {
  const [sheet, setSheet] = useState<SheetKind>(null);
  const confidence = Math.round(record.recommendation.confidence * 100);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.18fr)_360px]">
      <div className="flex min-w-0 flex-col gap-3">
        <SectionCard
          compact
          title={`${record.caseId} | ${record.maskedUserLabel}`}
          subtitle={`${record.segmentLabel} | ${record.walletLabel} | ${record.regionLabel}`}
          action={
            <div className="flex flex-wrap gap-1.5">
              <button
                className="button-secondary"
                onClick={() => setSheet("score")}
                type="button"
              >
                <Scale size={14} absoluteStrokeWidth />
                Score logic
              </button>
              <button
                className="button-secondary"
                onClick={() => setSheet("evidence")}
                type="button"
              >
                <Files size={14} absoluteStrokeWidth />
                Evidence pack
              </button>
              <button
                className="button-secondary"
                onClick={() => setSheet("policy")}
                type="button"
              >
                <Lock size={14} absoluteStrokeWidth />
                Policy basis
              </button>
            </div>
          }
        >
          <div className="grid gap-2 md:grid-cols-4">
            <div className="rounded-[10px] border border-slate-900/10 bg-[var(--surface-contrast)] px-3 py-3 text-white">
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/70">Score</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight">{record.score}</div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                Recommendation
              </div>
              <div className="mt-2">
                <StatusBadge
                  label={formatLabel(record.recommendation.action)}
                  tone={record.recommendation.action}
                />
              </div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                Prompt
              </div>
              <div className="mt-2">
                <StatusBadge label={formatLabel(record.prompt.state)} tone={record.prompt.state} />
              </div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                Resolution
              </div>
              <div className="mt-2">
                <StatusBadge
                  label={formatLabel(record.resolutionState)}
                  tone={record.resolutionState}
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <SectionCard
            compact
            title="What happened"
            subtitle="Timeline first. Then what was attempted. Then what is still missing."
          >
            <div className="panel overflow-hidden">
              <table className="dense-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {record.timeline.map((event) => (
                    <tr key={event.eventId}>
                      <td className="mono text-xs">{event.occurredAt}</td>
                      <td>
                        <div className="text-sm font-semibold">{event.label}</div>
                        <div className="mt-1 text-xs text-[var(--muted)]">{event.details}</div>
                      </td>
                      <td>
                        <StatusBadge
                          label={event.succeeded === false ? "Blocked" : "Completed"}
                          tone={event.succeeded === false ? "BLOCKED" : "REACTIVATED"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <ShieldAlert size={15} absoluteStrokeWidth />
                  Suspicious actions
                </div>
                <div className="space-y-2">
                  {record.suspiciousActions.map((action) => (
                    <div key={action.actionId}>
                      <div className="text-sm font-semibold">
                        {action.label} | {action.amountLabel}
                      </div>
                      <div className="text-xs text-[var(--muted)]">{action.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Timer size={15} absoluteStrokeWidth />
                  Missing data
                </div>
                <div className="space-y-2">
                  {record.missingData.map((item) => (
                    <div key={item} className="text-sm text-[var(--muted-strong)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            compact
            title="Why this case is high-risk"
            subtitle="Facts stay separate from inference so the analyst can challenge the recommendation."
          >
            <div className="grid gap-2">
              <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Facts</div>
                <div className="mt-2 space-y-2 text-sm">
                  {record.facts.map((fact) => (
                    <div key={fact}>{fact}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  Inference
                </div>
                <div className="mt-2 space-y-2 text-sm">
                  {record.aiInferences.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                    Account changes
                  </div>
                  <div className="mt-2 space-y-2 text-sm text-[var(--muted-strong)]">
                    {record.accountChanges.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                    Device changes
                  </div>
                  <div className="mt-2 space-y-2 text-sm text-[var(--muted-strong)]">
                    {record.deviceChanges.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel overflow-hidden">
                <table className="dense-table">
                  <thead>
                    <tr>
                      <th>Linked entity</th>
                      <th>Relationship</th>
                      <th>Risk note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.linkedEntities.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-sm text-[var(--muted)]">
                          No linked entities on this case.
                        </td>
                      </tr>
                    ) : (
                      record.linkedEntities.map((entity) => (
                        <tr key={entity.entityId}>
                          <td>
                            <div className="text-sm font-semibold">{entity.label}</div>
                            <div className="mt-1 text-xs text-[var(--muted)]">
                              {entity.entityType}
                            </div>
                          </td>
                          <td className="text-sm">{entity.relationship}</td>
                          <td className="text-sm text-[var(--muted)]">{entity.riskNote}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard
          compact
          title="Evidence register"
          subtitle="Move the bulky cards into a proper table so operators can scan source and policy coverage faster."
        >
          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="dense-table min-w-[900px]">
                <thead>
                  <tr>
                    <th>Evidence</th>
                    <th>Kind</th>
                    <th>Source</th>
                    <th>Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {record.evidenceItems.map((item) => (
                    <tr key={item.evidenceId}>
                      <td>
                        <div className="text-sm font-semibold">{item.title}</div>
                        <div className="mt-1 text-xs text-[var(--muted)]">{item.summary}</div>
                      </td>
                      <td>
                        <StatusBadge label={item.kind} tone={item.kind === "POLICY" ? "REVIEW" : "MEDIUM"} />
                      </td>
                      <td>
                        <div className="mono text-xs">{item.source}</div>
                        <div className="mt-1 text-xs text-[var(--muted)]">{item.observedAt}</div>
                      </td>
                      <td className="text-sm text-[var(--muted-strong)]">
                        {item.policyIds.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="flex flex-col gap-3 xl:sticky xl:top-3 xl:self-start">
        <SectionCard
          compact
          title="Decision rail"
          subtitle={record.recommendation.rationale}
        >
          <div className="grid gap-2">
            <div className="rounded-[10px] border border-slate-900/10 bg-[var(--surface-contrast)] px-3 py-3 text-white">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">
                  {formatLabel(record.recommendation.action)}
                </div>
                <div className="mono text-xs">{confidence}%</div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  Customer prompt
                </div>
                <Send size={13} className="text-[var(--muted)]" absoluteStrokeWidth />
              </div>
              <div className="mb-2">
                <StatusBadge label={formatLabel(record.prompt.state)} tone={record.prompt.state} />
              </div>
              <div className="text-sm">{record.prompt.messagePreview}</div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="mb-2 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                Human override
              </div>
              <div className="grid gap-2">
                {record.recommendation.humanOverrideOptions.map((option) => (
                  <button
                    key={option}
                    className="button-secondary justify-between"
                    type="button"
                  >
                    <span>{formatLabel(option)}</span>
                    <span className="text-[11px] text-[var(--muted)]">reason required</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-3">
              <div className="mb-2 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                Audit trail
              </div>
              <div className="space-y-3">
                {record.auditEvents.map((event) => (
                  <div key={event.eventId}>
                    <div className="text-sm font-semibold">{event.summary}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">
                      {event.actorName} | {event.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
              <button
                className="button-primary justify-between"
                onClick={() => setSheet("note")}
                type="button"
              >
                <span>Export note</span>
                <FileText size={14} absoluteStrokeWidth />
              </button>
              <button className="button-danger justify-between" type="button">
                <span>Override action</span>
                <MessageSquareShare size={14} absoluteStrokeWidth />
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      <Sheet
        open={sheet === "score"}
        onClose={() => setSheet(null)}
        title="Score breakdown"
        subtitle="Deterministic inputs only. Every score component maps back to explicit evidence."
      >
        <div className="space-y-2">
          {record.scoreComponents.map((component) => (
            <div
              key={component.code}
              className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] p-3"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <strong className="text-sm">{component.label}</strong>
                <span className="mono text-xs">+{component.points}</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                Evidence IDs: {component.evidenceIds.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "evidence"}
        onClose={() => setSheet(null)}
        title="Evidence pack"
        subtitle="Inspectable inputs behind the recommendation."
      >
        <div className="space-y-2">
          {record.evidenceItems.map((item) => (
            <div
              key={item.evidenceId}
              className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] p-3"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <strong className="text-sm">{item.title}</strong>
                <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {item.kind}
                </span>
              </div>
              <div className="text-sm">{item.summary}</div>
              <div className="mt-2 text-xs text-[var(--muted)]">
                {item.evidenceId} | {item.source}
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "policy"}
        onClose={() => setSheet(null)}
        title="Policy basis"
        subtitle="Explicit control basis. Nothing here should require reverse-engineering."
      >
        <div className="space-y-2">
          {record.policyHits.map((hit) => (
            <div
              key={hit.policyId}
              className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] p-3"
            >
              <div className="text-sm font-semibold">{hit.policyId}</div>
              <div className="mt-1 text-sm">{hit.title}</div>
              <div className="mt-1 text-xs text-[var(--muted)]">{hit.explanation}</div>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "note"}
        onClose={() => setSheet(null)}
        title="Export note"
        subtitle="Support and compliance handoff text."
      >
        <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] p-3">
          <pre className="whitespace-pre-wrap font-inherit text-sm leading-6">
            {record.exportNote}
          </pre>
        </div>
      </Sheet>
    </div>
  );
}

"use client";

import { useState } from "react";
import { FileText, Lock, NotebookTabs, Scale, Send } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { Sheet } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CaseRecord } from "@/lib/domain/schema";

type SheetKind = "score" | "evidence" | "policy" | "note" | null;

export function CaseScreen({ record }: { record: CaseRecord }) {
  const [sheet, setSheet] = useState<SheetKind>(null);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_360px]">
      <div className="flex min-w-0 flex-col gap-3">
        <SectionCard
          compact
          title={`${record.caseId} | ${record.maskedUserLabel}`}
          subtitle={`${record.segmentLabel} | ${record.walletLabel} | ${record.regionLabel}`}
          action={
            <div className="flex flex-wrap gap-1">
              <button className="button-secondary" onClick={() => setSheet("score")} type="button">
                <Scale size={14} />
                Score
              </button>
              <button className="button-secondary" onClick={() => setSheet("evidence")} type="button">
                <NotebookTabs size={14} />
                Evidence
              </button>
              <button className="button-secondary" onClick={() => setSheet("policy")} type="button">
                <Lock size={14} />
                Policy
              </button>
            </div>
          }
        >
          <div className="grid gap-2 md:grid-cols-4">
            <div className="rounded-[10px] bg-[var(--surface-dark)] px-3 py-2 text-white">
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/70">Score</div>
              <div className="mt-1 text-2xl font-semibold">{record.score}</div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Recommendation</div>
              <div className="mt-1">
                <StatusBadge
                  label={record.recommendation.action.replaceAll("_", " ")}
                  tone={record.recommendation.action}
                />
              </div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Prompt</div>
              <div className="mt-1">
                <StatusBadge
                  label={record.prompt.state.replaceAll("_", " ")}
                  tone={record.prompt.state}
                />
              </div>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Resolution</div>
              <div className="mt-1">
                <StatusBadge
                  label={record.resolutionState.replaceAll("_", " ")}
                  tone={record.resolutionState}
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <SectionCard compact title="Investigation log" subtitle="Sequence, attempted action, and what actually happened.">
            <div className="panel overflow-hidden border border-[var(--line)] bg-white/90 shadow-none">
              {record.timeline.map((event) => (
                <div
                  key={event.eventId}
                  className="dense-list-row lg:grid-cols-[70px_minmax(0,1fr)_120px] lg:items-center"
                >
                  <div className="mono text-xs text-[var(--muted)]">{event.occurredAt}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{event.label}</div>
                    <div className="text-xs text-[var(--muted)]">{event.details}</div>
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {event.succeeded === false ? "blocked / failed" : "completed"}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Suspicious actions</div>
                <div className="mt-2 space-y-2">
                  {record.suspiciousActions.map((action) => (
                    <div key={action.actionId} className="text-sm">
                      <div className="font-semibold">{action.label} | {action.amountLabel}</div>
                      <div className="text-xs text-[var(--muted)]">{action.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Missing data</div>
                <div className="mt-2 space-y-2">
                  {record.missingData.map((item) => (
                    <div key={item} className="text-sm text-[var(--muted)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard compact title="Evidence and context" subtitle="Facts first. Inference second. Related changes nearby.">
            <div className="grid gap-2">
              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Facts</div>
                <div className="mt-2 space-y-1.5 text-sm">
                  {record.facts.map((fact) => (
                    <div key={fact}>{fact}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Inference</div>
                <div className="mt-2 space-y-1.5 text-sm">
                  {record.aiInferences.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Account changes</div>
                  <div className="mt-2 space-y-1.5 text-sm text-[var(--muted)]">
                    {record.accountChanges.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Device changes</div>
                  <div className="mt-2 space-y-1.5 text-sm text-[var(--muted)]">
                    {record.deviceChanges.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Linked entities</div>
                <div className="mt-2 space-y-2">
                  {record.linkedEntities.length === 0 ? (
                    <div className="text-sm text-[var(--muted)]">No linked entities on this case.</div>
                  ) : (
                    record.linkedEntities.map((entity) => (
                      <div key={entity.entityId} className="text-sm">
                        <div className="font-semibold">{entity.label}</div>
                        <div className="text-xs text-[var(--muted)]">
                          {entity.relationship} | {entity.riskNote}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:sticky xl:top-3 xl:self-start">
        <SectionCard compact title="Decision rail" subtitle={record.recommendation.rationale}>
          <div className="grid gap-2">
            <div className="rounded-[10px] bg-[var(--surface-dark)] px-3 py-2 text-white">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">
                  {record.recommendation.action.replaceAll("_", " ")}
                </div>
                <div className="mono text-xs">
                  {(record.recommendation.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Prompt status</div>
                <Send size={13} className="text-[var(--muted)]" />
              </div>
              <div className="mb-2">
                <StatusBadge
                  label={record.prompt.state.replaceAll("_", " ")}
                  tone={record.prompt.state}
                />
              </div>
              <div className="text-sm">{record.prompt.messagePreview}</div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Override options</div>
              <div className="mt-2 grid gap-2">
                {record.recommendation.humanOverrideOptions.map((option) => (
                  <button key={option} className="button-secondary justify-between">
                    <span>{option.replaceAll("_", " ")}</span>
                    <span className="text-[11px] text-[var(--muted)]">reason required</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Audit</div>
              <div className="mt-2 space-y-2">
                {record.auditEvents.map((event) => (
                  <div key={event.eventId} className="text-sm">
                    <div className="font-semibold">{event.summary}</div>
                    <div className="text-xs text-[var(--muted)]">
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
                <FileText size={14} />
              </button>
              <button className="button-danger justify-between" type="button">
                <span>Override</span>
                <span className="text-[11px]">reason</span>
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      <Sheet
        open={sheet === "score"}
        onClose={() => setSheet(null)}
        title="Score breakdown"
        subtitle="Deterministic drivers only."
      >
        <div className="space-y-2">
          {record.scoreComponents.map((component) => (
            <div key={component.code} className="rounded-[10px] border border-[var(--line)] bg-white p-3">
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
        title="Evidence"
        subtitle="Inspectable inputs behind the recommendation."
      >
        <div className="space-y-2">
          {record.evidenceItems.map((item) => (
            <div key={item.evidenceId} className="rounded-[10px] border border-[var(--line)] bg-white p-3">
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
        title="Policy"
        subtitle="Explicit control basis."
      >
        <div className="space-y-2">
          {record.policyHits.map((hit) => (
            <div key={hit.policyId} className="rounded-[10px] border border-[var(--line)] bg-white p-3">
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
        <div className="rounded-[10px] border border-[var(--line)] bg-white p-3">
          <pre className="whitespace-pre-wrap font-inherit text-sm leading-6">
            {record.exportNote}
          </pre>
        </div>
      </Sheet>
    </div>
  );
}

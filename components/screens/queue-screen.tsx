"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { QueueSnapshot } from "@/lib/repositories/risk-ops-repository";

const filterModes = ["ALL", "CRITICAL", "AUTO_ACTION"] as const;

export function QueueScreen({ snapshot }: { snapshot: QueueSnapshot }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filterModes)[number]>("ALL");

  const rows = useMemo(() => {
    return snapshot.rows.filter((row) => {
      const matchesQuery =
        query.length === 0 ||
        row.maskedUserLabel.toLowerCase().includes(query.toLowerCase()) ||
        row.caseId.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        filter === "ALL" ||
        (filter === "CRITICAL" && row.riskLevel === "CRITICAL") ||
        (filter === "AUTO_ACTION" &&
          (row.proposedAction === "FREEZE_ACCOUNT" ||
            row.proposedAction === "STEP_UP_VERIFICATION"));

      return matchesQuery && matchesFilter;
    });
  }, [filter, query, snapshot.rows]);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-3">
        <SectionCard
          compact
          title="ATO spike"
          subtitle={snapshot.banner.segmentLabel}
          action={<span className="pill mono">{snapshot.banner.numerator}/{snapshot.banner.denominator} expected</span>}
        >
          <div className="grid gap-2 md:grid-cols-[110px_minmax(0,1fr)] md:items-center">
            <div className="rounded-[12px] bg-[var(--surface-dark)] px-3 py-2 text-white">
              <div className="text-2xl font-semibold">{snapshot.banner.multiplier}x</div>
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">
                {snapshot.banner.signals.join(" | ")}
              </div>
              <div className="muted mt-1 text-xs">{snapshot.banner.summary}</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          compact
          title="Queue"
          subtitle="Dense triage view. More rows, less chrome."
          action={
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <span>{rows.length} shown</span>
            </div>
          }
        >
          <div className="mb-3 flex flex-col gap-2 md:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
              <Search size={14} className="text-[var(--muted)]" />
              <input
                aria-label="Search cases"
                className="w-full bg-transparent text-sm outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search case ID or masked user"
                value={query}
              />
            </label>

            <div className="flex flex-wrap gap-1">
              {filterModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={mode === filter ? "button-primary" : "button-secondary"}
                  onClick={() => setFilter(mode)}
                >
                  {mode === "ALL"
                    ? "All"
                    : mode === "CRITICAL"
                      ? "Critical"
                      : "Auto-action"}
                </button>
              ))}
            </div>
          </div>

          <div className="panel overflow-hidden border border-[var(--line)] bg-white/90 shadow-none">
            <div className="hidden grid-cols-[110px_minmax(0,1.2fr)_minmax(0,1fr)_72px_132px] gap-3 border-b border-[var(--line)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] lg:grid">
              <div>Case</div>
              <div>User / state</div>
              <div>Why now</div>
              <div>Score</div>
              <div>Action</div>
            </div>

            {rows.map((row) => (
              <Link
                key={row.caseId}
                href={`/cases/${row.caseId}`}
                className="dense-list-row transition-colors hover:bg-slate-50 lg:grid-cols-[110px_minmax(0,1.2fr)_minmax(0,1fr)_72px_132px] lg:items-center"
              >
                <div className="min-w-0">
                  <div className="mono text-xs font-semibold text-[var(--muted)]">
                    {row.caseId}
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    {row.scenarioType.replaceAll("_", " ")}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{row.maskedUserLabel}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <StatusBadge label={row.riskLevel} tone={row.riskLevel} />
                    <span className="text-xs text-[var(--muted)]">{row.currentControlState}</span>
                  </div>
                </div>

                <div className="min-w-0 text-xs text-[var(--muted)]">
                  {row.reasonChips.slice(0, 3).join(" | ")}
                </div>

                <div className="flex items-center gap-2 lg:block">
                  <div className="text-lg font-semibold">{row.score}</div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <StatusBadge
                    label={row.proposedAction.replaceAll("_", " ")}
                    tone={row.proposedAction}
                  />
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--surface-dark)]">
                    Open
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="flex flex-col gap-3 xl:sticky xl:top-3 xl:self-start">
        <SectionCard compact title="Metrics">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Open", snapshot.metrics.openCases],
              ["Auto", snapshot.metrics.autoActionReady],
              ["Pending", snapshot.metrics.pendingUser],
              ["Stopped", snapshot.metrics.preventedTransfers],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[10px] border border-[var(--line)] bg-white px-3 py-2">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {label}
                </div>
                <div className="mt-1 text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard compact title="Action ladder">
          <div className="space-y-2 text-sm">
            {[
              ["0-69", "ALLOW", "No hold"],
              ["70-84", "STEP_UP_VERIFICATION", "Pause and verify"],
              ["85-100", "FREEZE_ACCOUNT", "Stop movement"],
            ].map(([band, action, note]) => (
              <div
                key={band}
                className="flex items-center justify-between gap-2 rounded-[10px] border border-[var(--line)] bg-white px-3 py-2"
              >
                <div>
                  <div className="mono text-xs">{band}</div>
                  <div className="text-xs text-[var(--muted)]">{note}</div>
                </div>
                <StatusBadge label={action} tone={action as "ALLOW"} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

const toneMap = {
  CRITICAL: "border-rose-200 bg-rose-50 text-rose-700",
  HIGH: "border-amber-200 bg-amber-50 text-amber-700",
  MEDIUM: "border-sky-200 bg-sky-50 text-sky-700",
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
  FREEZE_ACCOUNT: "border-rose-200 bg-rose-50 text-rose-700",
  STEP_UP_VERIFICATION: "border-amber-200 bg-amber-50 text-amber-700",
  ESCALATE: "border-violet-200 bg-violet-50 text-violet-700",
  REVIEW: "border-sky-200 bg-sky-50 text-sky-700",
  ALLOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  SENT: "border-sky-200 bg-sky-50 text-sky-700",
  PENDING_SEND: "border-slate-200 bg-slate-100 text-slate-700",
  FAILED: "border-rose-200 bg-rose-50 text-rose-700",
  USER_REPLIED_TNG_LOGIN: "border-emerald-200 bg-emerald-50 text-emerald-700",
  EXPIRED: "border-rose-200 bg-rose-50 text-rose-700",
  PENDING_USER: "border-amber-200 bg-amber-50 text-amber-700",
  ESCALATED: "border-violet-200 bg-violet-50 text-violet-700",
  REACTIVATED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  BLOCKED: "border-rose-200 bg-rose-50 text-rose-700",
} as const;

export function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof toneMap;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[7px] border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.04em]",
        toneMap[tone],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

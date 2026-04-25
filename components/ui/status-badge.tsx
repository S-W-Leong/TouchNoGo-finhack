import { cn } from "@/lib/utils";

const toneMap = {
  CRITICAL: "bg-rose-50 text-rose-700 border-rose-200",
  HIGH: "bg-amber-50 text-amber-700 border-amber-200",
  MEDIUM: "bg-sky-50 text-sky-700 border-sky-200",
  LOW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FREEZE_ACCOUNT: "bg-rose-50 text-rose-700 border-rose-200",
  STEP_UP_VERIFICATION: "bg-amber-50 text-amber-700 border-amber-200",
  ESCALATE: "bg-violet-50 text-violet-700 border-violet-200",
  REVIEW: "bg-sky-50 text-sky-700 border-sky-200",
  ALLOW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SENT: "bg-sky-50 text-sky-700 border-sky-200",
  PENDING_SEND: "bg-slate-100 text-slate-700 border-slate-200",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200",
  USER_REPLIED_TNG_LOGIN: "bg-emerald-50 text-emerald-700 border-emerald-200",
  EXPIRED: "bg-rose-50 text-rose-700 border-rose-200",
  PENDING_USER: "bg-amber-50 text-amber-700 border-amber-200",
  ESCALATED: "bg-violet-50 text-violet-700 border-violet-200",
  REACTIVATED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  BLOCKED: "bg-rose-50 text-rose-700 border-rose-200",
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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        toneMap[tone],
      )}
    >
      {label}
    </span>
  );
}

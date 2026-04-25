import { cn } from "@/lib/utils";

const toneMap = {
  CRITICAL:              "border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.12)] text-[#ff7070]",
  HIGH:                  "border-[rgba(255,102,0,0.3)] bg-[rgba(255,102,0,0.12)] text-[#ff8533]",
  MEDIUM:                "border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.1)] text-[#38bdf8]",
  LOW:                   "border-[rgba(29,184,106,0.3)] bg-[rgba(29,184,106,0.1)] text-[#1db86a]",
  FREEZE_ACCOUNT:        "border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.12)] text-[#ff7070]",
  STEP_UP_VERIFICATION:  "border-[rgba(240,165,0,0.3)] bg-[rgba(240,165,0,0.1)] text-[#f0a500]",
  ESCALATE:              "border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)] text-[#a78bfa]",
  REVIEW:                "border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.1)] text-[#38bdf8]",
  ALLOW:                 "border-[rgba(29,184,106,0.3)] bg-[rgba(29,184,106,0.1)] text-[#1db86a]",
  DELIVERED:             "border-[rgba(29,184,106,0.3)] bg-[rgba(29,184,106,0.1)] text-[#1db86a]",
  SENT:                  "border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.1)] text-[#38bdf8]",
  PENDING_SEND:          "border-[rgba(138,155,176,0.3)] bg-[rgba(138,155,176,0.1)] text-[#8a9bb0]",
  FAILED:                "border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.12)] text-[#ff7070]",
  USER_REPLIED_TNG_LOGIN:"border-[rgba(29,184,106,0.3)] bg-[rgba(29,184,106,0.1)] text-[#1db86a]",
  EXPIRED:               "border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.12)] text-[#ff7070]",
  PENDING_USER:          "border-[rgba(240,165,0,0.3)] bg-[rgba(240,165,0,0.1)] text-[#f0a500]",
  ESCALATED:             "border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)] text-[#a78bfa]",
  REACTIVATED:           "border-[rgba(29,184,106,0.3)] bg-[rgba(29,184,106,0.1)] text-[#1db86a]",
  BLOCKED:               "border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.12)] text-[#ff7070]",
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

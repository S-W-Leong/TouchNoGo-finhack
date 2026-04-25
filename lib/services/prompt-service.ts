import type { CaseRecord } from "@/lib/domain/schema";
import { appendAuditEvent, appendTimelineEvent } from "@/lib/audit/audit-service";
import { createAuditId, nowIso } from "@/lib/demo-state/store";

export function ensurePromptForAction(record: CaseRecord) {
  if (
    record.recommendation.action !== "FREEZE_ACCOUNT" &&
    record.recommendation.action !== "STEP_UP_VERIFICATION"
  ) {
    return record.prompt;
  }

  const timestamp = nowIso();
  const messageSid = createAuditId("MSG");

  record.prompt = {
    ...record.prompt,
    state: "DELIVERED",
    messageSid,
    sentAt: timestamp,
    deliveredAt: timestamp,
    messagePreview:
      "Please go to Touch 'n Go to complete relogin / MFA / face recognition. Reply /tng-login once done.",
  };

  appendAuditEvent(
    record,
    "SYSTEM",
    "PromptService",
    "PROMPT_SENT",
    "WhatsApp re-verification prompt sent and marked delivered in seeded mode.",
  );
  appendTimelineEvent(
    record,
    "PROMPT",
    "Re-verification prompt delivered",
    "Seeded-mode prompt delivery simulated for demo flow.",
  );

  return record.prompt;
}

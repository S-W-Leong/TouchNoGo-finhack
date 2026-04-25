import type { CaseRecord } from "@/lib/domain/schema";
import { appendAuditEvent, appendTimelineEvent } from "@/lib/audit/audit-service";
import {
  getCaseFromState,
  getDemoData,
  markInboundProcessed,
  markStatusProcessed,
  nowIso,
  upsertCaseInState,
  wasInboundProcessed,
  wasStatusProcessed,
} from "@/lib/demo-state/store";

export function resolveCaseFromReply(caseId: string, inboundEventId: string) {
  if (wasInboundProcessed(inboundEventId)) {
    return getCaseFromState(caseId);
  }

  const record = getCaseFromState(caseId);

  if (!record) {
    return null;
  }

  markInboundProcessed(inboundEventId);
  record.prompt = {
    ...record.prompt,
    state: "USER_REPLIED_TNG_LOGIN",
  };
  record.status = "RESOLVED";
  record.resolutionState = "REACTIVATED";
  record.currentControlState = "REACTIVATED";
  record.exportNote = `${record.caseId}: User replied /tng-login. Account reactivated after re-verification.`;

  appendAuditEvent(
    record,
    "WEBHOOK",
    "TwilioInbound",
    "USER_REPLIED_TNG_LOGIN",
    "User replied /tng-login. Case auto-resolved as reactivated.",
  );
  appendTimelineEvent(
    record,
    "USER_REPLY",
    "User completed re-verification",
    "Inbound /tng-login reply received.",
  );

  upsertCaseInState(record);
  return record;
}

export function expirePromptForCase(caseId: string) {
  const record = getCaseFromState(caseId);

  if (!record) {
    return null;
  }

  if (record.prompt.state === "EXPIRED" || record.resolutionState === "ESCALATED") {
    return record;
  }

  record.prompt = {
    ...record.prompt,
    state: "EXPIRED",
    expiredAt: nowIso(),
  };
  record.status = "RESOLVED";
  record.resolutionState = "ESCALATED";
  record.currentControlState = "ESCALATED";
  record.exportNote = `${record.caseId}: Prompt expired without user reply. Escalated for manual review.`;

  appendAuditEvent(
    record,
    "SCHEDULER",
    "PromptExpirySweep",
    "PROMPT_EXPIRED",
    "Prompt expired without user reply. Case escalated by policy.",
  );
  appendTimelineEvent(
    record,
    "PROMPT_TIMEOUT",
    "Prompt expired",
    "No /tng-login reply received inside the seeded timeout window.",
    false,
  );

  upsertCaseInState(record);
  return record;
}

export function updatePromptStatus(messageSid: string, nextStatus: string, eventId: string) {
  if (wasStatusProcessed(eventId)) {
    return findCaseByMessageSid(messageSid);
  }

  const record = findCaseByMessageSid(messageSid);

  if (!record) {
    return null;
  }

  markStatusProcessed(eventId);
  const normalizedStatus = normalizePromptStatus(nextStatus);
  record.prompt = {
    ...record.prompt,
    state: normalizedStatus,
    deliveredAt: normalizedStatus === "DELIVERED" ? nowIso() : record.prompt.deliveredAt,
  };

  appendAuditEvent(
    record,
    "WEBHOOK",
    "TwilioStatus",
    "PROMPT_STATUS_UPDATED",
    `Prompt delivery status updated to ${normalizedStatus}.`,
  );

  upsertCaseInState(record);
  return record;
}

function normalizePromptStatus(nextStatus: string): CaseRecord["prompt"]["state"] {
  const lowered = nextStatus.toLowerCase();

  if (lowered === "delivered") {
    return "DELIVERED";
  }

  if (lowered === "failed" || lowered === "undelivered") {
    return "FAILED";
  }

  if (lowered === "sent" || lowered === "queued") {
    return "SENT";
  }

  return "SENT";
}

function findCaseByMessageSid(messageSid: string) {
  return getDemoData().cases.find((record) => record.prompt.messageSid === messageSid) ?? null;
}

import type { CaseRecord } from "@/lib/domain/schema";
import { canAttemptAlibaba } from "@/lib/config/env";
import { createAlibabaCompletion } from "@/lib/integrations/alibaba-modelstudio";

export async function generateCaseExplanation(record: CaseRecord) {
  const fallback = [
    `${record.caseId} is high-risk because ${record.reasonChips.slice(0, 3).join(", ")} happened in a tight sequence.`,
    `The most important facts are: ${record.facts.join(" ")}`,
    `Recommended action remains ${record.recommendation.action} because the policy chain and score components are already aligned.`,
  ].join(" ");

  if (!canAttemptAlibaba()) {
    return fallback;
  }

  try {
    const completion = await createAlibabaCompletion([
      {
        role: "system",
        content:
          "You are a fraud operations copilot. Explain the case using only the facts provided. Keep it concise, evidence-backed, and operational.",
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            caseId: record.caseId,
            maskedUserLabel: record.maskedUserLabel,
            score: record.score,
            facts: record.facts,
            aiInferences: record.aiInferences,
            recommendation: record.recommendation.action,
            policyIds: record.policyHits.map((hit) => hit.policyId),
            evidenceIds: record.evidenceItems.map((item) => item.evidenceId),
          },
          null,
          2,
        ),
      },
    ]);

    return completion?.trim() || fallback;
  } catch {
    return fallback;
  }
}

export async function draftCaseNote(record: CaseRecord) {
  const fallback = `${record.caseId}: ${record.recommendation.action} applied. Prompt state ${record.prompt.state}. Resolution ${record.resolutionState}.`;

  if (!canAttemptAlibaba()) {
    return fallback;
  }

  try {
    const completion = await createAlibabaCompletion([
      {
        role: "system",
        content:
          "Draft a short support and compliance handoff note. Keep it precise. Use only the facts provided.",
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            caseId: record.caseId,
            facts: record.facts,
            suspiciousActions: record.suspiciousActions,
            recommendation: record.recommendation.action,
            promptState: record.prompt.state,
            resolutionState: record.resolutionState,
          },
          null,
          2,
        ),
      },
    ]);

    return completion?.trim() || fallback;
  } catch {
    return fallback;
  }
}

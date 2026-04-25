import { beforeEach, describe, expect, test } from "vitest";

import { POST as sweepExpiredPrompts } from "@/app/api/internal/sweep-expired-prompts/route";
import { applyCaseAction } from "@/lib/services/action-orchestrator";
import { resetDemoState } from "@/lib/demo-state/store";
import { getCaseDetail } from "@/lib/services/case-service";
import { saveRuleDraft } from "@/lib/services/replay-service";
import { resolveCaseFromReply } from "@/lib/services/resolution-service";

describe("seeded demo flow", () => {
  beforeEach(() => {
    resetDemoState();
  });

  test("applying a severe action updates control state and prompt state", async () => {
    const record = applyCaseAction({
      caseId: "CASE-ATO-008",
      action: "STEP_UP_VERIFICATION",
      actorName: "Fraud analyst",
      actorType: "ANALYST",
    });

    expect(record?.currentControlState).toBe("STEP_UP_REQUIRED");
    expect(record?.prompt.state).toBe("DELIVERED");
    expect(record?.status).toBe("ACTION_APPLIED");
  });

  test("replying /tng-login resolves the case as reactivated", async () => {
    applyCaseAction({
      caseId: "CASE-ATO-008",
      action: "STEP_UP_VERIFICATION",
      actorName: "Fraud analyst",
      actorType: "ANALYST",
    });

    const resolved = resolveCaseFromReply("CASE-ATO-008", "SIM-IN-1");

    expect(resolved?.resolutionState).toBe("REACTIVATED");
    expect(resolved?.prompt.state).toBe("USER_REPLIED_TNG_LOGIN");
    expect(resolved?.status).toBe("RESOLVED");
  });

  test("saving a draft rule updates the controls workspace", async () => {
    const workspace = await import("@/lib/repositories/risk-ops-repository").then((module) =>
      module.riskOpsRepository.getControlsWorkspace(),
    );
    const nextRule = {
      ...workspace.rules[0],
      freezeThreshold: 80,
    };

    const updatedWorkspace = saveRuleDraft(workspace.rules[0].ruleId, nextRule);

    expect(updatedWorkspace.rules[0]?.freezeThreshold).toBe(80);
    expect(updatedWorkspace.draftRule).toContain(":is_new_device");
  });

  test("internal sweep route escalates delivered prompts with a valid token", async () => {
    applyCaseAction({
      caseId: "CASE-ATO-008",
      action: "STEP_UP_VERIFICATION",
      actorName: "Fraud analyst",
      actorType: "ANALYST",
    });

    const response = await sweepExpiredPrompts(
      new Request("http://localhost/api/internal/sweep-expired-prompts", {
        method: "POST",
        headers: { authorization: "Bearer change-me" },
      }),
    );

    expect(response.status).toBe(200);

    const record = await getCaseDetail("CASE-ATO-008");
    expect(record?.resolutionState).toBe("ESCALATED");
    expect(record?.prompt.state).toBe("EXPIRED");
  });
});

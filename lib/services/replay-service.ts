import type { ControlsWorkspace, RuleDefinition } from "@/lib/domain/schema";
import { getDemoData, replaceDemoData } from "@/lib/demo-state/store";
import { simulateReplay } from "@/lib/replay/simulate";

export interface ReplayPreview {
  badCasesCaught: number;
  goodUsersDelayed: number;
  analystReviews: number;
}

export function saveRuleDraft(ruleId: string, nextRule: RuleDefinition) {
  const data = getDemoData();
  const nextData = {
    ...data,
    controls: {
      ...data.controls,
      rules: data.controls.rules.map((rule) =>
        rule.ruleId === ruleId ? structuredClone(nextRule) : rule,
      ),
      draftRule: buildRuleExpression(nextRule),
    },
  };

  return replaceDemoData(nextData).controls;
}

export function replayRule(workspace: ControlsWorkspace, rule: RuleDefinition) {
  const metrics = simulateReplay(workspace, rule.freezeThreshold);
  const scenarios = workspace.replayScenarios.map((scenario, index) => {
    if (index === 0) {
      return {
        ...scenario,
        afterAction:
          rule.freezeThreshold <= 85 ? rule.action : "STEP_UP_VERIFICATION",
      };
    }

    if (index === 1) {
      return {
        ...scenario,
        afterAction:
          rule.freezeThreshold <= 82 ? "STEP_UP_VERIFICATION" : "ALLOW",
      };
    }

    return {
      ...scenario,
      afterAction:
        rule.action === "ESCALATE" || rule.freezeThreshold <= 80
          ? "ESCALATE"
          : "REVIEW",
      };
    }
  );

  return { metrics, scenarios };
}

export function buildRuleExpression(rule: RuleDefinition) {
  return `${rule.action} if ${rule.conditions
    .map((condition) => `:${condition.variableName} ${condition.operator} ${condition.value}`)
    .join(" and ")}`;
}

import type { CaseRecord, ControlsWorkspace, QueueBanner, QueueMetrics } from "@/lib/domain/schema";
import { loadDemoData } from "@/lib/seed/loaders";

export interface QueueRow {
  caseId: string;
  scenarioType: CaseRecord["scenarioType"];
  maskedUserLabel: string;
  score: number;
  riskLevel: CaseRecord["riskLevel"];
  reasonChips: string[];
  currentControlState: string;
  proposedAction: CaseRecord["recommendation"]["action"];
  status: CaseRecord["status"];
  resolutionState: CaseRecord["resolutionState"];
}

export interface QueueSnapshot {
  banner: QueueBanner;
  metrics: QueueMetrics;
  rows: QueueRow[];
}

export interface RiskOpsRepository {
  getQueueSnapshot(): Promise<QueueSnapshot>;
  getCaseDetail(caseId: string): Promise<CaseRecord | null>;
  getControlsWorkspace(): Promise<ControlsWorkspace>;
}

class SeedRiskOpsRepository implements RiskOpsRepository {
  async getQueueSnapshot(): Promise<QueueSnapshot> {
    const data = loadDemoData();

    return {
      banner: data.queueBanner,
      metrics: data.queueMetrics,
      rows: [...data.cases]
        .sort((left, right) => right.score - left.score)
        .map((record) => ({
          caseId: record.caseId,
          scenarioType: record.scenarioType,
          maskedUserLabel: record.maskedUserLabel,
          score: record.score,
          riskLevel: record.riskLevel,
          reasonChips: record.reasonChips,
          currentControlState: record.currentControlState,
          proposedAction: record.recommendation.action,
          status: record.status,
          resolutionState: record.resolutionState,
        })),
    };
  }

  async getCaseDetail(caseId: string) {
    const data = loadDemoData();
    return data.cases.find((record) => record.caseId === caseId) ?? null;
  }

  async getControlsWorkspace() {
    const data = loadDemoData();
    return data.controls;
  }
}

export const riskOpsRepository: RiskOpsRepository = new SeedRiskOpsRepository();


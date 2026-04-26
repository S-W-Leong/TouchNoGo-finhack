import { z } from "zod";

import seedDataJson from "@/seed/demo-core.json";
import {
  type CaseRecord,
  caseRecordSchema,
  demoDataSchema,
  type DemoData,
} from "@/lib/domain/schema";

const runtimeStateSchema = z.object({
  demoData: demoDataSchema,
  runtime: z.object({
    processedInboundEventIds: z.array(z.string()),
    processedStatusEventIds: z.array(z.string()),
    countersByPrefix: z.record(z.string(), z.number()),
    lastResetAt: z.string(),
  }),
});

type RuntimeState = z.infer<typeof runtimeStateSchema>;

let runtimeState: RuntimeState | null = null;

export function getDemoData(): DemoData {
  return structuredClone(getRuntimeState().demoData);
}

export function replaceDemoData(nextData: DemoData) {
  const parsed = demoDataSchema.parse(nextData);
  const state = getRuntimeState();
  state.demoData = parsed;
  syncCountersFromDemoData(state);
  return structuredClone(state.demoData);
}

export function resetDemoState() {
  runtimeState = createRuntimeState(readSeedData());
  return structuredClone(runtimeState.demoData);
}

export function getCaseFromState(caseId: string): CaseRecord | null {
  const record = getRuntimeState().demoData.cases.find((entry) => entry.caseId === caseId);
  return record ? structuredClone(record) : null;
}

export function upsertCaseInState(nextCase: CaseRecord) {
  const state = getRuntimeState();
  const parsedCase = caseRecordSchema.parse(nextCase);
  const existingIndex = state.demoData.cases.findIndex(
    (entry) => entry.caseId === parsedCase.caseId,
  );
  const nextCases = [...state.demoData.cases];

  if (existingIndex >= 0) {
    nextCases[existingIndex] = parsedCase;
  } else {
    nextCases.push(parsedCase);
  }

  state.demoData.cases = nextCases;
  syncCountersFromCase(state, parsedCase);

  return structuredClone(parsedCase);
}

export function wasInboundProcessed(eventId: string) {
  return getRuntimeState().runtime.processedInboundEventIds.includes(eventId);
}

export function markInboundProcessed(eventId: string) {
  const state = getRuntimeState();

  if (!state.runtime.processedInboundEventIds.includes(eventId)) {
    state.runtime.processedInboundEventIds.push(eventId);
  }
}

export function wasStatusProcessed(eventId: string) {
  return getRuntimeState().runtime.processedStatusEventIds.includes(eventId);
}

export function markStatusProcessed(eventId: string) {
  const state = getRuntimeState();

  if (!state.runtime.processedStatusEventIds.includes(eventId)) {
    state.runtime.processedStatusEventIds.push(eventId);
  }
}

export function createAuditId(prefix: string) {
  const state = getRuntimeState();
  const current = state.runtime.countersByPrefix[prefix] ?? 0;
  const next = current + 1;

  state.runtime.countersByPrefix[prefix] = next;

  return `${prefix}-${String(next).padStart(3, "0")}`;
}

export function nowIso() {
  return new Date().toISOString();
}

function getRuntimeState(): RuntimeState {
  if (!runtimeState) {
    runtimeState = createRuntimeState(readSeedData());
  }
  return runtimeState;
}

function readSeedData() {
  return demoDataSchema.parse(seedDataJson);
}

function createRuntimeState(seedData: DemoData): RuntimeState {
  const state: RuntimeState = {
    demoData: structuredClone(seedData),
    runtime: {
      processedInboundEventIds: [],
      processedStatusEventIds: [],
      countersByPrefix: {},
      lastResetAt: nowIso(),
    },
  };

  syncCountersFromDemoData(state);
  return state;
}

function syncCountersFromDemoData(state: RuntimeState) {
  state.runtime.countersByPrefix = {
    ...state.runtime.countersByPrefix,
    AE: findMaxSuffix(
      state.demoData.cases.flatMap((record) =>
        record.auditEvents.map((event) => event.eventId),
      ),
      "AE",
    ),
    TL: findMaxSuffix(
      state.demoData.cases.flatMap((record) =>
        record.timeline.map((event) => event.eventId),
      ),
      "TL",
    ),
    MSG: findMaxSuffix(
      state.demoData.cases
        .map((record) => record.prompt.messageSid)
        .filter((value): value is string => Boolean(value)),
      "MSG",
    ),
  };
}

function syncCountersFromCase(state: RuntimeState, record: CaseRecord) {
  state.runtime.countersByPrefix.AE = Math.max(
    state.runtime.countersByPrefix.AE ?? 0,
    findMaxSuffix(record.auditEvents.map((event) => event.eventId), "AE"),
  );
  state.runtime.countersByPrefix.TL = Math.max(
    state.runtime.countersByPrefix.TL ?? 0,
    findMaxSuffix(record.timeline.map((event) => event.eventId), "TL"),
  );
  state.runtime.countersByPrefix.MSG = Math.max(
    state.runtime.countersByPrefix.MSG ?? 0,
    findMaxSuffix(record.prompt.messageSid ? [record.prompt.messageSid] : [], "MSG"),
  );
}

function findMaxSuffix(values: string[], prefix: string) {
  return values.reduce((maxValue, value) => {
    const match = new RegExp(`^${prefix}-(\\d+)$`).exec(value);
    const numericValue = match ? Number.parseInt(match[1] ?? "0", 10) : 0;
    return Number.isFinite(numericValue) ? Math.max(maxValue, numericValue) : maxValue;
  }, 0);
}

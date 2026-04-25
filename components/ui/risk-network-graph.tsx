"use client";

import { useState, useMemo } from "react";
import { ReactFlow, type Node, type Edge, type NodeProps } from "@xyflow/react";
import type { CaseRecord } from "@/lib/domain/schema";

// ── Data shapes ───────────────────────────────────────────────────────────────

type RootNodeData = { label: string; caseId: string };
type EntityNodeData = {
  entityId: string;
  entityType: string;
  label: string;
  relationship: string;
  riskNote: string;
};

type RootFlowNode = Node<RootNodeData, "rootNode">;
type EntityFlowNode = Node<EntityNodeData, "entityNode">;

// ── Entity type color map (mirrors StatusBadge toneMap pattern) ───────────────

const ENTITY_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  DEVICE: {
    border: "rgba(56, 189, 248, 0.35)",
    bg: "rgba(56, 189, 248, 0.10)",
    text: "#38bdf8",
  },
  BENEFICIARY: {
    border: "rgba(240, 165, 0, 0.35)",
    bg: "rgba(240, 165, 0, 0.10)",
    text: "#f0a500",
  },
  ACCOUNT: {
    border: "rgba(29, 184, 106, 0.35)",
    bg: "rgba(29, 184, 106, 0.10)",
    text: "#1db86a",
  },
};

const NEUTRAL_STYLE = {
  border: "rgba(255, 255, 255, 0.10)",
  bg: "#111b2a",
  text: "#8a9bb0",
};

// ── Custom node components ────────────────────────────────────────────────────
// Must be defined at module level — moving inside the component causes React
// Flow to re-mount every node on every render due to new object reference.

function RootNodeComponent({ data }: NodeProps<RootFlowNode>) {
  return (
    <div
      style={{
        border: "1px solid rgba(255, 102, 0, 0.55)",
        background: "#0c2040",
        borderRadius: 8,
        padding: "10px 14px",
        minWidth: 160,
        maxWidth: 200,
        cursor: "default",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "var(--font-plex-mono), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#ff6600",
          marginBottom: 4,
        }}
      >
        {data.caseId}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#e8ecf0",
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

function EntityNodeComponent({ data }: NodeProps<EntityFlowNode>) {
  const base = ENTITY_STYLES[data.entityType] ?? NEUTRAL_STYLE;
  const hasRisk = data.riskNote.length > 0;

  return (
    <div
      style={{
        border: `1px solid ${hasRisk ? "rgba(224, 53, 53, 0.65)" : base.border}`,
        background: hasRisk ? "rgba(224, 53, 53, 0.12)" : base.bg,
        borderRadius: 8,
        padding: "10px 14px",
        minWidth: 140,
        maxWidth: 200,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "var(--font-plex-mono), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: hasRisk ? "#ff7070" : base.text,
          marginBottom: 4,
        }}
      >
        {data.entityType}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "#e8ecf0",
          lineHeight: 1.3,
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

// Module-level constant — must NOT be moved inside RiskNetworkGraph
const nodeTypes = {
  rootNode: RootNodeComponent,
  entityNode: EntityNodeComponent,
};

// ── Graph data builder ────────────────────────────────────────────────────────

const RADIUS = 200;

function buildGraphData(record: CaseRecord): { nodes: Node[]; edges: Edge[] } {
  const root: RootFlowNode = {
    id: "root",
    type: "rootNode",
    position: { x: 0, y: 0 },
    data: { label: record.maskedUserLabel, caseId: record.caseId },
  };

  const N = record.linkedEntities.length;

  const childNodes: EntityFlowNode[] = record.linkedEntities.map((entity, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / N;
    return {
      id: entity.entityId,
      type: "entityNode",
      position: {
        x: Math.round(RADIUS * Math.cos(angle)),
        y: Math.round(RADIUS * Math.sin(angle)),
      },
      data: {
        entityId: entity.entityId,
        entityType: entity.entityType,
        label: entity.label,
        relationship: entity.relationship,
        riskNote: entity.riskNote,
      },
    };
  });

  const edges: Edge[] = record.linkedEntities.map((entity) => ({
    id: `e-root-${entity.entityId}`,
    source: "root",
    target: entity.entityId,
    label: entity.relationship,
    type: "smoothstep",
    labelStyle: {
      fill: "#8a9bb0",
      fontSize: 10,
      fontFamily: "IBM Plex Mono, monospace",
    },
    labelBgStyle: { fill: "#0f1825", fillOpacity: 1 },
    labelBgPadding: [4, 6] as [number, number],
    labelBgBorderRadius: 3,
  }));

  return { nodes: [root, ...childNodes], edges };
}

// ── Main component ────────────────────────────────────────────────────────────

export function RiskNetworkGraph({ record }: { record: CaseRecord }) {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    if (record.linkedEntities.length === 0) {
      return {
        nodes: [
          {
            id: "root",
            type: "rootNode",
            position: { x: 0, y: 0 },
            data: { label: record.maskedUserLabel, caseId: record.caseId },
          } satisfies RootFlowNode,
        ] as Node[],
        edges: [] as Edge[],
      };
    }
    return buildGraphData(record);
  }, [record]);

  const selectedEntity =
    record.linkedEntities.find((e) => e.entityId === selectedEntityId) ?? null;

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.id === "root") {
      setSelectedEntityId(null);
      return;
    }
    setSelectedEntityId((prev) => (prev === node.id ? null : node.id));
  };

  return (
    <div>
      <div style={{ width: "100%", height: "460px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          onInit={(instance) =>
            setTimeout(() => instance.fitView({ padding: 0.3 }), 80)
          }
          onNodeClick={handleNodeClick}
          proOptions={{ hideAttribution: true }}
        />
      </div>

      {record.linkedEntities.length === 0 && (
        <div className="mt-3 rounded-[10px] border border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--muted)]">
          No linked entities recorded on this case.
        </div>
      )}

      {selectedEntity && (
        <div className="mt-3 rounded-[10px] border border-[var(--line-strong)] bg-[var(--surface-subtle)] p-4">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              {selectedEntity.entityType}
            </span>
            <span className="mono text-xs text-[var(--muted-strong)]">
              {selectedEntity.entityId}
            </span>
          </div>
          <div className="text-sm font-semibold">{selectedEntity.label}</div>
          <div className="mt-1 text-xs text-[var(--muted-strong)]">
            {selectedEntity.relationship}
          </div>
          {selectedEntity.riskNote && (
            <div className="mt-2 rounded-[6px] border border-[rgba(224,53,53,0.3)] bg-[rgba(224,53,53,0.08)] px-3 py-2 text-xs text-[#ff7070]">
              {selectedEntity.riskNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

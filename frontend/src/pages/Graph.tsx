import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";

import { getGraph } from "../services/graph";
import { getImpactAnalysis } from "../services/analysis";
import { getLayoutedElements } from "../utils/graphLayout";

import GraphToolbar from "../components/GraphToolbar";
import RepositoryExplorer from "../components/RepositoryExplorer";
import GraphCanvas from "../components/GraphCanvas";
import ImpactPanel from "../components/ImpactPanel";
import GraphStats from "../components/GraphStats";

interface BackendNode {
  id: string;
  label: string;
  file: string;
  line: number;
}

interface BackendEdge {
  source: string;
  target: string;
}

interface GraphResponse {
  nodes: BackendNode[];
  edges: BackendEdge[];
}

interface ImpactAnalysis {
  success: boolean;
  function: string;

  safe_to_delete: boolean;

  risk: string;

  impact_score: number;

  dependency_score: number;

  incoming_calls: number;

  outgoing_calls: number;

  affected_functions: string[];

  calls: string[];
}

export default function Graph() {
  const [searchParams] = useSearchParams();

  const repository = searchParams.get("repository") ?? "";

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const [selectedFunction, setSelectedFunction] =
    useState("");

  const [analysis, setAnalysis] =
    useState<ImpactAnalysis | null>(null);

  useEffect(() => {
    if (!repository) return;

    async function loadGraph() {
      try {
        const graph: GraphResponse =
          await getGraph(repository);

        const flowNodes: Node[] = graph.nodes.map(
          (node) => ({
            id: node.id,

            type: "functionNode",

            data: {
              label: node.label,
              file: node.file,
              line: node.line,
            },

            position: {
              x: 0,
              y: 0,
            },

            style: {
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
              borderRadius: 12,
            },
          })
        );

        const flowEdges: Edge[] = graph.edges.map(
          (edge, index) => ({
            id: `edge-${index}`,

            source: edge.source,

            target: edge.target,

            animated: false,

            style: {
              stroke: "#475569",
              strokeWidth: 1.5,
            },
          })
        );

        const layout = getLayoutedElements(
          flowNodes,
          flowEdges
        );

        setNodes(layout.nodes);

        setEdges(layout.edges);
      } catch (error) {
        console.error(
          "Failed to load graph:",
          error
        );
      }
    }

    loadGraph();
  }, [repository]);

  const handleNodeClick: NodeMouseHandler = async (
    _,
    node
  ) => {
    try {
      const result =
        await getImpactAnalysis(
          repository,
          node.id
        );

      setSelectedFunction(node.id);

      setAnalysis(result);

      setNodes((previousNodes) =>
        previousNodes.map((currentNode) => {
          const isSelected =
            currentNode.id === node.id;

          const isAffected =
            result.affected_functions.includes(
              currentNode.id
            );

          return {
            ...currentNode,

            style: {
              border: isSelected
                ? "3px solid #3b82f6"
                : isAffected
                ? "3px solid #ef4444"
                : "1px solid #334155",

              background: isSelected
                ? "#1e40af"
                : isAffected
                ? "#7f1d1d"
                : "#0f172a",

              color: "white",

              borderRadius: 12,

              opacity:
                isSelected || isAffected
                  ? 1
                  : 0.45,
            },
          };
        })
      );

      setEdges((previousEdges) =>
        previousEdges.map((edge) => {
          const active =
            edge.source === node.id ||
            edge.target === node.id ||
            result.affected_functions.includes(
              edge.target
            ) ||
            result.calls.includes(edge.target);

          return {
            ...edge,

            animated: active,

            style: {
              stroke: active
                ? "#3b82f6"
                : "#475569",

              strokeWidth: active
                ? 3
                : 1.5,

              opacity: active ? 1 : 0.25,
            },
          };
        })
      );
    } catch (error) {
      console.error(
        "Impact analysis failed:",
        error
      );
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">

      <GraphToolbar repository={repository} />

      <div className="flex flex-1 overflow-hidden">

        <RepositoryExplorer
          repository={repository}
        />

        <div className="flex-1">

          <GraphCanvas
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
          />

        </div>

        <ImpactPanel
          selectedFunction={selectedFunction}
          analysis={analysis}
        />

      </div>

      <GraphStats
        repository={repository}
      />

    </div>
  );
}
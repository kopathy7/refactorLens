import { useEffect, useState } from "react";

import {
  type Edge,
  type Node,
} from "@xyflow/react";

import { getGraph } from "../services/graph";
import { getLayoutedElements } from "../utils/graphLayout";

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

export function useGraph(
  repository: string
) {

  const [nodes, setNodes] =
    useState<Node[]>([]);

  const [edges, setEdges] =
    useState<Edge[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!repository) return;

    async function loadGraph() {

      try {

        setLoading(true);

        const graph: GraphResponse =
          await getGraph(repository);

        const flowNodes: Node[] =
          graph.nodes.map((node) => ({

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

              border:
                "1px solid #334155",

              background:
                "#0f172a",

              color: "white",

              borderRadius: 12,

            },

          }));

        const flowEdges: Edge[] =
          graph.edges.map((edge, index) => ({

            id: `edge-${index}`,

            source: edge.source,

            target: edge.target,

            animated: false,

            style: {

              stroke: "#475569",

              strokeWidth: 1.5,

            },

          }));

        const layout =
          getLayoutedElements(
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

      } finally {

        setLoading(false);

      }

    }

    loadGraph();

  }, [repository]);

  return {

    nodes,

    edges,

    setNodes,

    setEdges,

    loading,

  };

}
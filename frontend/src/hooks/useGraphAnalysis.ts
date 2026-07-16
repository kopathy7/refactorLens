import { useState } from "react";

import {
  type Edge,
  type Node,
} from "@xyflow/react";

import { getImpactAnalysis } from "../services/analysis";
import { getSource } from "../services/source";

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

interface SourceResponse {
  file: string;
  line: number;
  end_line: number;
  source: string[];
}

export function useGraphAnalysis(
  repository: string,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) {

  const [
    selectedFunction,
    setSelectedFunction,
  ] = useState("");

  const [
    analysis,
    setAnalysis,
  ] =
    useState<ImpactAnalysis | null>(null);

  const [
    source,
    setSource,
  ] =
    useState<SourceResponse | null>(null);

  async function analyzeNode(
    functionId: string
  ) {

    try {

      const [
        impact,
        sourceResult,
      ] =
        await Promise.all([

          getImpactAnalysis(
            repository,
            functionId
          ),

          getSource(
            repository,
            functionId
          ),

        ]);

      setSelectedFunction(
        functionId
      );

      setAnalysis(
        impact
      );

      setSource(
        sourceResult
      );

      // Highlight Nodes

      setNodes(previousNodes =>

        previousNodes.map(node => {

          const selected =
            node.id === functionId;

          const affected =
            impact.affected_functions.includes(
              node.id
            );

          return {

            ...node,

            style: {

              border: selected
                ? "3px solid #3b82f6"
                : affected
                ? "3px solid #ef4444"
                : "1px solid #334155",

              background: selected
                ? "#1e40af"
                : affected
                ? "#7f1d1d"
                : "#0f172a",

              color: "white",

              borderRadius: 12,

              opacity:
                selected || affected
                  ? 1
                  : 0.45,

            },

          };

        })

      );

      // Highlight Edges

      setEdges(previousEdges =>

        previousEdges.map(edge => {

          const active =

            edge.source === functionId ||

            edge.target === functionId ||

            impact.affected_functions.includes(
              edge.target
            ) ||

            impact.calls.includes(
              edge.target
            );

          return {

            ...edge,

            animated: active,

            style: {

              stroke: active
                ? "#3b82f6"
                : "#475569",

              strokeWidth:
                active ? 3 : 1.5,

              opacity:
                active ? 1 : 0.25,

            },

          };

        })

      );

    }

    catch (error) {

      console.error(error);

    }

  }

  return {

    selectedFunction,

    analysis,

    source,

    analyzeNode,

  };

}
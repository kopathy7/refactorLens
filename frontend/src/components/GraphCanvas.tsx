import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";

import { useEffect } from "react";

import "@xyflow/react/dist/style.css";

import FunctionNode from "./FunctionNode";

const nodeTypes = {
  functionNode: FunctionNode,
};

interface Props {
  nodes: Node[];
  edges: Edge[];
  selectedNode?: string;
  onNodeClick?: NodeMouseHandler;
}

function FocusController({
  nodes,
  selectedNode,
}: {
  nodes: Node[];
  selectedNode?: string;
}) {
  const reactFlow = useReactFlow();

  useEffect(() => {
    if (!selectedNode) return;

    const node = nodes.find(
      (n) => n.id === selectedNode
    );

    if (!node) return;

    reactFlow.setCenter(
      node.position.x,
      node.position.y,
      {
        zoom: 1.6,
        duration: 800,
      }
    );
  }, [
    selectedNode,
    nodes,
    reactFlow,
  ]);

  return null;
}

export default function GraphCanvas({
  nodes,
  edges,
  selectedNode,
  onNodeClick,
}: Props) {
  return (
    <div
      className="w-full h-full bg-slate-950"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 700,
      }}
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick}
      >

        <FocusController
          nodes={nodes}
          selectedNode={selectedNode}
        />

        <Background />

        <MiniMap />

        <Controls />

      </ReactFlow>

    </div>
  );
}
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import FunctionNode from "./FunctionNode";

const nodeTypes = {
  functionNode: FunctionNode,
};

interface Props {
  nodes: Node[];
  edges: Edge[];
  onNodeClick?: NodeMouseHandler;
}

export default function GraphCanvas({
  nodes,
  edges,
  onNodeClick,
}: Props) {
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background gap={20} size={1} />
        <MiniMap
            pannable
            zoomable
            nodeColor="#6366f1"
            bgColor="#0f172a"
            maskColor="rgba(15,23,42,0.5)"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
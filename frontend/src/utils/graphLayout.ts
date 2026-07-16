import dagre from "@dagrejs/dagre";
import { type Edge, type Node } from "@xyflow/react";

const nodeWidth = 220;
const nodeHeight = 70;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
) {
  // Create a NEW graph every time
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 50,
    ranksep: 90,
  });

  for (const node of nodes) {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  }

  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target);
  }

  dagre.layout(dagreGraph);
  for (const edge of edges) {
    console.log(edge.source, "->", edge.target);
  }
  console.log("Graph nodes:", dagreGraph.nodes());
  console.log("Graph edges:", dagreGraph.edges());

  const firstEdge = dagreGraph.edges()[0];

  if (firstEdge) {
    console.log(
      "First edge data:",
      dagreGraph.edge(firstEdge)
    );
  }
  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
} 
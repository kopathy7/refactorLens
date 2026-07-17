import dagre from "@dagrejs/dagre";
import { type Edge, type Node } from "@xyflow/react";

const nodeWidth = 220;
const nodeHeight = 70;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
) {
  try {
    return layoutWithDagre(nodes, edges, direction);
  } catch (error) {
    // dagre can throw on certain graph shapes (e.g. some cyclic /
    // multi-component structures). Rather than crash the whole page,
    // fall back to a simple grid so the graph still renders — log the
    // real error so it can still be diagnosed.
    console.error(
      "dagre layout failed, falling back to grid layout:",
      error
    );
    return gridFallback(nodes, edges);
  }
}

function layoutWithDagre(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR"
) {
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

function gridFallback(nodes: Node[], edges: Edge[]) {
  const columns = Math.ceil(Math.sqrt(nodes.length));
  const xGap = nodeWidth + 60;
  const yGap = nodeHeight + 60;

  const layoutedNodes = nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % columns) * xGap,
      y: Math.floor(index / columns) * yGap,
    },
  }));

  return {
    nodes: layoutedNodes,
    edges,
  };
}
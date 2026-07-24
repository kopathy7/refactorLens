import dagre from "@dagrejs/dagre";
import { type Edge, type Node } from "@xyflow/react";

const nodeWidth = 220;
const nodeHeight = 70;
const componentGap = 120;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
) {
  try {
    return layoutByComponent(nodes, edges, direction);
  } catch (error) {
    // Last-resort safety net — should be unreachable now that each
    // component is laid out separately, but keep it so a crash never
    // takes down the whole page.
    console.error(
      "Graph layout failed, falling back to grid layout:",
      error
    );
    return gridFallback(nodes, edges);
  }
}

/**
 * dagre's default ranker (network-simplex) produces good, properly
 * branching layouts — but it requires a connected graph, which a real
 * call graph almost never is (isolated functions, separate chains).
 *
 * Fix: split into connected components first, lay each one out with
 * dagre's real algorithm (so branches spread out naturally instead of
 * collapsing into a straight line), then tile the components next to
 * each other on the canvas.
 */
function layoutByComponent(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR"
) {
  const components = findConnectedComponents(nodes, edges);

  const layoutedNodes: Node[] = [];
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  const maxRowWidth = Math.max(1600, Math.sqrt(nodes.length) * nodeWidth * 1.5);

  for (const component of components) {
    const { nodes: positioned, width, height } = layoutSingleComponent(
      component.nodes,
      component.edges,
      direction
    );

    // Wrap to a new row once the current row gets too wide, so large
    // graphs don't end up as one extremely long horizontal strip.
    if (cursorX > 0 && cursorX + width > maxRowWidth) {
      cursorX = 0;
      cursorY += rowHeight + componentGap;
      rowHeight = 0;
    }

    for (const node of positioned) {
      layoutedNodes.push({
        ...node,
        position: {
          x: node.position.x + cursorX,
          y: node.position.y + cursorY,
        },
      });
    }

    cursorX += width + componentGap;
    rowHeight = Math.max(rowHeight, height);
  }

  return {
    nodes: layoutedNodes,
    edges,
  };
}

function layoutSingleComponent(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR"
) {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 60,
    ranksep: 100,
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

  let maxX = 0;
  let maxY = 0;

  const positioned = nodes.map((node) => {
    const position = dagreGraph.node(node.id);
    const x = position.x - nodeWidth / 2;
    const y = position.y - nodeHeight / 2;

    maxX = Math.max(maxX, x + nodeWidth);
    maxY = Math.max(maxY, y + nodeHeight);

    return {
      ...node,
      position: { x, y },
    };
  });

  return { nodes: positioned, width: maxX, height: maxY };
}

function findConnectedComponents(nodes: Node[], edges: Edge[]) {
  const adjacency = new Map<string, Set<string>>();

  for (const node of nodes) {
    adjacency.set(node.id, new Set());
  }

  for (const edge of edges) {
    adjacency.get(edge.source)?.add(edge.target);
    adjacency.get(edge.target)?.add(edge.source);
  }

  const visited = new Set<string>();
  const nodesById = new Map(nodes.map((n) => [n.id, n]));
  const components: { nodes: Node[]; edges: Edge[] }[] = [];

  for (const node of nodes) {
    if (visited.has(node.id)) continue;

    const componentIds: string[] = [];
    const stack = [node.id];
    visited.add(node.id);

    while (stack.length) {
      const current = stack.pop()!;
      componentIds.push(current);

      for (const neighbor of adjacency.get(current) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    const idSet = new Set(componentIds);

    components.push({
      nodes: componentIds
        .map((id) => nodesById.get(id))
        .filter((n): n is Node => n !== undefined),
      edges: edges.filter(
        (e) => idSet.has(e.source) && idSet.has(e.target)
      ),
    });
  }

  // Largest, most-connected components first — puts the interesting
  // structure front and center instead of burying it after isolated nodes.
  components.sort((a, b) => b.nodes.length - a.nodes.length);

  return components;
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
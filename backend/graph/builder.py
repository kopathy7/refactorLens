"""
Dependency Graph Builder
"""

import networkx as nx

from models.edge import CallEdge


class DependencyGraphBuilder:

    def build(self, edges: list[CallEdge]):

        graph = nx.DiGraph()

        for edge in edges:

            graph.add_edge(
                edge.caller,
                edge.callee,
            )

        return graph
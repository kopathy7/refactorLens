"""
Dependency Graph Builder
"""

import networkx as nx

from models.node import FunctionNode
from models.edge import CallEdge


class DependencyGraphBuilder:

    def build(
        self,
        functions: list[FunctionNode],
        edges: list[CallEdge],
    ):

        graph = nx.DiGraph()

        # -------------------------
        # Add every discovered function
        # -------------------------

        for function in functions:

            graph.add_node(function.name)

        # -------------------------
        # Add call relationships
        # -------------------------

        for edge in edges:

            graph.add_edge(
                edge.caller,
                edge.callee,
            )

        return graph
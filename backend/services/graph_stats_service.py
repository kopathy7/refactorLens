"""
Graph Statistics Service
"""

from pathlib import Path

from analyzer.dependency_analyzer import DependencyAnalyzer


class GraphStatsService:

    def __init__(self):
        self.analyzer = DependencyAnalyzer()

    def get_stats(self, repository: str):

        analysis = self.analyzer.analyze_repository(
            Path(f"cloned_repositories/{repository}")
        )
        graph = analysis["graph"]

        node_count = len(graph.nodes())
        edge_count = len(graph.edges())

        average_calls = (
            edge_count / node_count
            if node_count
            else 0
        )

        isolated = len(
            [
                node
                for node in graph.nodes()
                if graph.degree(node) == 0
            ]
        )

        return {
            "functions": node_count,
            "dependencies": edge_count,
            "average_calls": round(
                average_calls,
                2
            ),
            "isolated_functions": isolated,
        }
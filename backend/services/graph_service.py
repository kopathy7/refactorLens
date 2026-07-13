"""
Graph Service
"""

from pathlib import Path

from analyzer.dependency_analyzer import DependencyAnalyzer


class GraphService:

    def __init__(self):
        self.analyzer = DependencyAnalyzer()

    def get_graph(self, repository: str):

        graph = self.analyzer.analyze_repository(
            Path(f"cloned_repositories/{repository}")
        )

        nodes = [
            {
                "id": node
            }
            for node in graph.nodes()
        ]

        edges = [
            {
                "source": source,
                "target": target
            }
            for source, target in graph.edges()
        ]

        return {
            "nodes": nodes,
            "edges": edges
        }
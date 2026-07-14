"""
Graph Service
"""

from pathlib import Path

from analyzer.dependency_analyzer import DependencyAnalyzer


class GraphService:

    def __init__(self):
        self.analyzer = DependencyAnalyzer()

    def get_graph(self, repository: str):

        analysis = self.analyzer.analyze_repository(
            Path(f"cloned_repositories/{repository}")
        )

        graph = analysis["graph"]
        functions = analysis["functions"]

        function_lookup = {
            function.name: function
            for function in functions
        }

        nodes = []

        for node in graph.nodes():

            info = function_lookup.get(node)

            if info:

                nodes.append({
                    "id": info.name,
                    "label": info.name,
                    "file": info.file,
                    "line": info.line,
                })

            else:

                nodes.append({
                    "id": node,
                    "label": node,
                    "file": "",
                    "line": 0,
                })

        edges = [
            {
                "source": source,
                "target": target,
            }
            for source, target in graph.edges()
        ]

        return {
            "nodes": nodes,
            "edges": edges,
        }
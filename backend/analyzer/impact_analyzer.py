"""
Impact Analyzer
"""

import networkx as nx


class ImpactAnalyzer:

    def analyze(self, graph: nx.DiGraph, function_name: str):

        if function_name not in graph:

            return {
                "success": False,
                "message": f"Function '{function_name}' not found."
            }

        callers = list(graph.predecessors(function_name))
        callees = list(graph.successors(function_name))

        return {

            "success": True,

            "function": function_name,

            "safe_to_delete": len(callers) == 0,

            "affected_functions": callers,

            "calls": callees,

            "impact_score": len(callers),

            "risk": self.calculate_risk(len(callers))

        }

    def calculate_risk(self, impact_score: int):

        if impact_score == 0:
            return "LOW"

        if impact_score <= 3:
            return "MEDIUM"

        return "HIGH"
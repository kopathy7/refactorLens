"""
Impact Analyzer
"""

import networkx as nx


class ImpactAnalyzer:

    def analyze(
        self,
        graph: nx.DiGraph,
        function_name: str,
    ):

        if function_name not in graph:

            return {
                "success": False,
                "message": f"Function '{function_name}' not found."
            }

        callers = sorted(
            list(graph.predecessors(function_name))
        )

        callees = sorted(
            list(graph.successors(function_name))
        )

        incoming = len(callers)
        outgoing = len(callees)

        impact_score = incoming
        dependency_score = incoming + outgoing

        return {

            "success": True,

            "function": function_name,

            "safe_to_delete": incoming == 0,

            "risk": self.calculate_risk(
                incoming,
                outgoing,
            ),

            "impact_score": impact_score,

            "dependency_score": dependency_score,

            "incoming_calls": incoming,

            "outgoing_calls": outgoing,

            "affected_functions": callers,

            "calls": callees,

        }

    def calculate_risk(
        self,
        incoming: int,
        outgoing: int,
    ):

        total = incoming + outgoing

        if total == 0:
            return "LOW"

        if total <= 5:
            return "MEDIUM"

        return "HIGH"
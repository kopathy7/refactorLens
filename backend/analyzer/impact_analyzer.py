"""
Impact Analyzer
"""

import networkx as nx

from analyzer.risk_analyzer import RiskAnalyzer


class ImpactAnalyzer:

    def __init__(self):
        self.risk_analyzer = RiskAnalyzer()

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

        risk = self.risk_analyzer.score(graph, function_name)

        return {

            "success": True,

            "function": function_name,

            "safe_to_delete": incoming == 0,

            "risk": risk["level"],

            "risk_reasons": risk["reasons"],

            "is_cyclic": risk["is_cyclic"],

            "impact_score": impact_score,

            "dependency_score": dependency_score,

            "incoming_calls": incoming,

            "outgoing_calls": outgoing,

            "affected_functions": callers,

            "calls": callees,

        }
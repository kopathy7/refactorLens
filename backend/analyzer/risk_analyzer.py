"""
Risk Analyzer

Scores how risky it is to modify or delete a function, based on
how connected it is inside the dependency graph.
"""

import networkx as nx


class RiskAnalyzer:

    # Thresholds for total connections (incoming + outgoing calls)
    MEDIUM_THRESHOLD = 3
    HIGH_THRESHOLD = 8

    def score(
        self,
        graph: nx.DiGraph,
        function_name: str,
    ) -> dict:
        """
        Returns a risk breakdown for a single function:
        - level: LOW / MEDIUM / HIGH
        - reasons: short human-readable explanations
        - is_cyclic: whether this function participates in a call cycle
        """

        if function_name not in graph:
            return {
                "level": "UNKNOWN",
                "reasons": ["Function not found in dependency graph."],
                "is_cyclic": False,
            }

        incoming = graph.in_degree(function_name)
        outgoing = graph.out_degree(function_name)
        total = incoming + outgoing

        is_cyclic = self._is_in_cycle(graph, function_name)

        reasons = []

        if incoming == 0:
            reasons.append("No other function calls this — likely safe to delete.")
        elif incoming >= self.HIGH_THRESHOLD:
            reasons.append(f"Called by {incoming} functions — widely depended on.")
        elif incoming > 0:
            reasons.append(f"Called by {incoming} function(s).")

        if outgoing >= self.HIGH_THRESHOLD:
            reasons.append(f"Calls {outgoing} other functions — high fan-out.")

        if is_cyclic:
            reasons.append("Part of a circular dependency chain.")

        level = self._level_for(total, is_cyclic)

        return {
            "level": level,
            "incoming_calls": incoming,
            "outgoing_calls": outgoing,
            "total_connections": total,
            "is_cyclic": is_cyclic,
            "reasons": reasons,
        }

    def _level_for(self, total: int, is_cyclic: bool) -> str:
        if is_cyclic:
            return "HIGH"

        if total == 0:
            return "LOW"

        if total <= self.MEDIUM_THRESHOLD:
            return "LOW"

        if total <= self.HIGH_THRESHOLD:
            return "MEDIUM"

        return "HIGH"

    def _is_in_cycle(self, graph: nx.DiGraph, function_name: str) -> bool:
        for cycle in nx.simple_cycles(graph):
            if function_name in cycle:
                return True
        return False
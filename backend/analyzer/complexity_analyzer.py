"""
Complexity Analyzer
"""

import ast
from pathlib import Path

from parser.visitors.complexity_visitor import ComplexityVisitor


class ComplexityAnalyzer:

    def analyze(
        self,
        file_path: Path,
        line: int,
    ):

        source = file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        target = None

        for node in ast.walk(tree):

            if isinstance(
                node,
                (
                    ast.FunctionDef,
                    ast.AsyncFunctionDef,
                ),
            ):

                if node.lineno == line:

                    target = node

                    break

        if target is None:

            return None

        visitor = ComplexityVisitor()

        visitor.visit(target)

        loc = (
            target.end_lineno
            - target.lineno
            + 1
        )

        return {

            "complexity": visitor.complexity,

            "branches": visitor.branches,

            "returns": visitor.returns,

            "parameters": len(
                target.args.args
            ),

            "loc": loc,

        }
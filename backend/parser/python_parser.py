"""
Python AST Parser
"""

import ast
from pathlib import Path

from parser.visitors.function_visitor import FunctionVisitor
from parser.visitors.call_visitor import CallVisitor


class PythonParser:

    def parse_functions(
        self,
        file_path: Path,
    ):

        source = file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = FunctionVisitor(file_path)

        visitor.visit(tree)

        return visitor.functions

    def parse_calls(
        self,
        file_path: Path,
        project_functions: set[str],
    ):

        source = file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = CallVisitor(
            project_functions
        )

        visitor.visit(tree)

        return visitor.edges
"""
Call Visitor
"""

import ast
from pathlib import Path

from models.edge import CallEdge


class CallVisitor(ast.NodeVisitor):

    def __init__(
        self,
        project_functions: set[str],
        file_path: Path,
    ):

        self.project_functions = project_functions

        self.current_file = str(file_path)

        self.edges: list[CallEdge] = []

        self.current_function = ""

        self.class_stack: list[str] = []

    def visit_ClassDef(self, node: ast.ClassDef):

        self.class_stack.append(node.name)

        self.generic_visit(node)

        self.class_stack.pop()

    def visit_FunctionDef(self, node: ast.FunctionDef):

        if self.class_stack:

            self.current_function = (
                f"{self.class_stack[-1]}.{node.name}"
            )

        else:

            self.current_function = node.name

        self.generic_visit(node)

    def visit_AsyncFunctionDef(
        self,
        node: ast.AsyncFunctionDef,
    ):

        self.visit_FunctionDef(node)

    def visit_Call(self, node: ast.Call):

        callee = None

        if isinstance(node.func, ast.Name):

            callee = node.func.id

        elif isinstance(node.func, ast.Attribute):

            callee = node.func.attr

        if (
            callee
            and callee in self.project_functions
        ):

            self.edges.append(
                CallEdge(
                    caller=self.current_function,
                    callee=callee,
                    file=self.current_file,
                    line=node.lineno,
                )
            )

        self.generic_visit(node)
"""
Function Visitor
"""

import ast
from pathlib import Path

from models.node import FunctionNode


class FunctionVisitor(ast.NodeVisitor):

    def __init__(self, file_path: Path):

        self.file_path = file_path

        self.functions: list[FunctionNode] = []

        self.class_stack: list[str] = []

    def visit_ClassDef(self, node: ast.ClassDef):

        self.class_stack.append(node.name)

        self.generic_visit(node)

        self.class_stack.pop()

    def visit_FunctionDef(self, node: ast.FunctionDef):

        class_name = (
            self.class_stack[-1]
            if self.class_stack
            else None
        )

        full_name = (
            f"{class_name}.{node.name}"
            if class_name
            else node.name
        )

        self.functions.append(

            FunctionNode(
                id=full_name,
                name=full_name,
                file=str(self.file_path),
                module="",
                line=node.lineno,
                class_name=class_name,
                is_async=False,
                is_method=class_name is not None,
            )

        )

        self.generic_visit(node)

    def visit_AsyncFunctionDef(
        self,
        node: ast.AsyncFunctionDef,
    ):

        class_name = (
            self.class_stack[-1]
            if self.class_stack
            else None
        )

        full_name = (
            f"{class_name}.{node.name}"
            if class_name
            else node.name
        )

        self.functions.append(

            FunctionNode(
                id=full_name,
                name=full_name,
                file=str(self.file_path),
                module="",
                line=node.lineno,
                class_name=class_name,
                is_async=True,
                is_method=class_name is not None,
            )

        )

        self.generic_visit(node)
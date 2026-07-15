"""
Python AST Parser
"""

import ast
from pathlib import Path

from models.edge import CallEdge
from parser.visitors.function_visitor import FunctionVisitor


class PythonParser:

    def parse_functions(
        self,
        file_path: Path,
    ):

        with open(
            file_path,
            "r",
            encoding="utf-8",
        ) as file:

            source = file.read()

        tree = ast.parse(source)

        visitor = FunctionVisitor(file_path)

        visitor.visit(tree)

        return visitor.functions

    def parse_calls(
        self,
        file_path: Path,
        project_functions: set[str],
    ):

        with open(
            file_path,
            "r",
            encoding="utf-8",
        ) as file:

            source = file.read()

        tree = ast.parse(source)

        edges = []

        for node in ast.walk(tree):

            if isinstance(
                node,
                (
                    ast.FunctionDef,
                    ast.AsyncFunctionDef,
                ),
            ):

                caller = node.name

                for child in ast.walk(node):

                    if not isinstance(
                        child,
                        ast.Call,
                    ):
                        continue

                    callee = None

                    # foo()
                    if isinstance(
                        child.func,
                        ast.Name,
                    ):

                        callee = child.func.id

                    # self.foo()
                    # cls.foo()
                    # obj.foo()
                    # module.foo()
                    elif isinstance(
                        child.func,
                        ast.Attribute,
                    ):

                        callee = child.func.attr

                    if (
                        callee
                        and callee in project_functions
                    ):

                        edges.append(
                            CallEdge(
                                caller=caller,
                                callee=callee,
                            )
                        )

        return edges
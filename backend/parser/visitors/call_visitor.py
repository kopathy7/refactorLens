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

        # Function names are stored qualified as "ClassName.method" for
        # methods, but a call site like `self.method()` only gives us the
        # bare attribute name "method" — there's no qualification to match
        # against directly. Build an index from bare name -> qualified
        # name(s) so we can resolve those calls.
        self._bare_name_index: dict[str, list[str]] = {}

        for qualified_name in project_functions:

            bare_name = qualified_name.rsplit(".", 1)[-1]

            self._bare_name_index.setdefault(
                bare_name, []
            ).append(qualified_name)

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

        callee = self._resolve_callee(node.func)

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

    def _resolve_callee(self, func: ast.expr) -> str | None:
        """
        Resolve a call target to a qualified project function name,
        or None if it isn't one we recognize.
        """

        if isinstance(func, ast.Name):

            # Plain call like foo() — matches an unqualified top-level
            # function directly.
            return func.id

        if not isinstance(func, ast.Attribute):
            return None

        attr = func.attr

        # self.method() / cls.method() inside a class body — qualify
        # using the enclosing class so it matches "ClassName.method".
        if (
            isinstance(func.value, ast.Name)
            and func.value.id in ("self", "cls")
            and self.class_stack
        ):

            qualified = f"{self.class_stack[-1]}.{attr}"

            if qualified in self.project_functions:
                return qualified

        # Fallback for other attribute calls (e.g. some_object.method()):
        # without type inference we can't know what class `some_object`
        # is, so only resolve when the bare method name is unique across
        # the whole project. An ambiguous name is skipped rather than
        # risk wiring an edge to the wrong function.
        candidates = self._bare_name_index.get(attr, [])

        if len(candidates) == 1:
            return candidates[0]

        return None
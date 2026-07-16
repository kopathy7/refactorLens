"""
Complexity Visitor
"""

import ast


class ComplexityVisitor(ast.NodeVisitor):

    def __init__(self):

        self.complexity = 1

        self.branches = 0

        self.returns = 0

    # ---------- Branches ----------

    def visit_If(self, node):

        self.complexity += 1
        self.branches += 1

        self.generic_visit(node)

    def visit_For(self, node):

        self.complexity += 1
        self.branches += 1

        self.generic_visit(node)

    def visit_While(self, node):

        self.complexity += 1
        self.branches += 1

        self.generic_visit(node)

    def visit_Try(self, node):

        self.complexity += len(node.handlers)

        self.branches += len(node.handlers)

        self.generic_visit(node)

    def visit_With(self, node):

        self.generic_visit(node)

    def visit_Match(self, node):

        self.complexity += len(node.cases)

        self.branches += len(node.cases)

        self.generic_visit(node)

    # ---------- Boolean Expressions ----------

    def visit_BoolOp(self, node):

        self.complexity += len(node.values) - 1

        self.generic_visit(node)

    # ---------- Return ----------

    def visit_Return(self, node):

        self.returns += 1

        self.generic_visit(node)
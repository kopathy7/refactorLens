"""
Python AST Parser
"""

import ast
from pathlib import Path

from models.node import FunctionNode
from models.edge import CallEdge

class PythonParser:

    def parse_functions(self, file_path: Path):

        with open(file_path, "r", encoding="utf-8") as file:
            source = file.read()

        tree = ast.parse(source)

        functions = []

        for node in ast.walk(tree):

            if isinstance(node, ast.FunctionDef):

                functions.append(
                    FunctionNode(
                        name=node.name,
                        file=str(file_path),
                        line=node.lineno,
                    )
                )

        return functions
    
    def parse_calls(self, file_path: Path):

        with open(file_path, "r", encoding="utf-8") as file:
            source = file.read()

        tree = ast.parse(source)

        # ---------- PASS 1 ----------
        project_functions = set()

        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                project_functions.add(node.name)

        # ---------- PASS 2 ----------
        edges = []

        for node in ast.walk(tree):

            if isinstance(node, ast.FunctionDef):

                caller = node.name

                for child in ast.walk(node):

                    if isinstance(child, ast.Call):

                        if isinstance(child.func, ast.Name):

                            callee = child.func.id

                            if callee in project_functions:

                                edges.append(
                                    CallEdge(
                                        caller=caller,
                                        callee=callee,
                                    )
                                )

        return edges
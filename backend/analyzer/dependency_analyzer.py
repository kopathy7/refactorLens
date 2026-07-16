"""
Repository Dependency Analyzer
"""

from pathlib import Path

from graph.builder import DependencyGraphBuilder
from parser.python_parser import PythonParser


class DependencyAnalyzer:

    IGNORE_DIRS = {
        "tests",
        "test",
        "__pycache__",
        ".git",
        "venv",
        ".venv",
        ".pytest_cache",
        "node_modules",
        "migrations",
    }

    def __init__(self):

        self.parser = PythonParser()

        self.builder = DependencyGraphBuilder()

    def analyze_repository(
        self,
        repository_path: Path,
    ):

        python_files = []

        functions = []

        # -------------------------
        # Pass 1
        # Collect every Python file
        # Collect every function
        # -------------------------

        for file in repository_path.rglob("*.py"):

            if any(
                part in self.IGNORE_DIRS
                for part in file.parts
            ):
                continue

            python_files.append(file)

            try:

                functions.extend(
                    self.parser.parse_functions(file)
                )
                parsed = self.parser.parse_functions(file)

                print(file.name, len(parsed))

                functions.extend(parsed)

            except Exception as error:

                print(
                    f"⚠ Failed parsing functions in {file}: {error}"
                )

        project_functions = {
            function.name
            for function in functions
        }

        # -------------------------
        # Pass 2
        # Collect call edges
        # -------------------------

        all_edges = []

        for file in python_files:

            try:

                all_edges.extend(

                    self.parser.parse_calls(
                        file,
                        project_functions,
                    )

                )

            except Exception as error:

                print(
                    f"⚠ Failed parsing calls in {file}: {error}"
                )

        graph = self.builder.build(
            functions,
            all_edges,
        )

        return {
            "graph": graph,
            "functions": functions,
        }
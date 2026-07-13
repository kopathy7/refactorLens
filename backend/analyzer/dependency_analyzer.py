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

    def analyze_repository(self, repository_path: Path):

        all_edges = []

        for file in repository_path.rglob("*.py"):

            # Skip ignored directories
            if any(part in self.IGNORE_DIRS for part in file.parts):
                continue

            try:
                edges = self.parser.parse_calls(file)
                all_edges.extend(edges)

            except Exception as error:
                print(f"⚠ Failed to parse {file}: {error}")

        graph = self.builder.build(all_edges)

        return graph
"""
Source Service
"""

import ast
from pathlib import Path


class SourceService:

    def get_source(
        self,
        repository: str,
        function: str,
    ):

        repository_path = Path(
            f"cloned_repositories/{repository}"
        )

        for file in repository_path.rglob("*.py"):

            try:

                source = file.read_text(
                    encoding="utf-8",
                    errors="ignore",
                )

                tree = ast.parse(source)

                lines = source.splitlines()

                for node in ast.walk(tree):

                    if isinstance(
                        node,
                        (
                            ast.FunctionDef,
                            ast.AsyncFunctionDef,
                        ),
                    ):

                        if node.name == function:

                            start = node.lineno

                            end = node.end_lineno

                            return {

                                "file": str(
                                    file.relative_to(
                                        repository_path
                                    )
                                ),

                                "line": start,

                                "end_line": end,

                                "source": lines[
                                    start - 1 : end
                                ],
                            }

            except Exception:

                pass

        return None
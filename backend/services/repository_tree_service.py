"""
Repository Tree Service
"""

from pathlib import Path

IGNORE_DIRS = {
    ".git",
    "__pycache__",
    "venv",
    ".venv",
    "node_modules",
}


class RepositoryTreeService:

    def build_tree(self, path: Path):

        if path.is_file():
            return {
                "name": path.name,
                "type": "file"
            }

        children = []

        for child in sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):

            if child.name in IGNORE_DIRS:
                continue

            children.append(
                self.build_tree(child)
            )

        return {
            "name": path.name,
            "type": "directory",
            "children": children
        }
"""
Source Code Service
"""

from pathlib import Path


class SourceService:

    def get_source(
        self,
        repository: str,
        file: str,
    ):

        path = Path(
            f"cloned_repositories/{repository}/{file}"
        )

        return {
            "file": file,
            "content": path.read_text(
                encoding="utf-8",
                errors="ignore",
            ),
        }
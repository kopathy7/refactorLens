"""
Git repository management.
"""

from pathlib import Path
from utils.git_utils import is_valid_github_url
from git import GitCommandError, Repo


class GitRepository:
    """Handles Git repository operations."""

    def __init__(self):
        self.clone_directory = Path("cloned_repositories")
        self.clone_directory.mkdir(exist_ok=True)

    def clone_repository(self, repository_url: str):
        if not is_valid_github_url(repository_url):
            return {
                "success": False,
                "message": "Invalid GitHub repository URL."
            }

        project_name = repository_url.rstrip("/").split("/")[-1]

        destination = self.clone_directory / project_name

        if destination.exists():
            return {
                "success": False,
                "message": "Repository already exists.",
                "path": str(destination)
            }

        try:
            Repo.clone_from(repository_url, destination)

            return {
                "success": True,
                "message": "Repository cloned successfully.",
                "path": str(destination)
            }

        except GitCommandError as error:

            return {
                "success": False,
                "message": str(error)
            }
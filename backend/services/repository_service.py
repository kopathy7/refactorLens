"""
Business logic for repository operations.
"""

from repository.git_repository import GitRepository


class RepositoryService:
    """Service layer for repository management."""

    def __init__(self):
        self.repository = GitRepository()

    def clone_repository(self, repository_url: str):
        return self.repository.clone_repository(repository_url)
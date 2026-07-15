"""
Repository Cache
"""


class RepositoryCache:

    def __init__(self):

        self.repositories = {}

    def put(
        self,
        repository,
        analysis,
    ):

        self.repositories[repository] = analysis

    def get(
        self,
        repository,
    ):

        return self.repositories.get(repository)

    def contains(
        self,
        repository,
    ):

        return repository in self.repositories

    def clear(self):

        self.repositories.clear()
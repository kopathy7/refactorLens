from pathlib import Path

from fastapi import APIRouter

from services.repository_tree_service import RepositoryTreeService

router = APIRouter(
    prefix="/repository",
    tags=["Repository"]
)

service = RepositoryTreeService()


@router.get("/tree")
def get_tree(repository: str):

    return service.build_tree(
        Path(f"cloned_repositories/{repository}")
    )
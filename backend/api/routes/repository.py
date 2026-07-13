"""
Repository API routes.
"""

from fastapi import APIRouter

from schemas.repository import RepositoryRequest
from services.repository_service import RepositoryService

router = APIRouter(
    prefix="/repository",
    tags=["Repository"]
)

service = RepositoryService()


@router.post("/clone")
def clone_repository(request: RepositoryRequest):

    return service.clone_repository(
        str(request.repository_url)
    )
from fastapi import APIRouter

from services.source_service import SourceService

router = APIRouter(
    prefix="/source",
    tags=["Source"],
)

service = SourceService()


@router.get("/")
def source(
    repository: str,
    file: str,
):

    return service.get_source(
        repository,
        file,
    )
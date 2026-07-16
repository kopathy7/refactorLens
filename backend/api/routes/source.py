from fastapi import APIRouter

from services.source_service import SourceService

router = APIRouter(
    prefix="/source",
    tags=["Source"],
)

service = SourceService()


@router.get("/")
def get_source(
    repository: str,
    function: str,
):

    return service.get_source(
        repository,
        function,
    )
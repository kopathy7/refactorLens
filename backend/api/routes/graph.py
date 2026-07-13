from fastapi import APIRouter

from services.graph_service import GraphService

router = APIRouter(
    prefix="/graph",
    tags=["Graph"]
)

service = GraphService()


@router.get("/")
def get_graph(repository: str):

    return service.get_graph(repository)
from fastapi import APIRouter

from services.graph_stats_service import GraphStatsService

router = APIRouter(
    prefix="/graph",
    tags=["Graph"],
)

service = GraphStatsService()


@router.get("/stats")
def graph_stats(repository: str):

    return service.get_stats(repository)
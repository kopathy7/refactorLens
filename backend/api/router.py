"""
Main API router.
"""

from fastapi import APIRouter

from api.routes import health
from api.routes import repository
from api.routes import analysis
from api.routes import graph
router = APIRouter()

router.include_router(health.router)
router.include_router(repository.router)
router.include_router(analysis.router)
router.include_router(graph.router)
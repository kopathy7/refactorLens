"""
Main API router.
"""

from fastapi import APIRouter

from api.routes import health
from api.routes import repository

router = APIRouter()

router.include_router(health.router)
router.include_router(repository.router)
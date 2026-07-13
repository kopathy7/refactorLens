"""
RefactorLens Backend API.
"""

from fastapi import FastAPI

from api.router import router

app = FastAPI(
    title="RefactorLens API",
    version="0.1.0",
    description="Static Analysis Platform for Safe Refactoring"
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "🚀 Welcome to RefactorLens API"
    }
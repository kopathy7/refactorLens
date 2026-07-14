"""
RefactorLens Backend API.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import router

app = FastAPI(
    title="RefactorLens API",
    version="0.1.0",
    description="Static Analysis Platform for Safe Refactoring"
)

# ------------------ CORS ------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "🚀 Welcome to RefactorLens API"
    }
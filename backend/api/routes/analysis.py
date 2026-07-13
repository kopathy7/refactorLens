from fastapi import APIRouter
from pathlib import Path

from analyzer.dependency_analyzer import DependencyAnalyzer
from analyzer.impact_analyzer import ImpactAnalyzer

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

dependency = DependencyAnalyzer()
impact = ImpactAnalyzer()


@router.get("/impact")
def analyze(repository: str, function: str):

    graph = dependency.analyze_repository(
        Path(f"cloned_repositories/{repository}")
    )

    return impact.analyze(graph, function)
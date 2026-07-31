# RefactorLens

**Static call-graph analysis for Python codebases — see what a function actually touches before you change it.**

RefactorLens clones a Python repository, parses it with the AST (no code execution), builds a function-level call graph with NetworkX, and renders it as an interactive dependency graph in the browser. Click any function to see what calls it, what it calls, whether it's safe to delete, and a risk score for changing it — including detection of circular dependencies.

## Why

In an unfamiliar codebase, "is it safe to delete/rename/change this function?" usually means grepping for usages across dozens of files and hoping you didn't miss an indirect call. RefactorLens answers that question in one click by statically analyzing the whole call graph up front.

## Features

- **Repository cloning** — analyze any public GitHub repo by URL
- **AST-based Python parsing** — functions, methods, async functions, and their call relationships, extracted without executing any code
- **Interactive call graph** — React Flow + dagre, with pan/zoom tuned for large, sparse graphs
- **Impact analysis** — click a function to see incoming callers, outgoing calls, and everything downstream that would be affected by a change
- **Risk scoring** — LOW / MEDIUM / HIGH, based on connectivity and circular-dependency detection (`networkx.simple_cycles`)
- **Safe-delete detection** — flags functions with zero callers
- **Source viewer** — inspect a function's source without leaving the graph
- **Search** — jump to and highlight any function by name

## Architecture

```
GitHub URL → clone → AST parse → extract functions & calls
           → build NetworkX call graph → FastAPI endpoints
           → React Flow graph + impact/risk panels
```

**Backend:** Python, FastAPI, `ast`, NetworkX, GitPython
**Frontend:** React, TypeScript, React Flow, dagre, TailwindCSS

## Running locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`, paste a GitHub repo URL (e.g. `https://github.com/pallets/flask`), and explore.

## Known limitations

- Python only — no multi-language support yet
- Call resolution for method calls on arbitrary objects (not `self`/`cls`) falls back to matching by unique function name across the project when unambiguous; genuinely ambiguous calls (same method name on multiple unrelated classes) are conservatively skipped rather than risking a wrong edge
- Graph nodes are keyed by qualified name (`ClassName.method`), not by file — two identically-named classes in different files would still collide (a fix I'm actively working through)
- No automated test suite yet

## Roadmap

- Circular dependency and dead-code highlighting in the UI (detection already exists in the risk engine, just needs surfacing)
- Cyclomatic complexity badges per function
- Multi-language support (JS/TS, Java)
- LLM-assisted "explain this function" summaries
- Test coverage for the analyzer/graph layer

## What I'd tell you if you asked

This started as a project to genuinely understand how tools like dependency-cruiser or code-graph visualizers work under the hood — parsing source into an AST, turning that into a graph, and making the graph answer a real question ("what breaks if I touch this?") instead of just being a pretty picture. Building it surfaced real bugs worth learning from: call resolution silently dropping every `self.method()` call because of a name-qualification mismatch, and a layout algorithm that assumed the graph was fully connected when real call graphs almost never are.

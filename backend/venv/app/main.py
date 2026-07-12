from fastapi import FastAPI

app = FastAPI(
    title="RefactorLens API",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "message": "🚀 RefactorLens Backend Running"
    }
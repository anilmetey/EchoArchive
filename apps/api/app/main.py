from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.routers import archive, auth, capsules

app = FastAPI(title="EchoArchive API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin, "http://localhost:3000", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(capsules.router)
app.include_router(archive.router)
app.include_router(auth.router)
app.mount("/uploads", StaticFiles(directory="apps/api/storage/uploads", check_dir=False), name="uploads")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

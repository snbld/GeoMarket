import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from src.database import engine, Base
from src.api.routers import auth, datasets, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        # PostGIS may not be available on Railway's managed Postgres — skip if it fails
        try:
            await conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
        except Exception:
            pass
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI(
    title="GeoMarket API",
    description="Geological Exploration Data Marketplace + AI Targeting",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(datasets.router)

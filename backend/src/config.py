import os

from pydantic_settings import BaseSettings


def _build_async_db_url() -> str:
    """Build asyncpg URL from Railway's DATABASE_URL or fallback to default."""
    url = os.getenv("DATABASE_URL", "")
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    return "postgresql+asyncpg://geomarket:geomarket_dev@localhost:5432/geomarket"


def _build_sync_db_url() -> str:
    url = os.getenv("DATABASE_URL", "")
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://"):
        return url
    return "postgresql://geomarket:geomarket_dev@localhost:5432/geomarket"


class Settings(BaseSettings):
    DATABASE_URL: str = _build_async_db_url()
    DATABASE_URL_SYNC: str = _build_sync_db_url()
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin123"
    S3_BUCKET_DATASETS: str = "geomarket-datasets"
    S3_BUCKET_RESULTS: str = "geomarket-results"
    S3_BUCKET_THUMBNAILS: str = "geomarket-thumbnails"

    JWT_SECRET: str = "dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60

    STRIPE_SECRET_KEY: str = "sk_test_placeholder"
    STRIPE_WEBHOOK_SECRET: str = "whsec_placeholder"
    PLATFORM_FEE_PERCENT: float = 0.15

    model_config = {"env_file": ".env"}


settings = Settings()

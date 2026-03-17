from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://geomarket:geomarket_dev@localhost:5432/geomarket"
    DATABASE_URL_SYNC: str = "postgresql://geomarket:geomarket_dev@localhost:5432/geomarket"
    REDIS_URL: str = "redis://localhost:6379/0"

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

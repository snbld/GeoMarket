# GeoMarket — Geological Data Marketplace + AI Targeting

## Quick Start
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- MinIO Console: http://localhost:9001 (minioadmin / minioadmin123)

## Tech Stack
- **Frontend**: Next.js 16 (App Router) + shadcn/ui + Tailwind + MapLibre GL
- **Backend**: FastAPI + SQLAlchemy (async) + PostgreSQL 16 + PostGIS
- **Jobs**: Celery + Redis
- **Storage**: MinIO (S3-compatible, local dev)
- **Auth**: JWT (python-jose + passlib/bcrypt)

## Project Structure
- `backend/src/models/` — SQLAlchemy models (User, Dataset, Transaction, Review, AIJob, DrillTarget)
- `backend/src/api/routers/` — FastAPI route modules
- `backend/src/services/` — Auth (JWT), Storage (S3 presigned URLs)
- `backend/src/tasks/` — Celery async tasks (ingest, targeting)
- `frontend/src/app/` — Next.js pages (marketplace, sell, targeting, dashboard, auth)
- `frontend/src/components/` — UI components (layout, map, datasets, targeting)
- `frontend/src/lib/` — API client, auth context, types
- `ai/` — Standalone AI module (Phase 5+)

## Key Conventions
- All database queries use async SQLAlchemy (asyncpg driver)
- PostGIS geometry columns for spatial queries (SRID 4326)
- Presigned S3 URLs for file upload/download (no file data through API)
- Celery tasks for heavy processing (metadata extraction, AI targeting)
- JWT auth with OAuth2PasswordBearer flow

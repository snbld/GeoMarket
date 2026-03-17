import uuid
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from geoalchemy2.functions import ST_MakeEnvelope, ST_Intersects

from src.database import get_db
from src.models.user import User
from src.models.dataset import Dataset
from src.services.auth import get_current_user
from src.services.storage import generate_presigned_upload_url
from src.config import settings

router = APIRouter(prefix="/api/datasets", tags=["datasets"])


class DatasetCreate(BaseModel):
    title: str
    description: str
    data_type: str
    file_format: str
    price: float


class PresignedUploadResponse(BaseModel):
    dataset_id: UUID
    upload_url: str
    s3_key: str


class DatasetResponse(BaseModel):
    id: UUID
    seller_id: UUID
    title: str
    description: str
    data_type: str
    file_format: str
    price: float
    status: str
    avg_rating: float | None
    review_count: int
    download_count: int
    crs: str | None
    metadata_json: dict | None
    created_at: str

    model_config = {"from_attributes": True}


@router.post("/", response_model=PresignedUploadResponse, status_code=201)
async def create_dataset(
    req: DatasetCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    s3_key = f"datasets/{user.id}/{uuid.uuid4()}/{req.title}"
    dataset = Dataset(
        seller_id=user.id,
        title=req.title,
        description=req.description,
        data_type=req.data_type,
        file_format=req.file_format,
        price=req.price,
        s3_key=s3_key,
        status="pending",
    )
    db.add(dataset)
    await db.commit()
    await db.refresh(dataset)

    upload_url = generate_presigned_upload_url(settings.S3_BUCKET_DATASETS, s3_key)

    return PresignedUploadResponse(
        dataset_id=dataset.id,
        upload_url=upload_url,
        s3_key=s3_key,
    )


@router.get("/", response_model=list[DatasetResponse])
async def list_datasets(
    data_type: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    bbox: str | None = Query(None, description="minlon,minlat,maxlon,maxlat"),
    limit: int = Query(50, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    query = select(Dataset).where(Dataset.status == "approved")

    if data_type:
        query = query.where(Dataset.data_type == data_type)
    if min_price is not None:
        query = query.where(Dataset.price >= min_price)
    if max_price is not None:
        query = query.where(Dataset.price <= max_price)
    if bbox:
        parts = [float(x) for x in bbox.split(",")]
        if len(parts) == 4:
            envelope = ST_MakeEnvelope(parts[0], parts[1], parts[2], parts[3], 4326)
            query = query.where(ST_Intersects(Dataset.coverage_area, envelope))

    query = query.order_by(Dataset.created_at.desc()).limit(limit).offset(offset)
    result = await db.execute(query)
    datasets = result.scalars().all()
    return [DatasetResponse(
        id=d.id, seller_id=d.seller_id, title=d.title, description=d.description,
        data_type=d.data_type, file_format=d.file_format, price=d.price, status=d.status,
        avg_rating=d.avg_rating, review_count=d.review_count, download_count=d.download_count,
        crs=d.crs, metadata_json=d.metadata_json,
        created_at=d.created_at.isoformat() if d.created_at else "",
    ) for d in datasets]


@router.get("/{dataset_id}", response_model=DatasetResponse)
async def get_dataset(dataset_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return DatasetResponse(
        id=dataset.id, seller_id=dataset.seller_id, title=dataset.title,
        description=dataset.description, data_type=dataset.data_type,
        file_format=dataset.file_format, price=dataset.price, status=dataset.status,
        avg_rating=dataset.avg_rating, review_count=dataset.review_count,
        download_count=dataset.download_count, crs=dataset.crs,
        metadata_json=dataset.metadata_json,
        created_at=dataset.created_at.isoformat() if dataset.created_at else "",
    )

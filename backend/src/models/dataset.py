import uuid
from datetime import datetime

from geoalchemy2 import Geometry
from sqlalchemy import String, Float, DateTime, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    data_type: Mapped[str] = mapped_column(String(100), nullable=False)  # magnetics, gravity, em, geochemistry, drillhole, seismic
    file_format: Mapped[str] = mapped_column(String(50), nullable=False)  # geotiff, segy, xyz, gdb, csv
    price: Mapped[float] = mapped_column(Float, nullable=False)
    s3_key: Mapped[str] = mapped_column(String(1000), nullable=False)
    file_size_bytes: Mapped[int | None] = mapped_column()
    thumbnail_key: Mapped[str | None] = mapped_column(String(1000))
    coverage_area = mapped_column(Geometry("POLYGON", srid=4326), nullable=True)
    crs: Mapped[str | None] = mapped_column(String(50))
    metadata_json = mapped_column(JSONB, default=dict)
    status: Mapped[str] = mapped_column(String(50), default="pending")  # pending, approved, rejected
    avg_rating: Mapped[float | None] = mapped_column(Float)
    review_count: Mapped[int] = mapped_column(default=0)
    download_count: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    seller = relationship("User", back_populates="datasets")
    transactions = relationship("Transaction", back_populates="dataset")
    reviews = relationship("Review", back_populates="dataset")

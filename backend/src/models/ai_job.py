import uuid
from datetime import datetime

from sqlalchemy import String, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class AIJob(Base):
    __tablename__ = "ai_jobs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    deposit_type: Mapped[str] = mapped_column(String(100), nullable=False)  # vms, porphyry_cu, orogenic_au, ni_cu_magmatic
    dataset_ids = mapped_column(ARRAY(UUID(as_uuid=True)), default=list)
    upload_s3_keys = mapped_column(ARRAY(String), default=list)
    area_km2: Mapped[float | None] = mapped_column(Float)
    n_layers: Mapped[int | None] = mapped_column()
    price: Mapped[float] = mapped_column(Float, nullable=False)
    stripe_payment_intent_id: Mapped[str | None] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50), default="pending")  # pending, paid, processing, completed, failed
    result_s3_key: Mapped[str | None] = mapped_column(String(1000))
    result_summary = mapped_column(JSONB, default=dict)
    error_message: Mapped[str | None] = mapped_column(String(2000))
    celery_task_id: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user = relationship("User", back_populates="ai_jobs")
    targets = relationship("DrillTarget", back_populates="ai_job")

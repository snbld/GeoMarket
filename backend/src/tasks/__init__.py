from celery import Celery

from src.config import settings

celery_app = Celery("geomarket", broker=settings.REDIS_URL, backend=settings.REDIS_URL)
celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    task_track_started=True,
)

# Import task modules so they register with celery
celery_app.autodiscover_tasks(["src.tasks"])

from src.tasks import celery_app


@celery_app.task(name="tasks.run_targeting", bind=True)
def run_targeting(self, job_id: str):
    """Run AI targeting pipeline. Placeholder — will be implemented in Phase 5."""
    return {"job_id": job_id, "status": "completed"}

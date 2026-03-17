from src.tasks import celery_app


@celery_app.task(name="tasks.extract_metadata")
def extract_metadata(dataset_id: str, s3_key: str):
    """Extract metadata from uploaded dataset file (bounds, CRS, thumbnail).
    Placeholder — will be implemented in Phase 2 with rasterio/segyio.
    """
    return {"dataset_id": dataset_id, "status": "metadata_extracted"}

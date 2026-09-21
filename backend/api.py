import os
from typing import Any

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from common import ConfigError, db_get, queue_job

app = FastAPI(
    title="Consonance Engine API",
    version="0.1.0",
    description="Backend gateway for Rowan, WHO WE ARE, and Observatory processing.",
)

API_KEY = os.environ.get("CONSONANCE_API_KEY", "")


class JobRequest(BaseModel):
    job_type: str = Field(min_length=1, max_length=80)
    payload: dict[str, Any] = Field(default_factory=dict)


def require_key(x_consonance_key: str | None) -> None:
    if not API_KEY:
        raise HTTPException(status_code=503, detail="API key is not configured.")
    if x_consonance_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key.")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "consonance-api", "version": "0.1.0"}


@app.post("/jobs")
def create_job(
    request: JobRequest,
    x_consonance_key: str | None = Header(default=None),
) -> dict[str, Any]:
    require_key(x_consonance_key)
    try:
        job = queue_job(request.job_type, request.payload)
    except ConfigError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return {"accepted": True, "job": job}


@app.get("/jobs/{job_id}")
def get_job(
    job_id: str,
    x_consonance_key: str | None = Header(default=None),
) -> dict[str, Any]:
    require_key(x_consonance_key)
    rows = db_get("consonance_jobs", f"id=eq.{job_id}&select=*")
    if not rows:
        raise HTTPException(status_code=404, detail="Job not found.")
    return rows[0]

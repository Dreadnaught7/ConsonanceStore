import os
from typing import Any

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from common import ConfigError, db_get, queue_job
from extractor import extract_claims, review_claim
from worker import ingest_source

app = FastAPI(
    title="Consonance Engine API",
    version="0.6.0",
    description="Backend gateway for Rowan, WHO WE ARE, and Observatory processing.",
)

API_KEY = os.environ.get("CONSONANCE_API_KEY", "")


class JobRequest(BaseModel):
    job_type: str = Field(min_length=1, max_length=80)
    payload: dict[str, Any] = Field(default_factory=dict)


class IngestRequest(BaseModel):
    url: str
    source_type: str = "web"
    title: str | None = None
    citation: str | None = None
    repository: str | None = None
    record_identifier: str | None = None
    source_date: str | None = None
    requested_by: str | None = None
    authentication_state: str = "origin_unknown"
    visibility: str = "internal"
    tags: list[str] = Field(default_factory=list)

    investigation_id: str | None = None
    thread_slug: str | None = None
    investigation_title: str | None = None
    investigation_role: str = "supporting"


class ExtractClaimsRequest(BaseModel):
    evidence_source_id: str


class ReviewClaimRequest(BaseModel):
    review_state: str
    reviewed_by: str = "Consonance Human Review"
    review_notes: str | None = None


def require_key(x_consonance_key: str | None) -> None:
    if not API_KEY:
        raise HTTPException(status_code=503, detail="API key is not configured.")
    if x_consonance_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key.")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "consonance-api", "version": "0.6.0"}


@app.post("/ingest")
def ingest(
    request: IngestRequest,
    x_consonance_key: str | None = Header(default=None),
) -> dict[str, Any]:
    require_key(x_consonance_key)
    try:
        result = ingest_source(request.model_dump())
    except ConfigError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"completed": True, "result": result}


@app.post("/extract-claims")
def extract(
    request: ExtractClaimsRequest,
    x_consonance_key: str | None = Header(default=None),
) -> dict[str, Any]:
    require_key(x_consonance_key)
    try:
        result = extract_claims(request.evidence_source_id)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"completed": True, "result": result}


@app.post("/claims/{claim_id}/review")
def review(
    claim_id: str,
    request: ReviewClaimRequest,
    x_consonance_key: str | None = Header(default=None),
) -> dict[str, Any]:
    require_key(x_consonance_key)
    try:
        result = review_claim(
            claim_id,
            request.review_state,
            request.reviewed_by,
            request.review_notes,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"completed": True, "claim": result}


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
    return {
        "accepted": True,
        "job": job,
        "note": "Queued jobs require the paid background worker, which is intentionally disabled in the free-only phase.",
    }


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

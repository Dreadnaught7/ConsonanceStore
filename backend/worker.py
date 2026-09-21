import os
import time
from typing import Any
from urllib.parse import urlparse

import requests

from common import db_get, db_insert, db_patch, safe_json, sha256_bytes, utcnow

POLL_SECONDS = max(1, int(os.environ.get("WORKER_POLL_SECONDS", "5")))


def claim_next_job() -> dict[str, Any] | None:
    rows = db_get(
        "consonance_jobs",
        "status=eq.queued&order=created_at.asc&limit=1&select=*",
    )
    if not rows:
        return None

    job = rows[0]
    claimed = db_patch(
        "consonance_jobs",
        f"id=eq.{job['id']}&status=eq.queued",
        {"status": "running", "started_at": utcnow(), "updated_at": utcnow()},
    )
    return claimed[0] if claimed else None


def ingest_source(payload: dict[str, Any]) -> dict[str, Any]:
    source_url = str(payload.get("url", "")).strip()
    if not source_url:
        raise ValueError("ingest_source requires payload.url")

    parsed = urlparse(source_url)
    if parsed.scheme not in {"http", "https"}:
        raise ValueError("Only http/https sources are accepted.")

    response = requests.get(
        source_url,
        timeout=60,
        headers={"User-Agent": "ConsonanceEvidenceEngine/0.1"},
    )
    response.raise_for_status()
    raw = response.content
    digest = sha256_bytes(raw)

    record = {
        "source_url": source_url,
        "source_type": payload.get("source_type", "web"),
        "title": payload.get("title"),
        "sha256": digest,
        "content_type": response.headers.get("content-type"),
        "byte_length": len(raw),
        "retrieved_at": utcnow(),
        "metadata": {
            "http_status": response.status_code,
            "requested_by": payload.get("requested_by"),
            "tags": payload.get("tags", []),
        },
    }
    rows = db_insert("evidence_sources", record)
    saved = rows[0] if isinstance(rows, list) and rows else rows
    return {
        "evidence_source_id": saved.get("id") if isinstance(saved, dict) else None,
        "sha256": digest,
        "byte_length": len(raw),
    }


def execute(job: dict[str, Any]) -> dict[str, Any]:
    job_type = job["job_type"]
    payload = job.get("payload") or {}

    if job_type == "ingest_source":
        return ingest_source(payload)
    if job_type == "system_heartbeat":
        return {"heartbeat": utcnow()}
    raise ValueError(f"Unsupported job type: {job_type}")


def finish(job_id: str, result: dict[str, Any]) -> None:
    db_patch(
        "consonance_jobs",
        f"id=eq.{job_id}",
        {
            "status": "completed",
            "result": result,
            "finished_at": utcnow(),
            "updated_at": utcnow(),
        },
    )


def fail(job_id: str, exc: Exception) -> None:
    db_patch(
        "consonance_jobs",
        f"id=eq.{job_id}",
        {
            "status": "failed",
            "error": safe_json({"type": type(exc).__name__, "message": str(exc)})[:8000],
            "finished_at": utcnow(),
            "updated_at": utcnow(),
        },
    )


def main() -> None:
    print("Consonance worker started.", flush=True)
    while True:
        try:
            job = claim_next_job()
            if not job:
                time.sleep(POLL_SECONDS)
                continue
            try:
                result = execute(job)
                finish(job["id"], result)
            except Exception as exc:
                fail(job["id"], exc)
        except Exception as exc:
            print(f"worker-loop error: {exc}", flush=True)
            time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()

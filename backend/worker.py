import os
import time
from typing import Any
from urllib.parse import quote, urlparse

import requests

from common import db_get, db_insert, db_patch, safe_json, sha256_bytes, utcnow

POLL_SECONDS = max(1, int(os.environ.get("WORKER_POLL_SECONDS", "5")))
ALLOWED_VISIBILITY = {"public", "descendant", "institutional", "internal", "restricted"}
ALLOWED_AUTH = {
    "origin_unknown",
    "contributor_supplied",
    "institutionally_sourced",
    "independently_corroborated",
    "authenticated_original",
}


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


def _choice(value: Any, allowed: set[str], default: str) -> str:
    candidate = str(value or default).strip().lower()
    return candidate if candidate in allowed else default


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
        headers={"User-Agent": "ConsonanceEvidenceEngine/0.2"},
    )
    response.raise_for_status()

    raw = response.content
    digest = sha256_bytes(raw)
    retrieved_at = utcnow()
    title = str(payload.get("title") or source_url).strip()
    source_type = str(payload.get("source_type") or "web").strip()
    visibility = _choice(payload.get("visibility"), ALLOWED_VISIBILITY, "internal")
    authentication_state = _choice(
        payload.get("authentication_state"),
        ALLOWED_AUTH,
        "origin_unknown",
    )

    # URL is the stable intake identity. A manually registered source may not
    # have a content hash yet; the Render worker re-verifies and enriches it.
    matches = db_get(
        "obs_sources",
        f"source_url=eq.{quote(source_url, safe='')}&select=*",
    )
    existing = matches[0] if matches else None

    if existing:
        metadata = dict(existing.get("metadata") or {})
        metadata.update(
            {
                "latest_http_status": response.status_code,
                "latest_content_type": response.headers.get("content-type"),
                "latest_byte_length": len(raw),
                "latest_retrieved_at": retrieved_at,
                "hash_pending_render": False,
                "last_ingest_engine": "consonance-render/0.2",
            }
        )
        patched = db_patch(
            "obs_sources",
            f"id=eq.{existing['id']}",
            {
                "raw_hash": digest,
                "retrieved_at": retrieved_at,
                "metadata": metadata,
            },
        )
        saved = patched[0] if patched else existing
        duplicate = True
    else:
        rows = db_insert(
            "obs_sources",
            {
                "source_type": source_type,
                "title": title,
                "citation": payload.get("citation"),
                "source_url": source_url,
                "repository": payload.get("repository"),
                "record_identifier": payload.get("record_identifier"),
                "authentication_state": authentication_state,
                "source_date": payload.get("source_date"),
                "retrieved_at": retrieved_at,
                "raw_hash": digest,
                "metadata": {
                    "http_status": response.status_code,
                    "content_type": response.headers.get("content-type"),
                    "byte_length": len(raw),
                    "requested_by": payload.get("requested_by"),
                    "tags": payload.get("tags", []),
                    "ingest_engine": "consonance-render/0.2",
                },
                "visibility": visibility,
            },
        )
        saved = rows[0] if isinstance(rows, list) and rows else rows
        duplicate = False

    provenance_rows = db_insert(
        "obs_provenance_events",
        {
            "object_type": "obs_source",
            "object_id": saved["id"],
            "event_type": "source_reverified" if duplicate else "source_ingested",
            "actor": payload.get("requested_by") or "consonance-render-worker",
            "details": {
                "source_url": source_url,
                "sha256": digest,
                "byte_length": len(raw),
                "content_type": response.headers.get("content-type"),
                "http_status": response.status_code,
                "duplicate": duplicate,
                "retrieved_at": retrieved_at,
            },
        },
    )
    provenance = (
        provenance_rows[0]
        if isinstance(provenance_rows, list) and provenance_rows
        else provenance_rows
    )

    return {
        "obs_source_id": saved.get("id"),
        "provenance_event_id": provenance.get("id") if isinstance(provenance, dict) else None,
        "sha256": digest,
        "byte_length": len(raw),
        "duplicate": duplicate,
        "visibility": visibility,
        "authentication_state": authentication_state,
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

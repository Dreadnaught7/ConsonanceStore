import os
import time
from typing import Any
from urllib.parse import quote, urlparse

import requests

from common import db_get, db_insert, db_patch, safe_json, sha256_bytes, utcnow

POLL_SECONDS = max(1, int(os.environ.get("WORKER_POLL_SECONDS", "5")))
ALLOWED_INVESTIGATION_ROLES = {
    "primary",
    "supporting",
    "context",
    "contradictory",
    "background",
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


def _resolve_investigation(payload: dict[str, Any]) -> str | None:
    explicit_id = str(payload.get("investigation_id") or "").strip()
    if explicit_id:
        rows = db_get(
            "obs_investigations",
            f"id=eq.{quote(explicit_id, safe='')}&select=id",
        )
        if not rows:
            raise ValueError("investigation_id was not found in obs_investigations")
        return rows[0]["id"]

    thread_slug = str(payload.get("thread_slug") or "").strip()
    investigation_title = str(payload.get("investigation_title") or "").strip()

    if not thread_slug and not investigation_title:
        return None
    if not thread_slug or not investigation_title:
        raise ValueError(
            "thread_slug and investigation_title must be supplied together "
            "when investigation_id is not supplied"
        )

    thread_rows = db_get(
        "obs_threads",
        f"slug=eq.{quote(thread_slug, safe='')}&select=id",
    )
    if not thread_rows:
        raise ValueError(f"Observatory thread not found: {thread_slug}")

    investigation_rows = db_get(
        "obs_investigations",
        (
            f"thread_id=eq.{thread_rows[0]['id']}"
            f"&title=eq.{quote(investigation_title, safe='')}"
            "&select=id"
        ),
    )
    if not investigation_rows:
        raise ValueError(
            "Observatory investigation not found for the supplied "
            "thread_slug and investigation_title"
        )
    return investigation_rows[0]["id"]


def _bind_source_to_investigation(
    investigation_id: str,
    evidence_source_id: str,
    role: str,
) -> bool:
    normalized_role = str(role or "supporting").strip().lower()
    if normalized_role not in ALLOWED_INVESTIGATION_ROLES:
        raise ValueError(
            "investigation_role must be one of: "
            + ", ".join(sorted(ALLOWED_INVESTIGATION_ROLES))
        )

    existing = db_get(
        "obs_investigation_sources",
        (
            f"investigation_id=eq.{quote(investigation_id, safe='')}"
            f"&evidence_source_id=eq.{quote(evidence_source_id, safe='')}"
            "&select=investigation_id"
        ),
    )
    if existing:
        return False

    db_insert(
        "obs_investigation_sources",
        {
            "investigation_id": investigation_id,
            "evidence_source_id": evidence_source_id,
            "role": normalized_role,
            "metadata": {
                "bound_by": "consonance-render-api",
                "bound_at": utcnow(),
            },
        },
        return_row=False,
    )
    return True


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
        headers={"User-Agent": "ConsonanceEvidenceEngine/0.5"},
    )
    response.raise_for_status()

    raw = response.content
    digest = sha256_bytes(raw)
    retrieved_at = utcnow()
    requested_by = str(payload.get("requested_by") or "consonance-render-api")

    record = {
        "source_url": source_url,
        "source_type": str(payload.get("source_type") or "web"),
        "title": payload.get("title"),
        "sha256": digest,
        "content_type": response.headers.get("content-type"),
        "byte_length": len(raw),
        "retrieved_at": retrieved_at,
        "metadata": {
            "http_status": response.status_code,
            "requested_by": requested_by,
            "tags": payload.get("tags", []),
            "citation": payload.get("citation"),
            "repository": payload.get("repository"),
            "record_identifier": payload.get("record_identifier"),
            "source_date": payload.get("source_date"),
            "authentication_state": payload.get("authentication_state", "origin_unknown"),
            "visibility": payload.get("visibility", "internal"),
            "ingest_engine": "consonance-render/0.5",
        },
    }

    try:
        rows = db_insert("evidence_sources", record)
        saved = rows[0] if isinstance(rows, list) and rows else rows
        duplicate = False
    except requests.HTTPError as exc:
        if exc.response is None or exc.response.status_code != 409:
            raise
        encoded_url = quote(source_url, safe="")
        matches = db_get(
            "evidence_sources",
            f"source_url=eq.{encoded_url}&sha256=eq.{digest}&select=*",
        )
        if not matches:
            raise
        saved = matches[0]
        duplicate = True

    provenance_rows = db_insert(
        "evidence_provenance_events",
        {
            "evidence_source_id": saved["id"],
            "event_type": "source_reverified" if duplicate else "source_ingested",
            "actor": requested_by,
            "occurred_at": retrieved_at,
            "details": {
                "source_url": source_url,
                "sha256": digest,
                "byte_length": len(raw),
                "content_type": response.headers.get("content-type"),
                "http_status": response.status_code,
                "duplicate": duplicate,
                "retrieved_at": retrieved_at,
                "authentication_state": payload.get("authentication_state", "origin_unknown"),
                "visibility": payload.get("visibility", "internal"),
                "ingest_engine": "consonance-render/0.5",
            },
        },
    )
    provenance = (
        provenance_rows[0]
        if isinstance(provenance_rows, list) and provenance_rows
        else provenance_rows
    )

    investigation_id = _resolve_investigation(payload)
    investigation_bound = False
    if investigation_id:
        investigation_bound = _bind_source_to_investigation(
            investigation_id,
            saved["id"],
            payload.get("investigation_role", "supporting"),
        )

    return {
        "evidence_source_id": saved.get("id") if isinstance(saved, dict) else None,
        "provenance_event_id": (
            provenance.get("id") if isinstance(provenance, dict) else None
        ),
        "investigation_id": investigation_id,
        "investigation_bound": investigation_bound,
        "sha256": digest,
        "byte_length": len(raw),
        "duplicate": duplicate,
        "retrieved_at": retrieved_at,
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

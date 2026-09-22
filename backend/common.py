import hashlib
import json
import os
from datetime import datetime, timezone
from typing import Any

import requests

_RAW_SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_URL = (
    _RAW_SUPABASE_URL[:-8]
    if _RAW_SUPABASE_URL.endswith("/rest/v1")
    else _RAW_SUPABASE_URL
)
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")


class ConfigError(RuntimeError):
    pass


def _headers(prefer: str | None = None) -> dict[str, str]:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise ConfigError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.")
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    return headers


def table_url(table: str) -> str:
    return f"{SUPABASE_URL}/rest/v1/{table}"


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def db_insert(table: str, row: dict[str, Any], return_row: bool = True) -> Any:
    prefer = "return=representation" if return_row else "return=minimal"
    response = requests.post(table_url(table), headers=_headers(prefer), json=row, timeout=30)
    response.raise_for_status()
    return response.json() if return_row else None


def db_patch(table: str, query: str, changes: dict[str, Any]) -> Any:
    response = requests.patch(
        f"{table_url(table)}?{query}",
        headers=_headers("return=representation"),
        json=changes,
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def db_get(table: str, query: str) -> Any:
    response = requests.get(f"{table_url(table)}?{query}", headers=_headers(), timeout=30)
    response.raise_for_status()
    return response.json()


def queue_job(job_type: str, payload: dict[str, Any]) -> dict[str, Any]:
    rows = db_insert(
        "consonance_jobs",
        {
            "job_type": job_type,
            "payload": payload,
            "status": "queued",
            "created_at": utcnow(),
            "updated_at": utcnow(),
        },
    )
    return rows[0] if isinstance(rows, list) and rows else rows


def safe_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, default=str)

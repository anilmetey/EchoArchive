from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from app.schemas import User

DATA_DIR = Path("apps/api/data")
USERS_FILE = DATA_DIR / "users.json"


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def _load_raw() -> list[dict]:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not USERS_FILE.exists():
        USERS_FILE.write_text("[]", encoding="utf-8")
    return json.loads(USERS_FILE.read_text(encoding="utf-8"))


def _save_raw(users: list[dict]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")


def public_user(raw: dict) -> User:
    return User(id=raw["id"], email=raw["email"], name=raw["name"], createdAt=raw["createdAt"])


def register_user(email: str, password: str, name: str | None) -> User:
    email = email.strip().lower()
    users = _load_raw()
    existing = next((user for user in users if user["email"] == email), None)
    if existing:
        return public_user(existing)

    raw = {
        "id": str(uuid4()),
        "email": email,
        "name": name.strip() if name and name.strip() else email.split("@")[0],
        "passwordHash": _hash_password(password),
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
    users.append(raw)
    _save_raw(users)
    return public_user(raw)


def authenticate_user(email: str, password: str) -> User | None:
    email = email.strip().lower()
    users = _load_raw()
    password_hash = _hash_password(password)
    raw = next((user for user in users if user["email"] == email and user["passwordHash"] == password_hash), None)
    return public_user(raw) if raw else None

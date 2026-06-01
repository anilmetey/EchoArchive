from __future__ import annotations

from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    anthropic_api_key: Optional[str] = None
    supabase_url: Optional[str] = None
    supabase_service_role_key: Optional[str] = None
    frontend_origin: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file="apps/api/.env", env_file_encoding="utf-8")


settings = Settings()

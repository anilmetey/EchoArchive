from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class CapsuleStatus(str, Enum):
    locked = "locked"
    unlocked = "unlocked"


class CapsuleVisibility(str, Enum):
    private = "private"
    anonymous_public = "anonymous_public"


class AiReport(BaseModel):
    mood: str
    themes: list[str]
    presentSelf: str
    futureAdvice: str
    revealSummary: str


class CapsuleCreate(BaseModel):
    title: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=12000)
    unlockAt: datetime
    visibility: CapsuleVisibility = CapsuleVisibility.private
    mediaType: Optional[str] = None


class Capsule(BaseModel):
    id: str
    userId: str = "demo-user"
    userName: str = "Demo User"
    title: str
    message: str
    unlockAt: datetime
    createdAt: datetime
    status: CapsuleStatus
    visibility: CapsuleVisibility
    mediaType: Optional[str] = None
    mediaUrl: Optional[str] = None
    mediaName: Optional[str] = None
    aiReport: AiReport


class AuthRequest(BaseModel):
    email: str = Field(min_length=5, max_length=160)
    password: str = Field(min_length=4, max_length=120)
    name: Optional[str] = Field(default=None, max_length=80)


class User(BaseModel):
    id: str
    email: str
    name: str
    createdAt: datetime


class AuthResponse(BaseModel):
    user: User

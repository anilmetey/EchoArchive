from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.schemas import Capsule, CapsuleStatus, CapsuleVisibility
from app.services.ai import analyze_capsule
from app.services.store import add_capsule, get_capsule as find_capsule, list_capsules as load_capsules, save_capsules

router = APIRouter(prefix="/capsules", tags=["capsules"])
UPLOAD_DIR = Path("apps/api/storage/uploads")


@router.get("", response_model=list[Capsule])
async def list_capsules() -> list[Capsule]:
    return load_capsules()


@router.post("", response_model=Capsule, status_code=201)
async def create_capsule(
    title: str = Form(...),
    message: str = Form(...),
    unlockAt: datetime = Form(...),
    visibility: CapsuleVisibility = Form(CapsuleVisibility.private),
    mediaType: Optional[str] = Form(None),
    userId: str = Form("demo-user"),
    userName: str = Form("Demo User"),
    media: Optional[UploadFile] = File(None)
) -> Capsule:
    if len(title.strip()) < 2:
        raise HTTPException(status_code=422, detail="Title must be at least 2 characters")
    if len(message.strip()) < 10:
        raise HTTPException(status_code=422, detail="Message must be at least 10 characters")

    media_url = None
    media_name = None
    if media and media.filename:
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        safe_name = Path(media.filename).name.replace(" ", "-")
        stored_name = f"{uuid4()}-{safe_name}"
        stored_path = UPLOAD_DIR / stored_name
        stored_path.write_bytes(await media.read())
        media_url = f"/uploads/{stored_name}"
        media_name = media.filename

    report = await analyze_capsule(message)
    now = datetime.now(timezone.utc)
    capsule = Capsule(
        id=str(uuid4()),
        userId=userId.strip() or "demo-user",
        userName=userName.strip() or "Demo User",
        title=title.strip(),
        message=message.strip(),
        unlockAt=unlockAt,
        createdAt=now,
        status=CapsuleStatus.unlocked if unlockAt <= now else CapsuleStatus.locked,
        visibility=visibility,
        mediaType=mediaType,
        mediaUrl=media_url,
        mediaName=media_name,
        aiReport=report
    )
    return add_capsule(capsule)


@router.get("/{capsule_id}", response_model=Capsule)
async def get_capsule(capsule_id: str) -> Capsule:
    capsule = find_capsule(capsule_id)
    if capsule:
        return capsule
    raise HTTPException(status_code=404, detail="Capsule not found")


@router.post("/{capsule_id}/publish", response_model=Capsule)
async def publish_capsule(capsule_id: str) -> Capsule:
    capsules = load_capsules()
    for capsule in capsules:
        if capsule.id == capsule_id:
            if capsule.status != CapsuleStatus.unlocked:
                raise HTTPException(status_code=409, detail="Capsule must be unlocked before publishing")
            capsule.visibility = CapsuleVisibility.anonymous_public
            save_capsules(capsules)
            return capsule
    raise HTTPException(status_code=404, detail="Capsule not found")


@router.post("/{capsule_id}/unpublish", response_model=Capsule)
async def unpublish_capsule(capsule_id: str) -> Capsule:
    capsules = load_capsules()
    for capsule in capsules:
        if capsule.id == capsule_id:
            capsule.visibility = CapsuleVisibility.private
            save_capsules(capsules)
            return capsule
    raise HTTPException(status_code=404, detail="Capsule not found")


@router.post("/jobs/unlock")
async def unlock_due_capsules() -> dict[str, int]:
    capsules = load_capsules()
    now = datetime.now(timezone.utc)
    unlocked = 0
    for capsule in capsules:
        if capsule.status == CapsuleStatus.locked and capsule.unlockAt <= now:
            capsule.status = CapsuleStatus.unlocked
            unlocked += 1
    save_capsules(capsules)
    return {"unlocked": unlocked}

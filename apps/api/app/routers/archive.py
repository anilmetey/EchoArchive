from fastapi import APIRouter
from app.schemas import Capsule, CapsuleStatus, CapsuleVisibility
from app.services.store import list_capsules

router = APIRouter(prefix="/archive", tags=["archive"])


@router.get("", response_model=list[Capsule])
async def list_archive() -> list[Capsule]:
    return [
        capsule
        for capsule in list_capsules()
        if capsule.status == CapsuleStatus.unlocked and capsule.visibility == CapsuleVisibility.anonymous_public
    ]

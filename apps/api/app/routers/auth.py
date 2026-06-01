from fastapi import APIRouter, HTTPException

from app.schemas import AuthRequest, AuthResponse
from app.services.users import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
async def register(payload: AuthRequest) -> AuthResponse:
    return AuthResponse(user=register_user(payload.email, payload.password, payload.name))


@router.post("/login", response_model=AuthResponse)
async def login(payload: AuthRequest) -> AuthResponse:
    user = authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return AuthResponse(user=user)

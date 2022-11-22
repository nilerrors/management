from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from app.models.user import UserLogin, UserSignup


router = APIRouter(prefix="/auth")


@router.post("/login")
def login(user: UserLogin, Authorize: AuthJWT = Depends()):
    print()
    print(user.duration)
    print()
    access_token = Authorize.create_access_token(subject=user.email, expires_time=user.duration)
    return {"access_token": access_token}


@router.post("/signup")
def login(user: UserSignup, Authorize: AuthJWT = Depends()):
    access_token = Authorize.create_access_token(subject=user.email, expires_time=user.duration)
    return {"access_token": access_token}


@router.get("/user", operation_id="authorize")
def current_user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    user = Authorize.get_jwt_subject()
    return {"current_user": user}




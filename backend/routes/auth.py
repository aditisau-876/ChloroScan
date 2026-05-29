from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from schemas.user_schema import SignupSchema, LoginSchema
from utils.auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(
    user: SignupSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    token = create_access_token(
        {"user_id": new_user.id}
    )

    return {
    "message": "Signup successful",
    "token": token,

    "user": {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }
}


@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        db_user.password
    )

    if not valid_password:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_access_token(
        {"user_id": db_user.id}
    )

    return {
    "message": "Login successful",
    "token": token,

    "user": {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }
}
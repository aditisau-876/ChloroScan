from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user_model import User
from backend.utils.auth import SECRET_KEY,ALGORITHM

security=HTTPBearer()

def get_current_user(credentials=Depends(security),db:Session=Depends(get_db)):
    token=credentials.credentials
    payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
    user=db.query(User).filter(User.id==payload["user_id"]).first()
    if not user:
        raise HTTPException(401)

    return user
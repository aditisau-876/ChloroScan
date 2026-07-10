from fastapi import APIRouter, UploadFile, File, Query
from fastapi.responses import JSONResponse
import shutil
import os
import uuid
from sqlalchemy import text
from backend.database import engine
from backend.dependencies import get_current_user
from fastapi import Depends
from backend.ml.services.prediction_service import predict
from backend.ml.services.plant_service import get_plant_by_model_name, search_plants
from fastapi import HTTPException
router = APIRouter()
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/predict")
async def predict_plant(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400,content={"success": False,"message": "Only image files are allowed"})
    filename = f"{uuid.uuid4()}.jpg"
    file_path = os.path.join(UPLOAD_FOLDER,filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    try:
        result = predict(file_path)
        return result

    except Exception as e:

        return JSONResponse(status_code=500,content={"success": False,"message": str(e) })

    finally:
        if os.path.exists(file_path):os.remove(file_path)

@router.get("/plant/{model_name}")
def get_plant_details(model_name: str):
    plant = get_plant_by_model_name(model_name)

    if not plant:
        raise HTTPException(
            status_code=404,
            detail="Plant not found"
        )
    return plant


@router.get("/plants/search")
def search(query: str = Query(...)):
    return search_plants(query)

@router.post("/myplants/{plant_id}")
def add_to_my_garden(
    plant_id: int,
    user_id: int = Depends(get_current_user)
):
    with engine.begin() as conn:

        exists = conn.execute(
            text("""
            SELECT id
            FROM user_plants
            WHERE user_id=:uid
            AND plant_id=:pid
            """),
            {
                "uid": user_id,
                "pid": plant_id
            }
        ).fetchone()

        if exists:
            return {
                "success": True,
                "message": "Already added"
            }

        conn.execute(
            text("""
            INSERT INTO user_plants(user_id,plant_id)
            VALUES(:uid,:pid)
            """),
            {
                "uid": user_id,
                "pid": plant_id
            }
        )

    return {
        "success": True,
        "message": "Added"
    }
@router.delete("/myplants/{plant_id}")
def remove_from_my_garden(
    plant_id: int,
    user_id: int = Depends(get_current_user)
):

    with engine.begin() as conn:

        conn.execute(
            text("""
            DELETE FROM user_plants
            WHERE user_id=:uid
            AND plant_id=:pid
            """),
            {
                "uid": user_id,
                "pid": plant_id
            }
        )

    return {
        "success": True
    }
@router.get("/myplants")
def get_my_plants(
    user_id: int = Depends(get_current_user)
):

    with engine.begin() as conn:

        rows = conn.execute(
            text("""
            SELECT
                p.*
            FROM plants p
            JOIN user_plants u
            ON p.id=u.plant_id
            WHERE u.user_id=:uid
            """),
            {
                "uid": user_id
            }
        ).fetchall()

    return [dict(row._mapping) for row in rows]
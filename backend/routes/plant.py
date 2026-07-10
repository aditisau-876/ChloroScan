from fastapi import APIRouter, UploadFile, File, Query
from fastapi.responses import JSONResponse
import shutil
import os
import uuid
from backend.utils.dependencies import get_current_user
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
def search(
    query: str = Query(...),
    user=Depends(get_current_user)
):
    return search_plants(query, user.id)
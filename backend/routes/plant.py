from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import os
import uuid
from backend.ml.services.prediction_service import predict

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



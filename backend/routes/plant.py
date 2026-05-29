from fastapi import APIRouter, UploadFile, File
import shutil
import os

#from ml.classifier import classify_category
from ml.fruit_predictor import predict_fruit
from ml.vegetable_predictor import predict_vegetable
from ml.medicinal_predictor import predict_medicinal
#from ml.flower_predictor import predict_flower
#from ml.decorative_predictor import predict_decorative

router = APIRouter()


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/predict")

async def predict_plant(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

 
    #category = classify_category(file_path)

    #if category == "Fruit":
        #result = predict_fruit(file_path)

    #elif category == "Vegetable":
        #result = predict_vegetable(file_path)

    #elif category == "Medicinal":
        #result = predict_medicinal(file_path)

    #elif category == "Flower":
        #result = predict_flower(file_path)

    #elif category == "Decorative":
        #result = predict_decorative(file_path)

    #else:
        result = {
            "plant_name": "Unknown Plant",
            "confidence": 0
        }

    return {
        #"category": category,
        "result": result
    }
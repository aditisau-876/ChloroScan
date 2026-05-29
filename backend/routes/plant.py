from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse

import shutil
import os
import uuid

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

    if not file.content_type.startswith("image/"):
        return JSONResponse(
            status_code=400,
            content={
                "message": "Only image files are allowed"
            }
        )

    filename = f"{uuid.uuid4()}.jpg"

    file_path = os.path.join(UPLOAD_FOLDER, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    #try:
        #classifier_result = classify_category(file_path) 
        #predictions = classifier_result["predictions"]

        #top1 = predictions[0] 
        #top2 = predictions[1] 

        #category1 = top1["category"] 
        #confidence1 = top1["confidence"] 

        #category2 = top2["category"] 
        #confidence2 = top2["confidence"]  
        
        #if confidence1 >= 80: 
            #result = run_category_model(category1, file_path) 
            #return { "type": "single_match", "category": category1, "result": result } 
        
        #elif abs(confidence1 - confidence2) <= 10: 
            #result1 = run_category_model(category1, file_path) 
            #result2 = run_category_model(category2, file_path) 
            #best_result = max( [result1, result2], key=lambda x: x["confidence"] ) 
            #return { "type": "dual_match", "categories_checked": [ category1, category2 ], "result": best_result } 
        
        #else: similar = get_similar_plants(file_path) 
            #return { "type": "unknown", "message": "Plant could not be identified confidently", "similar_plants": similar } 
    #finally: 
        if os.path.exists(file_path): 
            os.remove(file_path)

def run_category_model(category, file_path):
    #category = classify_category(file_path)
    #if category == "Fruit":
        result = predict_fruit(file_path)

    #elif category == "Vegetable":
        result = predict_vegetable(file_path)

    #elif category == "Medicinal":
        result = predict_medicinal(file_path)

    #elif category == "Flower":
        #result = predict_flower(file_path)

    #elif category == "Decorative":
        #result = predict_decorative(file_path)

    #else:
        #result = {
            #"plant_name": "Unknown Plant",
            #"confidence": 0}
        return {
            "success": True,
            #"category": category,
            #"result": result
        }



from backend.ml.classifier.category_classifier import classify_category
from backend.ml.predictors.fruit_predictor import predict_fruit
from backend.ml.predictors.flower_predictor import predict_flower
from backend.ml.predictors.vegetable_predictor import predict_vegetable
from backend.ml.predictors.medicinal_predictor import predict_medicinal
from backend.ml.predictors.indoor_predictor import predict_indoor
from backend.ml.services.plant_service import get_plant_by_model_name
from backend.ml.services.related_plants_service import get_similar_plants,get_related_plants

def predict(file_path):
    classifier_result = classify_category(file_path)
    if not classifier_result["success"]:
        return {"success": False,"message": classifier_result.get("error","Classifier failed")}

    predictions = classifier_result["predictions"]
    if len(predictions) == 0:
        return {"success": False,"message":"No category predictions found"}

    top1 = predictions[0]
    category1 = top1["category"]
    confidence1 = top1["confidence"]

    if confidence1 >= 80:
        result = run_category_model(category1,file_path)
        if not result["success"]:
            return {"success": False,"message":"Prediction failed"}
        return build_response(result=result, category=category1, response_type="single_match", classifier_confidence=confidence1)

    candidate_categories = []
    for pred in predictions:
        difference = abs(confidence1 -pred["confidence"])
        if difference <= 10:
            candidate_categories.append(pred["category"])

    if len(candidate_categories) > 1:
        model_results = []
        for category in candidate_categories:
            result = run_category_model(category,file_path)
            if result["success"]:model_results.append(result)
        if len(model_results) == 0:
            return {"success": False,"message":"All category models failed"}
        best_result = max(model_results,key=lambda x: x["confidence"])
        return build_response(result=best_result,category="Multiple",response_type="multi_match",categories_checked=candidate_categories)
    return {"success": True,"type": "unknown","message":"Plant could not be identified confidently","similar_plants": []}

def build_response(result,category,response_type,classifier_confidence=None,categories_checked=None):

    similar_plants = get_similar_plants(result["top_predictions"])
    related_plants = []
    plant_data = get_plant_by_model_name(result["model_name"])

    if plant_data:
        related_plants = related_plants = get_related_plants(family=plant_data["family"],current_plant_id=plant_data["id"])

    response = {
        "success": True,
        "type": response_type,
        "category": category,
        "result": result,
        "plant_data": plant_data,
        "similar_plants": similar_plants,
        "related_plants": related_plants
    }

    if classifier_confidence is not None:
        response["classifier_confidence"] = classifier_confidence
    if categories_checked is not None:
        response["categories_checked"] = categories_checked
    return response

def run_category_model(category,file_path):
    if category == "Fruit":
        return predict_fruit(file_path)
    elif category == "Flower":
        return predict_flower(file_path)
    elif category == "Vegetable":
        return predict_vegetable(file_path)
    elif category == "Medicinal":
        return predict_medicinal(file_path)
    elif category == "Indoor":
        return predict_indoor(file_path)
    return {"success": False,"plant_name": "Unknown","confidence": 0}
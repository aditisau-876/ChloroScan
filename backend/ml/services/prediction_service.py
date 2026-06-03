from backend.ml.classifier.category_classifier import classify_category
from backend.ml.predictors.fruit_predictor import predict_fruit
from backend.ml.predictors.flower_predictor import predict_flower
from backend.ml.predictors.vegetable_predictor import predict_vegetable
from backend.ml.predictors.medicinal_predictor import predict_medicinal
from backend.ml.predictors.indoor_predictor import predict_indoor

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
        result = run_category_model(
            category1,
            file_path
        )
        return {
            "success": True,
            "type": "single_match",
            "category": category1,
            "classifier_confidence":
            confidence1,
            "result": result
        }

    candidate_categories = []
    for pred in predictions:
        difference = abs(confidence1 -pred["confidence"])
        if difference <= 10:
            candidate_categories.append(pred["category"])

    if len(candidate_categories) > 1:
        model_results = []
        for category in candidate_categories:
            result = run_category_model(category,file_path)
            if result["success"]:
                model_results.append(result)

        if len(model_results) == 0:
            return {"success": False,"message":"All category models failed"}

        best_result = max(model_results,key=lambda x:x["confidence"])

        return {
            "success": True,
            "type": "multi_match",
            "categories_checked":
            candidate_categories,
            "result": best_result
        }


    return {
        "success": True,
        "type": "unknown",
        "message":"Plant could not be identified confidently"
    }


def run_category_model(
    category,
    file_path
):

    if category == "Fruit":

        return predict_fruit(
            file_path
        )

    elif category == "Flower":

        return predict_flower(
            file_path
        )

    elif category == "Vegetable":

        return predict_vegetable(
            file_path
        )

    elif category == "Medicinal":

        return predict_medicinal(
            file_path
        )

    elif category == "Indoor":

        return predict_indoor(
            file_path
        )

    return {
        "success": False,
        "plant_name": "Unknown",
        "confidence": 0
    }
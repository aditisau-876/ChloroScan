from backend.ml.classifier.category_classifier import classify_category

from backend.ml.predictors.fruit_predictor import predict_fruit
from backend.ml.predictors.flower_predictor import predict_flower
from backend.ml.predictors.vegetable_predictor import predict_vegetable
from backend.ml.predictors.medicinal_predictor import predict_medicinal
from backend.ml.predictors.indoor_predictor import predict_indoor


def predict(file_path):

    classifier_result = classify_category(
        file_path
    )

    predictions = classifier_result[
        "predictions"
    ]

    top1 = predictions[0]
    top2 = predictions[1]

    category1 = top1["category"]
    confidence1 = top1["confidence"]

    category2 = top2["category"]
    confidence2 = top2["confidence"]

    if confidence1 >= 80:

        result = run_category_model(
            category1,
            file_path
        )

        return {
            "type": "single_match",
            "category": category1,
            "result": result
        }

    elif abs(
        confidence1 - confidence2
    ) <= 10:

        result1 = run_category_model(
            category1,
            file_path
        )

        result2 = run_category_model(
            category2,
            file_path
        )

        best_result = max(
            [result1, result2],
            key=lambda x: x["confidence"]
        )

        return {
            "type": "dual_match",
            "categories_checked": [
                category1,
                category2
            ],
            "result": best_result
        }

    else:

        return {
            "type": "unknown",
            "message":
            "Plant could not be identified confidently"
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
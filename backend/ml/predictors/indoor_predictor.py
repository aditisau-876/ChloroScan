import tensorflow as tf
import numpy as np
from backend.ml.core.image_utils import preprocess_image

model = None
class_names = None

def load_model_once():
    global model, class_names

    if model is None:
        print("Loading Indoor plant Model...")
        model = tf.keras.models.load_model("backend/ml/models/indoor/indoorplant_model.keras")
        with open("backend/ml/models/indoor/indoorplant_classes.txt","r",) as f:
            class_names = [line.strip() for line in f.readlines()]

def predict_indoor(image_path):
    load_model_once()
    try:
        img_array = preprocess_image(image_path)
        prediction = model.predict(img_array, verbose=0)
        predicted_index = np.argmax(prediction)
        confidence = float(np.max(prediction) * 100)
        full_name = class_names[predicted_index]
        if "(" in full_name and ")" in full_name:
            scientific_name = (full_name.split("(")[0].strip())
            plant_name = (full_name.split("(")[1].replace(")", "").strip())
        else:
            scientific_name = full_name
            plant_name = full_name
        top_3_indices = np.argsort(prediction[0])[-3:][::-1]

        top_predictions = []
        for idx in top_3_indices:
            candidate = class_names[idx]
            if "(" in candidate and ")" in candidate:
                sci_name = (candidate.split("(")[0].strip())
                common_name = (candidate.split("(")[1].replace(")", "").strip())

            else:
                sci_name = candidate
                common_name = candidate
            top_predictions.append({
                "model_name": candidate,
                "scientific_name": sci_name,
                "plant_name": common_name,
                "confidence": round(float(prediction[0][idx] * 100),2)
            })

        return {
            "success": True,
            "model_name": full_name,
            "scientific_name": scientific_name,
            "plant_name": plant_name,
            "confidence": round(confidence, 2),
            "top_predictions": top_predictions
        }

    except Exception as e:
        return {
            "success": False,
            "scientific_name": "Unknown",
            "plant_name": "Unknown",
            "confidence": 0,
            "top_predictions": [],
            "error": str(e)
        }
import tensorflow as tf
import numpy as np
from pathlib import Path
from backend.ml.core.image_utils import preprocess_image

model = tf.keras.models.load_model(
    "backend/ml/classifier/category_classifier.keras",
    compile=False
)

with open(
    "backend/ml/classifier/category_classes.txt",
    "r",
    encoding="utf-8"
) as f:
    class_names = [
        line.strip()
        for line in f.readlines()
        if line.strip()
    ]


def classify_category(image_path):
    try:
        img_array = preprocess_image(image_path)
        prediction = model.predict(img_array, verbose=0)[0]
        sorted_indices = np.argsort(prediction)[::-1]
        predictions = []
        for idx in sorted_indices:
            predictions.append({"category": class_names[idx],"confidence": round(float(prediction[idx] * 100),2)})
        return {"success": True,"predictions": predictions}

    except Exception as e:
        return {"success": False,"predictions": [],"error": str(e)}
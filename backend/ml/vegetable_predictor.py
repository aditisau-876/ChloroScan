import tensorflow as tf
import numpy as np
from PIL import Image
import pillow_avif
from pillow_heif import register_heif_opener

register_heif_opener()
model = tf.keras.models.load_model(
    "ml/models/vegetable_leaf_model.keras"
)

class_names = [
    'Abelmoschus esculentus(LadyFinger)',
    'Allium cepa(Onion)',
    'Amaranthus dubius(Red Spinach)',
    'Beta vulgaris(Beetroot)',
    'Brassica oleracea var. botrytis(Cauliflower)',
    'Brassica oleracea var. gongylodes(Kohlrabi)',
    'Brassica oleracea.(Cabbage)',
    'Capsicum annuum(Bell Pepper)',
    'Capsicum annuum(Chillie)',
    'Citrus Limon (Lemon)',
    'Coccinia grandis(Ivy Gourd)',
    'Colocasia esculenta(Elephant Ear Plant)',
    'Coriandrum sativum(Coriander)',
    'Cucurbita pepo(Pumpkin)',
    'Curcuma longa(Turmeric)',
    'Daucus carota(Carrot)',
    'Ficus carica(Fig)',
    'Foeniculum vulgare(Fennel)',
    'Glycine max(Soybean)',
    'Ipomoea aquatica(Water Spinach)',
    'Lactuca sativa(Lettuce)',
    'Lagenaria siceraria(Bottle Gourd)',
    'Luffa acutangula(Ridge Gourd)',
    'Momordica charantia(Bitter Gourd)',
    'Moringa oleifera(Drumstick)',
    'Papaver somniferum(Poppy)',
    'Phaseolus vulgaris(Common Beans)',
    'Raphanus sativus(Radish)',
    'Solanum lycopersicum(Tomato)',
    'Solanum melongena(Eggplant)',
    'Solanum tuberosum(Potato)',
    'Spinacia oleracea(Spinach)',
    'Trichosanthes cucumerina(Snake Gourd)',
    'Trichosanthes dioica Roxb.(Pointed Gourd)',
    'Zingiber officinale(Ginger)'
]


def predict_vegetable(image_path):

    try:
        img = Image.open(image_path)
        img = img.convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array, verbose=0)
        predicted_index = np.argmax(prediction)
        confidence = float(
            np.max(prediction) * 100
        )
        full_name = class_names[predicted_index]
        if "(" in full_name and ")" in full_name:
            scientific_name = (
                full_name.split("(")[0].strip()
            )
            plant_name = (
                full_name.split("(")[1]
                .replace(")", "")
                .strip()
            )
        else:
            scientific_name = full_name
            plant_name = full_name
        top_3_indices = np.argsort(
            prediction[0]
        )[-3:][::-1]

        top_predictions = []
        for idx in top_3_indices:
            candidate = class_names[idx]
            if "(" in candidate and ")" in candidate:
                sci_name = (
                    candidate.split("(")[0].strip()
                )
                common_name = (
                    candidate.split("(")[1]
                    .replace(")", "")
                    .strip()
                )

            else:
                sci_name = candidate
                common_name = candidate
            top_predictions.append({
                "scientific_name": sci_name,
                "plant_name": common_name,
                "confidence": round(
                    float(prediction[0][idx] * 100),
                    2
                )
            })

        return {
            "success": True,
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
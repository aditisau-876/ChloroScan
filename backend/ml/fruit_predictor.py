import tensorflow as tf
import numpy as np
from PIL import Image
import pillow_avif
from pillow_heif import register_heif_opener

register_heif_opener()
model = tf.keras.models.load_model(
    "ml/models/fruit_leaf_model.keras"
)

class_names = [
    'Actinidia (Kiwi)',
    'Ananas comosus (Pineapple)',
    'Annona squamosa(Custard Apple)',
    'Areca catechu L. (Betel nut palm)',
    'Artocarpus altilis (Breadfruit)',
    'Artocarpus heterophyllus (Jackfruit)',
    'Averrhoa carambola (Star fruit)',
    'Baccaurea motleyana (Burmese Grape)',
    'Carica papaya (Papaya)',
    'Citrullus lanatus (Watermelon)',
    'Citrus Sinesis (Orange)',
    'Citrus limetta (Sweet Lemon)',
    'Citrus maxima (Pomelo)',
    'Citrus medica (Citron Lime)',
    'Cocos nucifera (Coconut palm)',
    'Cucumis melo (Maskmelon)',
    'Cucumis sativus (Cucumber)',
    'Cucurbitaceae (Squash)',
    'Diospyrus (Perisimmon)',
    'Durio zibethinus (Durian)',
    'Fragaria ananassa (Strawberry)',
    'Limonia Acidissima (Wood Apple)',
    'Litchi chinensis (Litchi)',
    'Malus domestica(Apple)',
    'Mangifera indica (Mango)',
    'Manilkara zapota (Sapodilla)',
    'Morinda citrifolia (Indian Mulberry)',
    'Morus (Mulberry)',
    'Musa paradisiaca(Banana)',
    'Olea europaea (Olive)',
    'Passiflora edulis (Passion Fruit)',
    'Persea americana (Avocado)',
    'Phoenix dactylifera (Date Palm)',
    'Phyllanthus emblica(Indian Gooseberry)',
    'Prunus (Cherry)',
    'Prunus persica (Peach)',
    'Psidium guajava (Guava)',
    'Punica granatam (Pomegranate)',
    'Pyrus communis (Pear)',
    'Rubus idaeus (Raspberry)',
    'Saccharum officinarum (Sugarcane)',
    'Seleniceras (Dragron fruit)',
    'Spondius Mombin (Hog Plum)',
    'Syzygium cumini (Java Plum)',
    'Tamarindus indica (Tamarind)',
    'Trapa natans (Water chestnut)',
    'Vaccinium (Blueberry)',
    'Vitus vinifera (Grapes)',
    'Zea mays (Maize)',
    'Ziziphus mauritiana (Indian Jujube)'
]

def predict_fruit(image_path):

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
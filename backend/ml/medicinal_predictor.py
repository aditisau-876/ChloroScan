import tensorflow as tf
import numpy as np
from PIL import Image
import pillow_avif
from pillow_heif import register_heif_opener

register_heif_opener()
model = tf.keras.models.load_model(
    "ml/models/medicinal_plant_model.keras"
)

class_names = [
    'Aloe barbadensis(Aloevera)',
    'Alpinia Galanga (Rasna)',
    'Amaranthus Viridis (Arive-Dantu)',
    'Andrographis paniculata (Burm.f.) Nees(Kalmegh)',
    'Andrographis paniculata(Nelavembu)',
    'Asparagus racemosus Willd.(Shatamuli)',
    'Azadirachta indica(Neem)',
    'Bacopa monnieri(Brahmi)',
    'Bambusoideae(Bamboo)',
    'Brassica Juncea (Indian Mustard)',
    'Carissa Carandas (Karanda)',
    'Catharanthus roseus(Nithyapushpa)',
    'Centella asiatica(Thalkuni)',
    'Cinnamomum tamala(bay leaf)',
    'Cissus quadrangularis L.(Harjora)',
    'Costus igneus(Insulin)',
    'Curculigo orchioides Gaertn(Kalmusi)',
    'Curcuma amada Roxb.(Aam Ada)',
    'Cymbopogon citratus(Lemon_grass)',
    'Elettaria cardamomum (L.) Maton(Cardamom)',
    'Euphorbia hirta(Asthma weed)',
    'Ficus Religiosa (Peepal Tree)',
    'Heliotropium indicum L.(Hatishunr)',
    'Indian Gooseberry(Amla)',
    'Justicia adhatoda L.(Basak)',
    'Lawsonia inermis(Henna)',
    'Mentha(Mint)',
    'Murraya koenigii(CurryLeaf)',
    'Neolamarckia cadamba(Kambajala)',
    'Nerium Oleander(Arali)',
    'Nyctanthes Arbor-tristis (Parijata)',
    'Ocimum tenuiflorum(Tulasi)',
    'Origanum vulgare(Oregano)',
    'Oxalis acetosella(Wood sorel)',
    'Persea americana(Avacado)',
    'Piper Nigrum(Black Pepper)',
    'Piper betle(Betel)',
    'Platanus orientalis(Chinar)',
    'Plectranthus Amboinicus (Mexican Mint)',
    'Plectranthus amboinicus(Doddapatre)',
    'Plumbago zeylanica L.(Chitrak)',
    'Pongamia Pinnata(Honge)',
    'Pterocarpus santalinus(Raktachandini)',
    'Rauvolfia Serpentina l. benth. ex kurz(Sarpagandha)',
    'Ricinus communis(Castor)',
    'Ruta graveolens(Nagadali)',
    'Santalum Album (Sandalwood)',
    'Saraca asoca(Ashoka)',
    'Solanum nigrum(Ganike)',
    'Tinospora cordifolia(Amrutha balli)',
    'Trigonella Foenum-graecum (Fenugreek)',
    'Withania somnifera(Ashwagandha)',
    'Wrightia tinctoria(Badipala)'
]


def predict_medicinal(image_path):

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
#['Abutilon indicum (Indian Mallow)', 'Acer Buegeranium (Trident maple)', 'Acer rubrum (Red Maple)', 'Adenium(Desert Rose)', 'Alstonia Scholaris (Chhatim)', 'Amaryllis belladonna (Belladona lily)', 'Aster genus(Michaelmas daisies)', 'Bauhinia acuminata (Dwarf White Bauhinia)', 'Bauhinia variegata(Kanchan)', 'Bellis perennis(Daisy)', 'Berberis julianae (Wintergreen Barberry)', 'Bougainvillea glabra(Paperflower)', 'Calendula officinalis L(Calendula)', 'Callistophylla Hoya (Veined Wax Plant)', 'Calotropis gigantea (Crown flower)', 'Catharanthus roseus (Madagascar Periwinkle)', 'Cestrum nocturnum(Hasnuhana)', 'Chinese Ixora (Rongon)', 'Chrysanthemum(Chrysanthum)', 'Clitoria ternatea(Aparajita)', 'Commiphora caudata (Hill Mango)', 'Cosmos caudatus(Cosmos)', 'Dahlia pinnata(Dahlia)', 'Datura (Devils trumpet)', 'Dendrocnide Sinuata (Devil nettle)', 'Dianthus caryophyllus(Carnation)', 'Echinopsis oxygona (Easter lily cactus)', 'Epiphyllum oxiypetalum(Queen of the Night)', 'Eucrosia bicolor (Peruvian lily)', 'Eustoma grandifloru(Nandini)', 'Ficus religiosa (Sacred Fig)', 'Garuga Floribunda (Garuga)', 'Geranium(Cranesbills)', 'Gomphrena globosa (Globe Amarnath)', 'Gymnocalycium (Chin cactus)', 'Hampea Micrantha(Dwarf Mircrantha)', 'Helianthus annuus (Sunflower)', 'Hibiscus rosa-sinensis (Hibiscus)', 'Hoya Dolischoparte (Long Spar Hoya)', 'Hoya Surisana(Porcelain flower)', 'Hoya anulata (Waxvine)', 'Hoya curtisii(Million Hearts)', 'Hoya hypolasia (Wax Plant)', 'Hoya minahassae(Porcelain flower)', 'Hoya monetteae (Wax plant)', 'Hoya multiflora(Shooting star Hoya)', 'Hoya obovata(Wax Plant)', 'Hoya occultata(Wax Plant)', 'Hoya polypus (Octopus Hoya)', 'Hoya sp. Garut (Wax Plant)', 'Hoya towutiensis(Wax Plant)', 'Hoya uncinata(Wax Vine)', 'Hoya vitellina Blume(Wax Plant)', 'Hoya vitellinoides(Wax Flower)', 'Hoya wallichii (Wax Vine)', 'Hoya waymaniae(Wax flower)', 'Hyacinthoides non scripta(Bluebell)', 'Hymenocallis littoralis(Spider Lily)', 'Ilex aquifolium (European Holly)', 'Ipomoea(Morning Glory)', 'Jasminum auriculatum(Aromatic Jui)', 'Jasminum sambac (Arabian Jasmine)', 'Jatropha curcas (Barbados nut)', 'Justicia adathoda (Malabar nut)', 'Kalanchoe blossfeldiana(Kalancha)', 'Lantana Camara(Lantana)', 'Lantana camara (Common Lantana)', 'Lavandula angustifolia(Lavender)', 'Leucas aspera(Thumba)', 'Liquidambar styraciflua (American Sweetgum)', 'Lonicera periclymenum (Honey Suckle)', 'Magnolia champaca (Champaka)', 'Mamasa hoya(Hoya Mamasa)', 'Melastoma malabathricum (Malabar Melastome)', 'Mimosa pudic (Touch Me Not)', 'Mirabilis jalapa (Four O Clock)', 'Mollugo verticillata(Carpet Weed)', 'Narcissus pseudonarcissus(Daffodil)', 'Nelumbo nucifera (Lotus)', 'Neolamarckia cadamba(Kadam)', 'Nepenthes rigidifolia(Pitcher plant)', 'Nerium oleander (Oleander)', 'Nyctanthes arbor tristis (Night Jasmine)', 'Opuntia microdasys (Bunny Ear)', 'Orbea variegata (Starfish Cactus)', 'Parodia magnifica (Ball Cactus)', 'Passiflora incarnata (Passion flower)', 'Peacock Flower(Krishachura  or Radhachura)', 'Pereskia grandifolia(Rose Cactus)', 'Phalaenopsis amabilis (Moon Orchid)', 'Plumbago zeylanica (Leadwort)', 'Plumeria (Frangipani)', 'Plumeria pudica(Snake Flower)', 'Polianthes tuberosa(Rajanigandha)', 'Poplar genus (Cottonwood)', 'Primula vulgaris(Primrose)', 'Prunus Avium(Wild Cherry)', 'Quisqualis indica L(Madhuri lota)', 'Rosa indica (Rose)', 'Ruellia(Wild Petunia)', 'Ruta graveolens (Common rue)', 'Sonneratia caseolaris (Crabapple Mangrove)', 'Spathodea campanulata (African Tulip)', 'Tabernaemontana divaricata (Crape Jasmine)', 'Tabernaemontana pandacaqui (Banana Bush)', 'Tagetes erecta (Marigold)', 'Thunbergia erecta(Bush Clock Vine)', 'Tulipa gesneriana (Tulip)', 'Zephyranthes(Rainlily)', 'Zinnia elegans(Zinnia)']
import tensorflow as tf
import numpy as np
from backend.ml.core.image_utils import preprocess_image

model = None
class_names = None

def load_model_once():
    global model, class_names

    if model is None:
        print("Loading Flower Model...")
        model = tf.keras.models.load_model("backend/ml/models/flower/flower_model.keras")
        with open("backend/ml/models/flower/flower_classes.txt","r",) as f:
            class_names = [line.strip() for line in f.readlines()]

def predict_flower(image_path):
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
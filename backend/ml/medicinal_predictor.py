import tensorflow as tf
import numpy as np
from keras.utils import load_img, img_to_array
import os

model = tf.keras.models.load_model(
    "models/medicinal_plant_model.keras"
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

supported_formats = ('.jpg', '.jpeg', '.png', 'avif', 'webp', '.bmp', '.gif', '.tiff')
image_file = None

for file in os.listdir():
    if file.lower().endswith(supported_formats):
        image_file = file
        break

if image_file is None:
    print("No image found.")
    exit()

print(f"Using image: {image_file}")

img = load_img(image_file,target_size=(224, 224))
img_array = img_to_array(img)
img_array = img_array / 255.0
img_array = np.expand_dims(img_array, axis=0)
prediction = model.predict(img_array)
predicted_index = np.argmax(prediction)
confidence = np.max(prediction)
predicted_class = class_names[predicted_index]

print("\n========== RESULT ==========")
print(f"Predicted Fruit: {predicted_class}")
print(f"Confidence: {confidence:.2f}")
print("============================")
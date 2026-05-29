import tensorflow as tf
import numpy as np
from keras.utils import load_img, img_to_array
import os

model = tf.keras.models.load_model(
    "models/fruit_leaf_model.keras"
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
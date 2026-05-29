import tensorflow as tf
import numpy as np
from keras.utils import load_img, img_to_array
import os

model = tf.keras.models.load_model(
    "models/vegetable_leaf_model.keras"
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
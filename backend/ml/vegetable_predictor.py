import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load trained model
model = tf.keras.models.load_model(
    "models/vegetable_leaf_model.keras"
)

# IMPORTANT:
# Replace with YOUR exact class order
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

# Load image
img = image.load_img(
    "test.jpg",
    target_size=(224,224)
)

# Convert image to array
img_array = image.img_to_array(img)

# Normalize
img_array = img_array / 255.0

# Add batch dimension
img_array = np.expand_dims(img_array, axis=0)

# Predict
prediction = model.predict(img_array)

# Get prediction
predicted_index = np.argmax(prediction)

confidence = np.max(prediction)

predicted_class = class_names[predicted_index]

# Print result
print("Plant:", predicted_class)

print("Confidence:", confidence)
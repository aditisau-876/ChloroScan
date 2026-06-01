from PIL import Image
import numpy as np
import pillow_avif
from pillow_heif import register_heif_opener
register_heif_opener()

def preprocess_image(image_path):

    img = Image.open(image_path)

    img = img.convert("RGB")

    img = img.resize((224, 224))

    img_array = np.array(img)

    img_array = img_array / 255.0

    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    return img_array
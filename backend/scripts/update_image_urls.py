import sys
from pathlib import Path
ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT_DIR))
import os
import cloudinary
import cloudinary.api
from dotenv import load_dotenv
from sqlalchemy import text
from backend.database import engine

load_dotenv()

cloudinary.config(cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"), api_key=os.getenv("CLOUDINARY_API_KEY"), api_secret=os.getenv("CLOUDINARY_API_SECRET"))
assets = cloudinary.api.resources(type="upload", max_results=500)

cloudinary_assets = []

for asset in assets["resources"]:
    cloudinary_assets.append({"public_id": asset["public_id"], "secure_url": asset["secure_url"]})

with engine.begin() as conn:
    plants = conn.execute(text("""SELECT id, image_key FROM plants""")).fetchall()
    updated = 0

    for plant_id, image_key in plants:
        image_key = str(image_key).strip()
        matched_url = None
        for asset in cloudinary_assets:
            if asset["public_id"].startswith(image_key):
                matched_url = asset["secure_url"]
                break

        if matched_url:
            conn.execute(
                text("""UPDATE plants SET image_url = :url WHERE id = :id"""),
                {"url": matched_url, "id": plant_id})
            updated += 1

print(f"Updated rows = {updated}")
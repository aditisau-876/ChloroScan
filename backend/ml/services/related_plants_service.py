from sqlalchemy import text
from backend.database import engine
from backend.ml.services.plant_service import get_plant_by_model_name
def get_similar_plants(top_predictions):
    similar = []
    for plant in top_predictions:
        data = get_plant_by_model_name(plant["model_name"])
        if data:
            similar.append({
                "id": data["id"],
                "plant_name": data["plant_name"],
                "scientific_name": data["scientific_name"],
                "family": data["family"],
                "image_url": data["image_url"]
            })

    return similar


def get_related_plants(family,current_plant_id,limit=5):
    with engine.begin() as conn:
        rows = conn.execute(
            text("""
                SELECT
                    id,
                    plant_name,
                    scientific_name,
                    image_url
                FROM plants
                WHERE family = :family
                AND id != :current_plant_id
                LIMIT :limit
            """),
            {
                "family": family,
                "current_plant_id": current_plant_id,
                "limit": limit
            }
        ).fetchall()

    related = []
    for row in rows:
        related.append({
            "id": row.id,
            "plant_name": row.plant_name,
            "scientific_name": row.scientific_name,
            "image_url": row.image_url
        })

    return related
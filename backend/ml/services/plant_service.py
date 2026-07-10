from sqlalchemy import text
from backend.database import engine
from backend.ml.services.related_plants_service import get_related_plants
def get_plant_by_model_name(model_name):
    with engine.begin() as conn:
        row = conn.execute(text("""SELECT id,model_name,plant_name,scientific_name,category,watering,sunlight,soil,fertiliser,temperature,humidity,bloom_time,common_diseases,medicinal_uses,description,family,image_url FROM plants WHERE model_name = :model_name"""),{"model_name": model_name}).fetchone()
    if not row:
        return None

    plant = {
    "id": row.id,
    "model_name": row.model_name,
    "plant_name": row.plant_name,
    "scientific_name": row.scientific_name,
    "category": row.category,
    "watering": row.watering,
    "sunlight": row.sunlight,
    "soil": row.soil,
    "fertiliser": row.fertiliser,
    "temperature": row.temperature,
    "humidity": row.humidity,
    "bloom_time": row.bloom_time,
    "common_diseases": row.common_diseases,
    "medicinal_uses": row.medicinal_uses,
    "description": row.description,
    "family": row.family,
    "image_url": row.image_url
}
    
    plant["similar_plants"] = get_related_plants(
    family=plant["family"],
    current_plant_id=plant["id"]
)
    return plant

from sqlalchemy import text
from backend.database import engine

def search_plants(query):
    with engine.begin() as conn:

        rows = conn.execute(
            text("""
                SELECT
                    id,
                    model_name,
                    plant_name,
                    scientific_name,
                    image_url
                FROM plants
                WHERE
                    similarity(plant_name, :query) > 0.25
                    OR similarity(scientific_name, :query) > 0.25
                    OR plant_name ILIKE '%' || :query || '%'
                    OR scientific_name ILIKE '%' || :query || '%'

                ORDER BY
                    GREATEST(
                        similarity(plant_name, :query),
                        similarity(scientific_name, :query)
                    ) DESC

                LIMIT 10;
            """),
            {"query": query}
        ).fetchall()

    return [
        {
            "id": row.id,
            "model_name": row.model_name,
            "plant_name": row.plant_name,
            "scientific_name": row.scientific_name,
            "image_url": row.image_url,
        }
        for row in rows
    ]
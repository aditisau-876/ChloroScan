from sqlalchemy import text
from backend.database import engine
from backend.ml.services.related_plants_service import get_related_plants
import re

def get_plant_by_model_name(model_name):
    with engine.begin() as conn:
        row = conn.execute(
            text("""
                SELECT
                    id,
                    model_name,
                    plant_name,
                    scientific_name,
                    category,
                    watering,
                    sunlight,
                    soil,
                    fertiliser,
                    temperature,
                    humidity,
                    bloom_time,
                    common_diseases,
                    medicinal_uses,
                    description,
                    family,
                    image_url
                FROM plants
                WHERE model_name = :model_name
            """),
            {"model_name": model_name}
        ).fetchone()

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

    plant["similar_plants"] = get_related_plants(family=plant["family"],current_plant_id=plant["id"])

    return plant


def search_plants(query, user_id):
    with engine.begin() as conn:

        rows = conn.execute(
            text("""
                SELECT
                    p.id,
                    p.model_name,
                    p.plant_name,
                    p.scientific_name,
                    p.image_url,

                    CASE
                        WHEN up.user_id IS NULL THEN FALSE
                        ELSE TRUE
                    END AS added

                FROM plants p

                LEFT JOIN user_plants up
                    ON p.id = up.plant_id
                    AND up.user_id = :user_id

                WHERE
                    similarity(p.plant_name, :query) > 0.25
                    OR similarity(p.scientific_name, :query) > 0.25
                    OR p.plant_name ILIKE '%' || :query || '%'
                    OR p.scientific_name ILIKE '%' || :query || '%'

                ORDER BY
                    GREATEST(
                        similarity(p.plant_name, :query),
                        similarity(p.scientific_name, :query)
                    ) DESC

                LIMIT 10;
            """),
            {
                "query": query,
                "user_id": user_id
            }
        ).fetchall()

    return [
        {
            "id": row.id,
            "model_name": row.model_name,
            "plant_name": row.plant_name,
            "scientific_name": row.scientific_name,
            "image_url": row.image_url,
            "added": row.added
        }
        for row in rows
    ]

def get_recommended_plants(temp, humidity):

    if humidity >= 70:
        humidity_level = "High"
    elif humidity >= 40:
        humidity_level = "Medium"
    else:
        humidity_level = "Low"

    with engine.begin() as conn:

        rows = conn.execute(
            text("""
                SELECT
                    plant_name,
                    scientific_name,
                    model_name,
                    image_url,
                    description,
                    temperature,
                    humidity
                FROM plants
            """)
        ).fetchall()

    recommended = []

    for row in rows:

        match = re.findall(r"\d+", row.temperature)

        if len(match) >= 2:

            low = int(match[0])
            high = int(match[1])

            if low <= temp <= high:

                if row.humidity.lower() == humidity_level.lower():

                    recommended.append({
                        "plant_name": row.plant_name,
                        "scientific_name": row.scientific_name,
                        "model_name": row.model_name,
                        "image_url": row.image_url,
                        "description": row.description
                    })

    return recommended[:5]


def get_plant_by_scientific_name(
    scientific_name,
    common_names=None
):
    """
    Find a plant in the database using the scientific name
    returned by Pl@ntNet.

    If multiple plants have the same scientific name,
    common names from Pl@ntNet are used to select the
    most appropriate database record.
    """

    if not scientific_name:
        return None

    common_names = common_names or []

    with engine.begin() as conn:

        rows = conn.execute(
            text("""
                SELECT
                    id,
                    model_name,
                    plant_name,
                    scientific_name,
                    category,
                    watering,
                    sunlight,
                    soil,
                    fertiliser,
                    temperature,
                    humidity,
                    bloom_time,
                    common_diseases,
                    medicinal_uses,
                    description,
                    family,
                    image_url
                FROM plants
                WHERE LOWER(TRIM(scientific_name))
                    = LOWER(TRIM(:scientific_name))
            """),
            {
                "scientific_name": scientific_name
            }
        ).fetchall()

    if not rows:
        return None

    # ==================================================
    # If only one plant has this scientific name
    # ==================================================

    if len(rows) == 1:

        row = rows[0]

    else:

        # ==================================================
        # Multiple plants can share the same scientific name.
        #
        # Example:
        # Capsicum annuum → Bell Pepper
        # Capsicum annuum → Chilli
        #
        # Use Pl@ntNet common names to choose the closest one.
        # ==================================================

        normalized_api_names = [
            name.lower().strip()
            for name in common_names
            if name
        ]

        best_row = rows[0]
        best_score = 0

        for candidate in rows:

            candidate_name = (
                candidate.plant_name or ""
            ).lower().strip()

            score = 0

            for api_name in normalized_api_names:

                # Exact common-name match
                if api_name == candidate_name:
                    score += 10

                # Partial match
                elif (
                    api_name in candidate_name
                    or candidate_name in api_name
                ):
                    score += 5

            if score > best_score:

                best_score = score
                best_row = candidate

        row = best_row

    # ==================================================
    # Build plant response
    # ==================================================

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

    # ==================================================
    # Get related plants
    # ==================================================

    plant["similar_plants"] = get_related_plants(
        family=plant["family"],
        current_plant_id=plant["id"]
    )

    return plant

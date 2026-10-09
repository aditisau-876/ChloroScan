import os
import httpx


PLANTNET_API_KEY = os.getenv("PLANTNET_API_KEY")

PLANTNET_IDENTIFY_URL = (
    "https://my-api.plantnet.org/v2/identify/all"
)


async def identify_with_plantnet(file_path: str):

    if not PLANTNET_API_KEY:
        return {
            "success": False,
            "message": "PLANTNET_API_KEY is not configured"
        }

    try:

        with open(file_path, "rb") as image_file:

            files = [
                (
                    "images",
                    (
                        os.path.basename(file_path),
                        image_file,
                        "image/jpeg"
                    )
                )
            ]

            data = {
                "organs": "auto"
            }

            params = {
                "api-key": PLANTNET_API_KEY,
                "lang": "en",
                "nb-results": 5
            }

            async with httpx.AsyncClient(timeout=30.0) as client:

                response = await client.post(
                    PLANTNET_IDENTIFY_URL,
                    params=params,
                    files=files,
                    data=data
                )

            response.raise_for_status()

            result = response.json()

        predictions = []

        for item in result.get("results", [])[:5]:

            species = item.get("species", {})

            predictions.append({
                "scientific_name": species.get(
                    "scientificNameWithoutAuthor"
                ),
                "common_names": species.get(
                    "commonNames",
                    []
                ),
                "confidence": round(
                    float(item.get("score", 0)) * 100,
                    2
                )
            })

        best_result = None

        if predictions:
            best_result = predictions[0]

        return {
            "success": True,
            "best_match": result.get("bestMatch"),
            "best_prediction": best_result,
            "predictions": predictions,
            "remaining_requests": result.get(
                "remainingIdentificationRequests"
            )
        }

    except httpx.HTTPStatusError as e:

        return {
            "success": False,
            "message": (
                f"Pl@ntNet API error: "
                f"{e.response.status_code} - "
                f"{e.response.text}"
            )
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Query,
    Depends,
    HTTPException
)

from fastapi.responses import JSONResponse

import shutil
import os
import uuid

from backend.utils.dependencies import get_current_user

from backend.ml.services.prediction_service import predict

from backend.ml.services.plant_service import (
    get_plant_by_model_name,
    get_plant_by_scientific_name,
    search_plants
)

from backend.services.plantnet_service import (
    identify_with_plantnet
)

from backend.services.identification_service import (
    build_identification_result
)


router = APIRouter()


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/predict")
async def predict_plant(
    file: UploadFile = File(...)
):

    # ==================================================
    # CHECK FILE
    # ==================================================

    if (
        not file.content_type
        or not file.content_type.startswith("image/")
    ):

        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Only image files are allowed"
            }
        )

    # ==================================================
    # CREATE TEMPORARY FILE
    # ==================================================

    filename = f"{uuid.uuid4()}.jpg"

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    try:

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        # ==================================================
        # STEP 1
        #
        # RUN OUR EXISTING TENSORFLOW MODEL
        # ==================================================

        our_result = predict(
            file_path
        )

        # ==================================================
        # STEP 2
        #
        # RUN PL@NTNET
        #
        # PL@NTNET IS PRIMARY
        # ==================================================

        plantnet_result = await identify_with_plantnet(
            file_path
        )

        # ==================================================
        # STEP 3
        #
        # COMPARE BOTH RESULTS
        # ==================================================

        identification = build_identification_result(
            our_result,
            plantnet_result
        )

        # ==================================================
        # STEP 4
        #
        # GET PLANT DATA USING PRIMARY IDENTIFICATION
        #
        # Pl@ntNet result is used first.
        # ==================================================

        plant_data = None

        final_prediction = identification.get(
            "final_prediction"
        )

        if final_prediction:

            api_scientific_name = (
                final_prediction.get(
                    "scientific_name"
                )
            )

            api_common_names = (
                final_prediction.get(
                    "common_names",
                    []
                )
            )

            # ----------------------------------------------
            # Search our database using Pl@ntNet's
            # scientific name and common names.
            # ----------------------------------------------

            if api_scientific_name:

                plant_data = get_plant_by_scientific_name(
                    scientific_name=api_scientific_name,
                    common_names=api_common_names
                )

        # ==================================================
        # STEP 5
        #
        # FALLBACK
        #
        # If the Pl@ntNet plant isn't present in our
        # database, use our existing model's plant data.
        # ==================================================

        if plant_data is None:

            plant_data = our_result.get(
                "plant_data"
            )

        # ==================================================
        # STEP 6
        #
        # USE DATABASE SIMILAR PLANTS
        #
        # If Pl@ntNet found a matching plant in our
        # database, use its related/similar plants.
        # Otherwise keep the existing model results.
        # ==================================================

        similar_plants = our_result.get(
            "similar_plants",
            []
        )

        related_plants = our_result.get(
            "related_plants",
            []
        )

        if plant_data:

            database_similar_plants = (
                plant_data.get(
                    "similar_plants"
                )
            )

            if database_similar_plants:

                related_plants = database_similar_plants

        # ==================================================
        # FINAL RESPONSE
        # ==================================================

        response = {

            # ----------------------------------------------
            # Existing ChloroScan response
            # ----------------------------------------------

            "success": True,

            "type": our_result.get(
                "type"
            ),

            "category": (
                plant_data.get("category")
                if plant_data
                else our_result.get("category")
            ),

            "result": our_result.get(
                "result"
            ),

            # ----------------------------------------------
            # Plant information selected using
            # Pl@ntNet's identification
            # ----------------------------------------------

            "plant_data": plant_data,

            "similar_plants": similar_plants,

            "related_plants": related_plants,

            "classifier_confidence": our_result.get(
                "classifier_confidence"
            ),

            # ----------------------------------------------
            # NEW HYBRID IDENTIFICATION
            # ----------------------------------------------

            "identification": identification,

            # ----------------------------------------------
            # Pl@ntNet raw result
            #
            # Keep this for now while developing.
            # We can clean the response later.
            # ----------------------------------------------

            "plantnet": plantnet_result
        }

        return response

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e)
            }
        )

    finally:

        # ==================================================
        # DELETE TEMPORARY IMAGE
        # ==================================================

        if os.path.exists(
            file_path
        ):

            os.remove(
                file_path
            )


@router.get("/plant/{model_name}")
def get_plant_details(
    model_name: str
):

    plant = get_plant_by_model_name(
        model_name
    )

    if not plant:

        raise HTTPException(
            status_code=404,
            detail="Plant not found"
        )

    return plant


@router.get("/plants/search")
def search(
    query: str = Query(...),
    user=Depends(get_current_user)
):

    return search_plants(
        query,
        user.id
    )
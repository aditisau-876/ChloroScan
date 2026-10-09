import os
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse

from backend.services.plantnet_service import identify_with_plantnet


router = APIRouter()


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/plantnet/test")
async def test_plantnet(file: UploadFile = File(...)):

    if not file.content_type or not file.content_type.startswith("image/"):

        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Only image files are allowed"
            }
        )

    filename = f"{uuid.uuid4()}.jpg"

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    try:

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        result = await identify_with_plantnet(
            file_path
        )

        return result

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e)
            }
        )

    finally:

        if os.path.exists(file_path):

            os.remove(file_path)
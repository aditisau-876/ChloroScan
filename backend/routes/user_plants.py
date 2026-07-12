from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.database import get_db
from backend.utils.dependencies import get_current_user
router = APIRouter(prefix="/myplants", tags=["My Plants"])


@router.get("/")
def get_my_plants(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    rows = db.execute(text("""
        SELECT
            p.id,
            p.model_name,
            p.plant_name,
            p.scientific_name,
            p.image_url
        FROM user_plants up
        JOIN plants p
            ON up.plant_id=p.id
        WHERE up.user_id=:user_id
        ORDER BY up.created_at DESC
    """),{
        "user_id":user.id
    }).fetchall()

    return [dict(row._mapping) for row in rows]

@router.get("/check/{plant_id}")
def check_plant(
    plant_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    row = db.execute(
        text("""
            SELECT 1
            FROM user_plants
            WHERE user_id=:user_id
            AND plant_id=:plant_id
        """),
        {"user_id": user.id, "plant_id": plant_id
        }
    ).fetchone()
    return {
        "added": row is not None
    }

@router.post("/{plant_id}")
def add_plant(
    plant_id:int,
    db:Session=Depends(get_db),
    user=Depends(get_current_user)
):

    db.execute(text("""
        INSERT INTO user_plants(user_id,plant_id)
        VALUES(:user_id,:plant_id)
        ON CONFLICT(user_id,plant_id)
        DO NOTHING

    """),{"user_id":user.id, "plant_id":plant_id
    })
    db.commit()

    return {"message":"Plant added"}


@router.delete("/{plant_id}")
def remove_plant(
    plant_id:int,
    db:Session=Depends(get_db),
    user=Depends(get_current_user)
):

    db.execute(text("""
        DELETE FROM user_plants
        WHERE
        user_id=:user_id
        AND
        plant_id=:plant_id
    """),{
        "user_id":user.id, "plant_id":plant_id
    })
    db.commit()

    return {"message":"Removed"}
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.utils.dependencies import get_current_user

from backend.schemas.reminder_schema import ReminderCreate, ReminderResponse
from backend.services.reminder_service import (
    create_reminder,
    get_user_reminders,
    delete_reminder
)

router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"]
)


@router.post("/", response_model=ReminderResponse)
def add_reminder(
    reminder: ReminderCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return create_reminder(
        db,
        user.id,
        reminder
    )


@router.get("/", response_model=list[ReminderResponse])
def get_reminders(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return get_user_reminders(
        db,
        user.id
    )


@router.delete("/{reminder_id}")
def remove_reminder(
    reminder_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    reminder = delete_reminder(
        db,
        reminder_id,
        user.id
    )

    if reminder:
        return {
            "message": "Reminder deleted successfully"
        }

    return {
        "message": "Reminder not found"
    }
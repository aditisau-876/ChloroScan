from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import case
from backend.database import get_db
from backend.utils.dependencies import get_current_user
from backend.models.reminder_model import Reminder
from backend.schemas.reminder_schema import ReminderCreate, ReminderResponse
from backend.services.reminder_service import (create_reminder,get_user_reminders,delete_reminder, complete_reminder)

router = APIRouter(prefix="/reminders",tags=["Reminders"])


@router.post("/", response_model=ReminderResponse)
def add_reminder(reminder: ReminderCreate,db: Session = Depends(get_db),user=Depends(get_current_user)):
    return create_reminder(db,user.id,reminder
    )

@router.get("/", response_model=list[ReminderResponse])
def get_reminders(db: Session = Depends(get_db),user=Depends(get_current_user)):
    return get_user_reminders(db,user.id)


@router.delete("/{reminder_id}")
def remove_reminder(reminder_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    reminder = delete_reminder(db, reminder_id, user.id)
    if reminder:
        return {"message": "Reminder deleted successfully"}
    return {"message": "Reminder not found"}

@router.put("/{reminder_id}/complete")
def mark_complete(
    reminder_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    reminder = complete_reminder(
        db,
        reminder_id,
        user.id
    )

    if not reminder:
        raise HTTPException(
            status_code=404,
            detail="Reminder not found"
        )

    return reminder

@router.get("/dashboard")
def dashboard_reminder(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    priority_order = case(
        (Reminder.priority == "High", 1),
        (Reminder.priority == "Medium", 2),
        (Reminder.priority == "Low", 3),
        else_=4
    )

    reminder = ( db.query(Reminder)
        .filter(Reminder.user_id == user.id, Reminder.is_completed == False)
        .order_by(priority_order, Reminder.reminder_date, Reminder.reminder_time)
        .first()
    )

    return reminder
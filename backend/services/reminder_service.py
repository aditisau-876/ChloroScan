from sqlalchemy.orm import Session
from backend.models.reminder_model import Reminder
from backend.schemas.reminder_schema import ReminderCreate


def create_reminder(
    db: Session,
    user_id: int,
    reminder: ReminderCreate
):
    new_reminder = Reminder(
        user_id=user_id,
        plant_name=reminder.plant_name,
        reminder_type=reminder.reminder_type,
        reminder_date=reminder.reminder_date,
        reminder_time=reminder.reminder_time,
        repeat_type=reminder.repeat_type,
        priority=reminder.priority,
        notes=reminder.notes
    )

    db.add(new_reminder)
    db.commit()
    db.refresh(new_reminder)

    return new_reminder


def get_user_reminders(
    db: Session,
    user_id: int
):
    return (
        db.query(Reminder)
        .filter(Reminder.user_id == user_id)
        .order_by(Reminder.reminder_date, Reminder.reminder_time)
        .all()
    )


def delete_reminder(
    db: Session,
    reminder_id: int,
    user_id: int
):
    reminder = (
        db.query(Reminder)
        .filter(
            Reminder.id == reminder_id,
            Reminder.user_id == user_id
        )
        .first()
    )

    if reminder:
        db.delete(reminder)
        db.commit()

    return reminder
from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional


class ReminderCreate(BaseModel):
    plant_name: str
    reminder_type: str
    reminder_date: date
    reminder_time: time
    repeat_type: str
    priority: str
    notes: Optional[str] = None


class ReminderResponse(BaseModel):
    id: int
    plant_name: str
    reminder_type: str
    reminder_date: date
    reminder_time: time
    repeat_type: str
    priority: str
    notes: Optional[str]
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
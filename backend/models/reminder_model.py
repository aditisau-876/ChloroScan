from sqlalchemy import Column, Integer, String, Date, Time, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from backend.database import Base


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    plant_name = Column(String, nullable=False)

    reminder_type = Column(String, nullable=False)

    reminder_date = Column(Date, nullable=False)

    reminder_time = Column(Time, nullable=False)

    repeat_type = Column(
        String,
        default="none"
    )

    priority = Column(
        String,
        default="Medium"
    )

    notes = Column(Text)

    is_completed = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
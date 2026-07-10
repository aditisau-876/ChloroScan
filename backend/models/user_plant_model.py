from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from backend.database import Base


class UserPlant(Base):
    __tablename__ = "user_plants"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
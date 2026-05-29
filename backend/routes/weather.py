from fastapi import APIRouter
from services.weather_service import get_weather

router = APIRouter()
@router.get("/weather/{lat}/{lon}")
def weather(lat: float, lon: float):
    return get_weather(lat, lon)
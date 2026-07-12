from fastapi import APIRouter
from backend.services.weather_service import get_weather
from sqlalchemy.orm import Session
from fastapi import Depends
from backend.database import get_db
from backend.ml.services.plant_service import get_recommended_plants

router = APIRouter()
@router.get("/weather/{lat}/{lon}")
def weather(lat: float, lon: float):
    return get_weather(lat, lon)

@router.get("/weather-advice/{lat}/{lon}")
async def weather_advice(lat: float, lon: float):

    weather = get_weather(lat, lon)
    temp = weather["temperature"]
    humidity = weather["humidity"]
    condition = weather["weather"].lower()

    if condition in ["rain", "drizzle", "thunderstorm"]:
        advice = {"icon": "🌧","title": "Rain Expected","message": "Skip watering outdoor plants today."}

    elif temp >= 35:
        advice = {"icon": "☀","title": "Hot Weather","message": "Water plants early morning or after sunset."}

    elif humidity >= 80:
        advice = {"icon": "💧","title": "High Humidity","message": "Check the soil before watering. Plants may need less water."}

    elif temp <= 15:
        advice = {"icon": "❄","title": "Cool Weather","message": "Reduce watering frequency today."}

    else:
        advice = {"icon": "🌿","title": "Normal Conditions","message": "Follow your regular watering schedule."}

    return advice

@router.get("/recommended-plants/{lat}/{lon}")
def recommended_plants(lat: float, lon: float):
    weather = get_weather(lat, lon)
    plants = get_recommended_plants(weather["temperature"],weather["humidity"])

    return plants
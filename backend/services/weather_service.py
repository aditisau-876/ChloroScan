import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(lat, lon):

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={lat}"
        f"&lon={lon}"
        f"&appid={API_KEY}"
        f"&units=metric"
    )
    response = requests.get(url)
    data = response.json()
    if response.status_code != 200:
        return {"success": False }

    return {
        "success": True,
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "weather": data["weather"][0]["main"],
        "description": data["weather"][0]["description"]
    }
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.auth import router as auth_router
from backend.routes.plant import router as plant_router
from backend.routes.weather import router as weather_router
from backend.routes.user_plants import router as user_plants_router
from backend.routes.reminder import router as reminder_router
app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","https://chloroscan-1-ciqc.onrender.com"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"],)

app.include_router(auth_router)
app.include_router(plant_router)
app.include_router(weather_router)
app.include_router(user_plants_router)
app.include_router(reminder_router)
@app.get("/")
def home():
    return {"message": "Backend running"}

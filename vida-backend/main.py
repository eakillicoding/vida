from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define healthy ranges
healthy_ranges = {
    "weight": (144, 194),
    "calories": (2500, 3000),
    "water": (10, 15),
    "sleep": (7, 9),
    "steps": (8000, 12000)
}

# Load trained ML model
model = joblib.load("vida_decision_tree_model.pkl")

class UserData(BaseModel):
    weight: float
    calories: int
    water: int
    sleep: float
    steps: int
    comfort_level: str  # New field: "Comfortable" or "Uncomfortable"

@app.post("/health-status")
def get_health_status(user_data: UserData):
    # Run ML model prediction
    user_input = np.array([[user_data.weight, user_data.calories, user_data.water, user_data.sleep, user_data.steps]])
    prediction = model.predict(user_input)[0]
    health_status = "Healthy" if prediction == 1 else "Unhealthy"

    # Identify problem areas
    issues = []
    for key, (low, high) in healthy_ranges.items():
        if not (low <= getattr(user_data, key) <= high):
            issues.append(f"{key.capitalize()} should be between {low}-{high}.")

    return {
        "health_status": health_status,
        "comfort_level": user_data.comfort_level,  # Include comfort level in response
        "issues": issues if issues else ["No issues detected!"]
    }

@app.get("/")
def home():
    return {"message": "Welcome to Vida API"}
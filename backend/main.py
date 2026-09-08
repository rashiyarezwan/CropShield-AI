from pathlib import Path

import numpy as np
import tensorflow as tf

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import io


# ---------------------------------
# Configuration
# ---------------------------------

MODEL_PATH = Path("model/saved/crop_disease_model.keras")
IMG_SIZE = (224, 224)

CLASS_NAMES = [
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___healthy",
]


# ---------------------------------
# Load CNN
# ---------------------------------

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found: {MODEL_PATH}"
    )

model = tf.keras.models.load_model(MODEL_PATH)


# ---------------------------------
# FastAPI application
# ---------------------------------

app = FastAPI(
    title="CropShield AI",
    description="AI-powered crop disease diagnosis API",
    version="1.0.0",
)


# ---------------------------------
# CORS
# ---------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://crop-shield-ai-six.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------
# Health check
# ---------------------------------

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "CropShield AI",
        "model": "MobileNetV2",
        "classes": CLASS_NAMES,
    }


# ---------------------------------
# Disease prediction
# ---------------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if file.content_type not in [
        "image/jpeg",
        "image/png",
        "image/jpg",
    ]:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG or PNG image."
        )

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = image.resize(IMG_SIZE)

        image_array = np.array(image).astype(
            np.float32
        )

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        predictions = model.predict(
            image_array,
            verbose=0
        )[0]

        predicted_index = int(
            np.argmax(predictions)
        )

        confidence = float(
            predictions[predicted_index]
        )

        predicted_class = CLASS_NAMES[
            predicted_index
        ]

        readable_name = predicted_class.replace(
            "Tomato___",
            ""
        ).replace(
            "_",
            " "
        )

        if confidence < 0.80:
            diagnosis_status = "Needs Expert Review"
        else:
            diagnosis_status = "AI Diagnosis"

        return {
            "success": True,
            "disease": readable_name,
            "class": predicted_class,
            "confidence": round(
                confidence * 100,
                2
            ),
            "status": diagnosis_status,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
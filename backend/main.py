from pathlib import Path
import io

import numpy as np
import tensorflow as tf

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image


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
# FastAPI
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
# Prototype Leaf Image Validation
# ---------------------------------

def validate_leaf_image(image: Image.Image):
    """
    Prototype input gate.

    This does NOT prove that an image is a leaf.
    It checks whether the image contains enough
    vegetation-like pixels before sending it
    to the disease classifier.
    """

    # Resize for fast analysis
    small = image.resize((128, 128)).convert("RGB")

    arr = np.asarray(small).astype(np.float32)

    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]

    # Vegetation-like pixel rule:
    # Green should generally be stronger than red/blue.
    green_pixels = (
        (g > r * 1.05)
        & (g > b * 1.05)
        & (g > 45)
        & (g < 240)
    )

    green_ratio = float(
        np.mean(green_pixels)
    )

    # Basic texture/edge proxy:
    # A crop leaf image normally has some
    # local intensity variation.
    gray = (
        0.299 * r
        + 0.587 * g
        + 0.114 * b
    )

    texture_score = float(
        np.std(gray) / 255.0
    )

    # Prototype thresholds.
    # These are intentionally conservative enough
    # for a quick demo, not a scientific detector.
    looks_like_leaf = (
        green_ratio >= 0.08
        and texture_score >= 0.08
    )

    return {
        "valid": looks_like_leaf,
        "green_ratio": round(
            green_ratio * 100,
            2
        ),
        "texture_score": round(
            texture_score,
            3
        ),
    }


# ---------------------------------
# Health Check
# ---------------------------------

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "CropShield AI",
        "model": "MobileNetV2",
        "classes": CLASS_NAMES,
        "input_validation": "enabled",
    }


# ---------------------------------
# Disease Prediction
# ---------------------------------

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # ---------------------------------
    # Check file type
    # ---------------------------------

    if file.content_type not in [
        "image/jpeg",
        "image/png",
        "image/jpg",
    ]:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG or PNG image.",
        )

    try:

        # ---------------------------------
        # Read image
        # ---------------------------------

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        # ---------------------------------
        # Input validation
        # ---------------------------------

        validation = validate_leaf_image(
            image
        )

        if not validation["valid"]:
            return {
                "success": False,
                "valid_image": False,
                "error_type": "not_leaf",
                "message": (
                    "This image does not appear "
                    "to be a crop leaf. Please "
                    "upload a clear tomato-leaf image."
                ),
                "validation": validation,
            }

        # ---------------------------------
        # Resize
        # ---------------------------------

        image = image.resize(
            IMG_SIZE
        )

        # ---------------------------------
        # NumPy conversion
        # ---------------------------------

        image_array = np.array(
            image
        ).astype(
            np.float32
        )

        # ---------------------------------
        # Batch dimension
        # ---------------------------------

        image_array = np.expand_dims(
            image_array,
            axis=0,
        )

        # ---------------------------------
        # Prediction
        # ---------------------------------

        predictions = model.predict(
            image_array,
            verbose=0,
        )[0]

        # ---------------------------------
        # Best class
        # ---------------------------------

        predicted_index = int(
            np.argmax(predictions)
        )

        confidence = float(
            predictions[
                predicted_index
            ]
        )

        predicted_class = (
            CLASS_NAMES[
                predicted_index
            ]
        )

        # ---------------------------------
        # Readable name
        # ---------------------------------

        readable_name = (
            predicted_class
            .replace(
                "Tomato___",
                ""
            )
            .replace(
                "_",
                " "
            )
        )

        # ---------------------------------
        # Confidence
        # ---------------------------------

        if confidence < 0.80:
            diagnosis_status = (
                "Needs Expert Review"
            )
        else:
            diagnosis_status = (
                "AI Diagnosis"
            )

        # ---------------------------------
        # Return result
        # ---------------------------------

        return {
            "success": True,
            "valid_image": True,
            "disease": readable_name,
            "class": predicted_class,
            "confidence": round(
                confidence * 100,
                2,
            ),
            "status": diagnosis_status,
            "validation": validation,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )
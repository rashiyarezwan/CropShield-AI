from pathlib import Path
import io

import numpy as np
import tensorflow as tf

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image


# =========================================================
# CONFIGURATION
# =========================================================

MODEL_PATH = Path(
    "model/saved/crop_disease_model.keras"
)

IMG_SIZE = (224, 224)

CLASS_NAMES = [
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___healthy",
]


# =========================================================
# LOAD MODEL
# =========================================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found: {MODEL_PATH}"
    )

model = tf.keras.models.load_model(
    MODEL_PATH
)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="CropShield AI",
    description="AI-powered crop disease diagnosis API",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

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


# =========================================================
# CROP-LEAF INPUT VALIDATION
# =========================================================

def validate_leaf_image(
    image: Image.Image,
):
    """
    Prototype input-validation gate.

    This checks whether the image has enough
    vegetation-like characteristics before the
    disease classifier is used.

    NOTE:
    This is a prototype safeguard, not a trained
    leaf/non-leaf classification model.
    """

    # Resize for faster processing
    small_image = image.resize(
        (128, 128)
    ).convert("RGB")

    # Convert to numpy
    arr = np.asarray(
        small_image
    ).astype(np.float32)

    # RGB channels
    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]

    # -----------------------------------------------------
    # GREEN PIXEL TEST
    # -----------------------------------------------------

    green_pixels = (
        (g > r * 1.05)
        & (g > b * 1.05)
        & (g > 45)
        & (g < 245)
    )

    green_ratio = float(
        np.mean(green_pixels)
    )

    # -----------------------------------------------------
    # SATURATION TEST
    # -----------------------------------------------------

    max_channel = np.max(
        arr,
        axis=2,
    )

    min_channel = np.min(
        arr,
        axis=2,
    )

    saturation = (
        max_channel - min_channel
    ) / 255.0

    mean_saturation = float(
        np.mean(saturation)
    )

    # -----------------------------------------------------
    # IMAGE TEXTURE TEST
    # -----------------------------------------------------

    gray = (
        0.299 * r
        + 0.587 * g
        + 0.114 * b
    )

    texture_score = float(
        np.std(gray) / 255.0
    )

    # -----------------------------------------------------
    # BRIGHTNESS TEST
    # -----------------------------------------------------

    brightness = float(
        np.mean(gray) / 255.0
    )

    # -----------------------------------------------------
    # PROTOTYPE DECISION
    # -----------------------------------------------------

    looks_like_leaf = (
        green_ratio >= 0.08
        and mean_saturation >= 0.08
        and texture_score >= 0.07
        and brightness >= 0.10
        and brightness <= 0.95
    )

    return {
        "valid": bool(
            looks_like_leaf
        ),

        "green_ratio": round(
            green_ratio * 100,
            2,
        ),

        "saturation": round(
            mean_saturation,
            3,
        ),

        "texture_score": round(
            texture_score,
            3,
        ),

        "brightness": round(
            brightness,
            3,
        ),
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "CropShield AI",
        "model": "MobileNetV2",
        "classes": CLASS_NAMES,
        "input_validation": "enabled",
    }


# =========================================================
# DISEASE PREDICTION
# =========================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # -----------------------------------------------------
    # FILE TYPE CHECK
    # -----------------------------------------------------

    if file.content_type not in [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
    ]:
        raise HTTPException(
            status_code=400,
            detail=(
                "Please upload a JPG, PNG, "
                "or WEBP image."
            ),
        )

    try:

        # -------------------------------------------------
        # READ UPLOADED FILE
        # -------------------------------------------------

        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty.",
            )

        # -------------------------------------------------
        # OPEN IMAGE
        # -------------------------------------------------

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        # -------------------------------------------------
        # INPUT VALIDATION
        # -------------------------------------------------

        validation = validate_leaf_image(
            image
        )

        # -------------------------------------------------
        # REJECT OBVIOUSLY IRRELEVANT IMAGE
        # -------------------------------------------------

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

        # -------------------------------------------------
        # RESIZE FOR CNN
        # -------------------------------------------------

        image = image.resize(
            IMG_SIZE
        )

        # -------------------------------------------------
        # NUMPY CONVERSION
        # -------------------------------------------------

        image_array = np.array(
            image
        ).astype(
            np.float32
        )

        # -------------------------------------------------
        # ADD BATCH DIMENSION
        # -------------------------------------------------

        image_array = np.expand_dims(
            image_array,
            axis=0,
        )

        # -------------------------------------------------
        # MODEL PREDICTION
        # -------------------------------------------------

        predictions = model.predict(
            image_array,
            verbose=0,
        )[0]

        # -------------------------------------------------
        # BEST CLASS
        # -------------------------------------------------

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

        # -------------------------------------------------
        # READABLE DISEASE NAME
        # -------------------------------------------------

        readable_name = (
            predicted_class
            .replace(
                "Tomato___",
                "",
            )
            .replace(
                "_",
                " ",
            )
        )

        # -------------------------------------------------
        # CONFIDENCE STATUS
        # -------------------------------------------------

        if confidence < 0.80:
            diagnosis_status = (
                "Needs Expert Review"
            )
        else:
            diagnosis_status = (
                "AI Diagnosis"
            )

        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

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

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                f"Prediction failed: {str(e)}"
            ),
        )
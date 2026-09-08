import tensorflow as tf
from pathlib import Path

DATASET_DIR = Path("dataset/tomato")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

# Load the same validation split used during training
val_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

# Load trained model
model = tf.keras.models.load_model(
    "model/saved/crop_disease_model.keras"
)

# Evaluate
loss, accuracy = model.evaluate(val_ds, verbose=1)

print("\n🌱 MODEL EVALUATION")
print("-------------------------")
print(f"Validation Accuracy: {accuracy * 100:.2f}%")
print(f"Validation Loss: {loss:.4f}")
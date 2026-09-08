from pathlib import Path
import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# -----------------------------
# Settings
# -----------------------------
DATASET_DIR = Path("dataset/tomato")
MODEL_PATH = "model/saved/crop_disease_model.keras"

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

# -----------------------------
# Find classes and images
# -----------------------------
class_names = sorted([
    p.name for p in DATASET_DIR.iterdir()
    if p.is_dir()
])

file_paths = []
labels = []

for label, class_name in enumerate(class_names):
    class_dir = DATASET_DIR / class_name

    for file in class_dir.glob("*"):
        if file.suffix.lower() in [".jpg", ".jpeg", ".png"]:
            file_paths.append(str(file))
            labels.append(label)

# -----------------------------
# SAME STRATIFIED SPLIT
# -----------------------------
_, val_paths, _, val_labels = train_test_split(
    file_paths,
    labels,
    test_size=0.20,
    random_state=SEED,
    stratify=labels
)

print(f"Validation images: {len(val_paths)}")

print("\nValidation distribution:")
for i, class_name in enumerate(class_names):
    print(f"{class_name}: {val_labels.count(i)}")

# -----------------------------
# Load images
# -----------------------------
def load_image(path):
    image = tf.io.read_file(path)
    image = tf.image.decode_image(
        image,
        channels=3,
        expand_animations=False
    )
    image = tf.image.resize(image, IMG_SIZE)
    image = tf.cast(image, tf.float32)
    return image


# -----------------------------
# Create validation dataset
# -----------------------------
images = []

for path in val_paths:
    images.append(load_image(path))

X_val = tf.stack(images)
y_val = np.array(val_labels)

# -----------------------------
# Load trained model
# -----------------------------
model = tf.keras.models.load_model(MODEL_PATH)

# -----------------------------
# Predictions
# -----------------------------
predictions = model.predict(
    X_val,
    batch_size=BATCH_SIZE,
    verbose=1
)

y_pred = np.argmax(predictions, axis=1)

# -----------------------------
# Classification Report
# -----------------------------
print("\n🌱 CLASSIFICATION REPORT")
print("========================")

print(
    classification_report(
        y_val,
        y_pred,
        labels=list(range(len(class_names))),
        target_names=class_names,
        zero_division=0
    )
)

# -----------------------------
# Confusion Matrix
# -----------------------------
print("\n🌱 CONFUSION MATRIX")
print("===================")

cm = confusion_matrix(
    y_val,
    y_pred,
    labels=list(range(len(class_names)))
)

print(cm)

# -----------------------------
# Final accuracy
# -----------------------------
accuracy = np.mean(y_val == y_pred)

print("\n🌱 FINAL VALIDATION ACCURACY")
print("============================")
print(f"{accuracy * 100:.2f}%")
import tensorflow as tf
import numpy as np
from pathlib import Path
from sklearn.metrics import confusion_matrix, classification_report
from PIL import Image

DATASET_DIR = Path("dataset/tomato")
IMG_SIZE = (224, 224)

CLASS_NAMES = [
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___healthy"
]

MODEL_PATH = "model/saved/crop_disease_model.keras"

model = tf.keras.models.load_model(MODEL_PATH)

y_true = []
y_pred = []

print("\n🌱 EVALUATING ALL 4 CLASSES")
print("-----------------------------")

for class_index, class_name in enumerate(CLASS_NAMES):

    class_dir = DATASET_DIR / class_name
    image_files = list(class_dir.glob("*"))

    print(f"{class_name}: {len(image_files)} images")

    # Use up to 200 images from each class
    image_files = image_files[:200]

    for image_path in image_files:

        try:
            image = Image.open(image_path).convert("RGB")
            image = image.resize(IMG_SIZE)

            image_array = np.array(image, dtype=np.float32)
            image_array = np.expand_dims(image_array, axis=0)

            prediction = model.predict(image_array, verbose=0)[0]
            predicted_class = int(np.argmax(prediction))

            y_true.append(class_index)
            y_pred.append(predicted_class)

        except Exception as e:
            print(f"Skipping {image_path}: {e}")

y_true = np.array(y_true)
y_pred = np.array(y_pred)

# Confusion matrix
cm = confusion_matrix(
    y_true,
    y_pred,
    labels=np.arange(len(CLASS_NAMES))
)

print("\n📊 CONFUSION MATRIX")
print("-----------------------------")
print("Rows = Actual")
print("Columns = Predicted\n")

print("                         Early  Late  LeafMold Healthy")

for i, row in enumerate(cm):
    print(f"{CLASS_NAMES[i]:25} {row}")

# Classification report
print("\n📋 CLASS-WISE PERFORMANCE")
print("-----------------------------")

print(
    classification_report(
        y_true,
        y_pred,
        labels=np.arange(len(CLASS_NAMES)),
        target_names=CLASS_NAMES,
        digits=4,
        zero_division=0
    )
)

# Overall accuracy
accuracy = np.mean(y_true == y_pred)

print("\n🎯 OVERALL ACCURACY")
print("-----------------------------")
print(f"{accuracy * 100:.2f}%")
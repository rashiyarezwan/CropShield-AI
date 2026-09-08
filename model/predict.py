import tensorflow as tf
from PIL import Image
import numpy as np

# Load trained model
model = tf.keras.models.load_model(
    "model/saved/crop_disease_model.keras"
)

# Classes used during training
class_names = [
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___healthy"
]

# Test image
image_path = "test_images/tomato-early-blight1x2400.jpg"

# Load and prepare image
image = Image.open(image_path).convert("RGB")
image = image.resize((224, 224))

image_array = np.array(image)
image_array = np.expand_dims(image_array, axis=0)

# Make prediction
predictions = model.predict(image_array, verbose=0)

predicted_index = np.argmax(predictions[0])
predicted_class = class_names[predicted_index]
confidence = predictions[0][predicted_index] * 100

print("\n🌱 CROP HEALTH DIAGNOSIS")
print("-------------------------")
print("Prediction:", predicted_class)
print(f"Confidence: {confidence:.2f}%")

print("\nAll predictions:")
for name, probability in zip(class_names, predictions[0]):
    print(f"{name}: {probability * 100:.2f}%")
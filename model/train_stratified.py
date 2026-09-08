from pathlib import Path
import tensorflow as tf
from sklearn.model_selection import train_test_split

# -----------------------------
# Settings
# -----------------------------
DATASET_DIR = Path("dataset/tomato")
MODEL_PATH = "model/saved/crop_disease_model.keras"

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
SEED = 42

# -----------------------------
# Find images and labels
# -----------------------------
class_names = sorted([p.name for p in DATASET_DIR.iterdir() if p.is_dir()])

file_paths = []
labels = []

for label, class_name in enumerate(class_names):
    class_dir = DATASET_DIR / class_name

    for file in class_dir.glob("*"):
        if file.suffix.lower() in [".jpg", ".jpeg", ".png"]:
            file_paths.append(str(file))
            labels.append(label)

print("\nClasses:")
for i, name in enumerate(class_names):
    print(i, name)

print("\nTotal images:", len(file_paths))

# -----------------------------
# STRATIFIED SPLIT
# -----------------------------
train_paths, val_paths, train_labels, val_labels = train_test_split(
    file_paths,
    labels,
    test_size=0.20,
    random_state=SEED,
    stratify=labels
)

print("\nTraining images:", len(train_paths))
print("Validation images:", len(val_paths))

# -----------------------------
# Show validation distribution
# -----------------------------
print("\nValidation distribution:")

for i, class_name in enumerate(class_names):
    count = val_labels.count(i)
    print(f"{class_name}: {count}")

# -----------------------------
# Image loading function
# -----------------------------
def load_image(path, label):
    image = tf.io.read_file(path)
    image = tf.image.decode_image(
        image,
        channels=3,
        expand_animations=False
    )
    image = tf.image.resize(image, IMG_SIZE)
    image = tf.cast(image, tf.float32)

    return image, label


# -----------------------------
# Create datasets
# -----------------------------
train_ds = tf.data.Dataset.from_tensor_slices(
    (train_paths, train_labels)
)

val_ds = tf.data.Dataset.from_tensor_slices(
    (val_paths, val_labels)
)

train_ds = train_ds.shuffle(
    len(train_paths),
    seed=SEED
)

train_ds = train_ds.map(
    load_image,
    num_parallel_calls=tf.data.AUTOTUNE
)

val_ds = val_ds.map(
    load_image,
    num_parallel_calls=tf.data.AUTOTUNE
)

train_ds = train_ds.batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
val_ds = val_ds.batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

# -----------------------------
# Data augmentation
# -----------------------------
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.15),
    tf.keras.layers.RandomZoom(0.15),
])

# -----------------------------
# MobileNetV2
# -----------------------------
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

# -----------------------------
# Model
# -----------------------------
inputs = tf.keras.Input(shape=(224, 224, 3))

x = data_augmentation(inputs)

x = tf.keras.applications.mobilenet_v2.preprocess_input(x)

x = base_model(x, training=False)

x = tf.keras.layers.GlobalAveragePooling2D()(x)

x = tf.keras.layers.Dropout(0.3)(x)

outputs = tf.keras.layers.Dense(
    len(class_names),
    activation="softmax"
)(x)

model = tf.keras.Model(inputs, outputs)

# -----------------------------
# Compile
# -----------------------------
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# -----------------------------
# Train
# -----------------------------
print("\nStarting training...\n")

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# -----------------------------
# Save
# -----------------------------
Path("model/saved").mkdir(
    parents=True,
    exist_ok=True
)

model.save(MODEL_PATH)

print("\nModel saved successfully!")
print(MODEL_PATH)
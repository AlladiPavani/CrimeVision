from flask import Flask, render_template, request
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)

# Path to your SavedModel folder
MODEL_PATH = 'crime_savedmodel'

# Load the SavedModel using TFSMLayer (Keras 3 compatible)
model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=(64, 64, 3)),
    tf.keras.layers.TFSMLayer(MODEL_PATH, call_endpoint='serve')
])

# Updated class labels
class_labels = [
    'Abuse', 'Arson', 'Assault', 'Burglary', 'Drugs', 'Fraud', 
    'Homicide', 'Kidnapping', 'Robbery', 'Shooting', 'Shoplifting', 
    'Terrorism', 'Vandalism', 'Other'
]

# Home route
@app.route('/')
def home():
    return render_template('home.html')

# Predict route
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    prediction = None
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('predict.html', prediction="No file uploaded.")
        
        file = request.files['file']
        if file.filename == '':
            return render_template('predict.html', prediction="No file selected.")

        # Open the uploaded image
        img = Image.open(file).convert('RGB')
        img = img.resize((64, 64))
        img_array = np.array(img) / 255.0  # Normalize
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make prediction
        preds = model.predict(img_array)
        pred_index = np.argmax(preds)
        prediction = class_labels[pred_index]

    return render_template('predict.html', prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import cv2
import numpy as np
import pickle
from moviepy.editor import VideoFileClip
from werkzeug.utils import secure_filename


# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Directories for storing files
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "output"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Load AI model for color correction at startup
MODEL_PATH = "models/color_correction.pkl"
with open(MODEL_PATH, "rb") as model_file:
    color_correction_model = pickle.load(model_file)

def apply_color_correction(frame):
    """Apply AI-based color correction to a single frame."""
    frame = frame.astype('float32') / 255.0  # Normalize
    corrected_frame = color_correction_model.predict(np.expand_dims(frame, axis=0))[0]
    corrected_frame = (corrected_frame * 255).astype('uint8')  # Convert back to uint8
    return corrected_frame

def process_video(input_path, output_path):
    """Process video with AI-based color correction using OpenCV and MoviePy."""
    video_clip = VideoFileClip(input_path)  # Load video using VideoFileClip
    fps = video_clip.fps
    width, height = video_clip.size
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    for frame in video_clip.iter_frames(fps=fps, dtype='uint8'):
        corrected_frame = apply_color_correction(frame)
        out.write(corrected_frame)
    
    out.release()
    video_clip.close()

    """Process video with AI-based color correction using OpenCV and MoviePy."""
    cap = cv2.VideoCapture(input_path)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        corrected_frame = apply_color_correction(frame)
        out.write(corrected_frame)
    
    cap.release()
    out.release()
    
    return output_path

@app.route("/color-correct", methods=["POST"])
def color_correct():
    """Endpoint to apply AI-based color correction on a video."""
    if 'video' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['video']
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(OUTPUT_FOLDER, "corrected_" + filename)
    file.save(input_path)
    
    # Apply color correction
    processed_file = process_video(input_path, output_path)
    
    return jsonify({
        "message": "Color correction applied successfully",
        "download_url": f"/download?filename={os.path.basename(processed_file)}"
    })

@app.route("/download", methods=["GET"])
def download():
    """Endpoint to download processed video."""
    filename = request.args.get("filename")
    filepath = os.path.join(OUTPUT_FOLDER, filename)
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404
    return send_file(filepath, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)

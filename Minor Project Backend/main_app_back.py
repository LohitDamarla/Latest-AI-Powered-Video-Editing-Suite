from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai

import os
import cv2
import numpy as np
# import pickle
import torch
import librosa
import random
from moviepy.editor import VideoFileClip, concatenate_videoclips
from moviepy.video.fx import resize
from moviepy.video.fx import fadein, fadeout
from werkzeug.utils import secure_filename
from facenet_pytorch import MTCNN  # Keeping this import as it is used
from torchvision import models, transforms

# Initialize Flask app
app = Flask(__name__)

# Adjust the port if needed
CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers=["Content-Type", "Authorization"])

# Directories
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "output"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Load object detection model
mtcnn = MTCNN()
model = models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

@app.route("/download", methods=["GET"])
def download():
    filename = request.args.get("filename")
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({"error": "File not found"}), 404

def apply_color_correction(frame):
    """Applies histogram-based color correction."""
    lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.equalizeHist(l)
    corrected_frame = cv2.merge((l, a, b))
    return cv2.cvtColor(corrected_frame, cv2.COLOR_LAB2BGR)

def process_video(input_path, output_path):
    """Processes video for color correction."""
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

openai.api_key = "your-openai-api-key"

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handles video file uploads and sends it to OpenAI API."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Send file to OpenAI API (Example: Transcription)
    try:
        response = openai.Audio.transcribe("whisper-1", open(file_path, "rb"))
        transcript = response["text"]

        return jsonify({
            "file_url": f"http://localhost:5001/{file_path}",
            "transcript": transcript
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/color-correct", methods=["POST"])
def color_correct():
    """Applies AI-based color correction to the uploaded video."""
    if 'video' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['video']
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(OUTPUT_FOLDER, "corrected_" + filename)
    file.save(input_path)

    processed_file = process_video(input_path, output_path)
    if not os.path.exists(processed_file):
        return jsonify({"error": "Processing failed"}), 500

    return jsonify({
        "message": "Color correction applied successfully",
        "download_url": f"/download?filename={os.path.basename(processed_file)}"
    })

@app.route("/content_analysis", methods=["POST"])
def content_analysis():
    """Analyzes video for object detection, face detection, and speech presence."""
    if 'video' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['video']
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    clip = VideoFileClip(input_path)
    cap = cv2.VideoCapture(input_path)
    frame_rate = int(cap.get(cv2.CAP_PROP_FPS))
    
    if clip.audio:
        audio_path = "temp_audio.wav"
        clip.audio.write_audiofile(audio_path)
        y, sr = librosa.load(audio_path, sr=16000)
        envelope = librosa.onset.onset_strength(y=y, sr=sr)
        speech_threshold = np.mean(envelope) * 1.5
    else:
        envelope = None
        speech_threshold = None

    frame_idx, results = 0, []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        timestamp = frame_idx / frame_rate
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        transform = transforms.ToTensor()
        input_tensor = transform(frame_rgb).unsqueeze(0)
        detections = model(input_tensor)[0]
        objects = [i.item() for i, score in zip(detections['labels'].numpy(), detections['scores'].numpy()) if score > 0.6]

        faces, _ = mtcnn.detect(frame_rgb)
        face_count = len(faces) if faces is not None else 0

        speech_detected = False
        if envelope is not None:
            speech_detected = envelope[int(timestamp * len(envelope) / clip.duration)] > speech_threshold

        scene_analysis = "Talking scene" if speech_detected and face_count > 0 else "General scene"

        results.append({
            "timestamp": timestamp,
            "objects_detected": objects,
            "faces_detected": face_count,
            "speech_detected": speech_detected,
            "scene_analysis": scene_analysis
        })
        
        frame_idx += frame_rate * 2
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)

    cap.release()
    return jsonify({"analysis_results": results})

@app.route("/real_time_editing", methods=["POST"])
def real_time_editing():
    """Applies transitions and trims key scenes in real-time editing."""
    if 'video' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['video']
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(OUTPUT_FOLDER, "real_time_" + filename)
    file.save(input_path)

    clip = VideoFileClip(input_path)
    fps = int(clip.fps)
    cap = cv2.VideoCapture(input_path)
    
    trim_points, last_frame = [], None
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        if last_frame is not None:
            motion_score = np.mean(cv2.absdiff(gray, last_frame))
            if motion_score > 15:
                trim_points.append(cap.get(cv2.CAP_PROP_POS_FRAMES) / fps)
        
        last_frame = gray

    cap.release()

    if not trim_points or trim_points[0] != 0:
        trim_points.insert(0, 0)
    if trim_points[-1] != clip.duration:
        trim_points.append(clip.duration)

    trimmed_clips = [clip.subclip(start, end) for start, end in zip(trim_points[:-1], trim_points[1:])]

    processed_clips = []
    transition_types = ["fade", "crossfade", "zoom"]

    for i, clip in enumerate(trimmed_clips):
        transition = random.choice(transition_types)
        if transition == "fade":
            clip = fadein(clip, 0.5)
            clip = fadeout(clip, 0.5)
        elif transition == "zoom":
            clip = clip.fx(resize, 1.05)

        processed_clips.append(clip)

    final_video = concatenate_videoclips(processed_clips, method="compose")
    final_video.write_videofile(output_path, fps=fps)

    return jsonify({
        "message": "Real-time editing applied successfully",
        "download_url": f"/download?filename={os.path.basename(output_path)}"
    })

@app.route("/")
def home():
    return "Flask backend is running!", 200


if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5001")
    app.run(debug=True, port=5001)


import tkinter as tk
from tkinter import filedialog
import requests

class VideoEditingTimeline:
    def __init__(self, root):
        self.root = root
        self.root.title("Video Editing Timeline")
        
        # Create main canvas for the timeline
        self.canvas = tk.Canvas(root, bg='gray', height=300, width=800)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        # Tracks
        self.tracks = {"Video": [], "Audio": [], "Text": [], "Effects": []}
        self.create_tracks()
        
        # Buttons for essential functions
        self.add_controls()
    
    def create_tracks(self):
        y_positions = {"Video": 50, "Audio": 100, "Text": 150, "Effects": 200}
        for track, y in y_positions.items():
            self.canvas.create_text(50, y, text=track, fill='white', font=('Arial', 12, 'bold'))
            self.canvas.create_line(100, y, 750, y, fill='white', width=2)
    
    def add_controls(self):
        frame = tk.Frame(self.root)
        frame.pack(side=tk.BOTTOM, fill=tk.X)
        
        add_clip_btn = tk.Button(frame, text="Add Clip", command=self.add_clip)
        add_clip_btn.pack(side=tk.LEFT, padx=5, pady=5)
        
        trim_btn = tk.Button(frame, text="Trim", command=self.trim_clip)
        trim_btn.pack(side=tk.LEFT, padx=5, pady=5)
        
        export_btn = tk.Button(frame, text="Export", command=self.export_video)
        export_btn.pack(side=tk.LEFT, padx=5, pady=5)
    
        upload_btn = tk.Button(frame, text="Upload & Process", command=self.upload_video)
        upload_btn.pack(side=tk.LEFT, padx=5, pady=5)
    
    def upload_video(self):
        file_path = filedialog.askopenfilename(filetypes=[("Video Files", "*.mp4;*.avi;*.mov")])
        if not file_path:
            return

        url = "http://127.0.0.1:5001/color-correct"
        files = {"video": open(file_path, "rb")}

        try:
            response = requests.post(url, files=files)
            response_data = response.json()
            print("Response:", response_data)

            if "download_url" in response_data:
                print("Processed video available at:", response_data["download_url"])
        except Exception as e:
            print("Error uploading video:", e)

    def add_clip(self):
        file_path = filedialog.askopenfilename(filetypes=[("Video Files", "*.mp4;*.avi;*.mov")])
        if file_path:
            self.tracks["Video"].append(file_path)
            print(f"Added clip: {file_path}")
    
    def trim_clip(self):
        print("Trimming functionality to be implemented")
    
    def export_video(self):
        print("Exporting functionality to be implemented")

if __name__ == "__main__":
    root = tk.Tk()
    app = VideoEditingTimeline(root)
    root.mainloop()

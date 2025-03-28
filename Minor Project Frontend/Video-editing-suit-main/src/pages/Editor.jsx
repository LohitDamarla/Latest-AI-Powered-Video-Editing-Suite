import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import Timeline from "@/components/Timeline";
import MediaLibrary from "@/components/MediaLibrary";
import EffectsPanel from "@/components/EffectsPanel";
import ExportPanel from "@/components/ExportPanel";
import Toolbar from "@/components/Toolbar";
import AudioEditor from "@/components/AudioEditor";
import AIEnhancements from "@/components/AIEnhancements";

const VideoEditor = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle media upload
  const handleMediaUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      setSelectedMedia(data.file_url); // Backend should return processed file URL
      setVideoPreview(URL.createObjectURL(file)); // Show a local preview
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProcessVideo = async (endpoint) => {
    if (!selectedMedia) {
      alert("Please upload a video first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("video", selectedMedia);
  
    try {
      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Processing failed");
      }
  
      const data = await response.json();
      
      // Set processed video URL for preview
      setSelectedMedia(`http://localhost:5001/download?filename=${data.download_url.split("=")[1]}`);
  
    } catch (error) {
      console.error("Processing error:", error);
      alert("Processing failed. Please try again.");
    }
  };
  
  // Render Buttons
  <>
    <button onClick={() => handleProcessVideo("color-correct")}>Apply Color Correction</button>
    <button onClick={() => handleProcessVideo("real_time_editing")}>Real-Time Editing</button>
  </>;
  
  return (
    <div className="flex flex-col h-screen bg-[#0D0D0D] text-white">
      {/* Top Toolbar */}
      <Toolbar />

      <div className="flex flex-grow overflow-hidden">
        {/* Left Sidebar - Media Library & Effects */}
        <div className="w-1/6 bg-gray-900 p-2 overflow-auto">
          <MediaLibrary setSelectedMedia={setSelectedMedia} />
          <EffectsPanel />
          {/* Media Upload Button */}
          <input
            type="file"
            accept="video/*"
            className="mt-4"
            onChange={handleMediaUpload}
          />
          {isUploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>

        {/* Center - Video & Audio Editor */}
        <div className="flex flex-col flex-grow p-4">
          {selectedMedia ? (
            <>
              <VideoPlayer src={selectedMedia} />
              <AudioEditor audioFile={selectedMedia} className="mt-4" />
            </>
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a media file to preview
            </div>
          )}
        </div>
           
        {/* Right Sidebar - AI Enhancements & Export */}
        <div className="w-1/6 bg-gray-900 p-2 overflow-auto">
          <AIEnhancements />
          <ExportPanel className="mt-4" />
        </div>
      </div>

      {/* Bottom - Timeline */}
      <div className="h-1/4 bg-gray-800 p-2">
        <Timeline />
      </div>
    </div>
  );
};

export default VideoEditor







// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   MenuIcon,
//   Search,
//   Undo2,
//   Redo2,
//   Play,
//   SkipBack,
//   Volume2,
//   Maximize2,
//   ZoomIn,
//   ZoomOut,
//   SplitSquareHorizontal,
//   Globe,
//   Download,
//   Settings2,
//   HelpCircle,
// } from "lucide-react"
// import Image from "next/image"

// export default function VideoEditor() {
//   const [currentTime, setCurrentTime] = useState("0:00.70")
//   const [totalTime, setTotalTime] = useState("0:18.06")

//   return (
//     <div className="min-h-screen bg-[#1a1b1e] text-white">
//       {/* Top Navigation */}
//       <header className="flex items-center justify-between px-4 h-14 border-b border-gray-800">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" className="text-gray-400">
//             <MenuIcon className="h-5 w-5" />
//           </Button>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20001236-UknqlIHQO2AA0UUf5apf0mobm5aul9.png"
//                 alt="Logo"
//                 width={24}
//                 height={24}
//                 className="opacity-0"
//               />
//             </div>
//             <span className="font-semibold">Clipchamp</span>
//           </div>
//           <div className="h-6 w-px bg-gray-800 mx-2" />
//           <span className="text-gray-400">Untitled video</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="sm" className="gap-2">
//             <Globe className="h-4 w-4" />
//             Upgrade
//           </Button>
//           <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
//             <Download className="h-4 w-4" />
//             Export
//           </Button>
//           <Button variant="ghost" size="icon">
//             <Settings2 className="h-5 w-5" />
//           </Button>
//           <Button variant="ghost" size="icon">
//             <HelpCircle className="h-5 w-5" />
//           </Button>
//           <div className="w-8 h-8 rounded-full bg-gray-700" />
//         </div>
//       </header>

//       <div className="flex h-[calc(100vh-3.5rem)]">
//         {/* Left Sidebar */}
//         <div className="w-72 border-r border-gray-800 flex flex-col">
//           <div className="p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               <Input placeholder="Search transitions" className="pl-9 bg-gray-900 border-gray-800" />
//             </div>
//           </div>

//           <div className="p-4 border-t border-gray-800">
//             <h3 className="font-medium mb-4">Add transitions</h3>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="text-sm text-gray-400 mb-2">Fades & blurs</h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {Array.from({ length: 4 }).map((_, i) => (
//                     <div key={i} className="aspect-video bg-gray-800 rounded overflow-hidden" />
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h4 className="text-sm text-gray-400 mb-2">Wipes</h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {Array.from({ length: 6 }).map((_, i) => (
//                     <div key={i} className="aspect-video bg-gray-800 rounded overflow-hidden" />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex items-center justify-between">
//             <div className="flex gap-2">
//               <Button variant="ghost" size="icon">
//                 <Undo2 className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Redo2 className="h-4 w-4" />
//               </Button>
//             </div>
//             <Button variant="secondary" size="sm">
//               Size
//             </Button>
//           </div>

//           {/* Video Preview */}
//           <div className="flex-1 bg-black p-4 flex items-center justify-center">
//             <div className="aspect-video w-full max-w-4xl bg-gray-900 rounded-lg relative">
//               <div className="absolute bottom-0 left-0 right-0 p-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-4">
//                     <Button variant="ghost" size="icon">
//                       <Play className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <SkipBack className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Volume2 className="h-4 w-4" />
//                     </Button>
//                     <span>
//                       {currentTime} / {totalTime}
//                     </span>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <Maximize2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="h-64 border-t border-gray-800 p-4">
//             <div className="flex items-center justify-end gap-2 mb-4">
//               <Button variant="ghost" size="icon">
//                 <ZoomIn className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <ZoomOut className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <SplitSquareHorizontal className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="h-px bg-gray-800 my-4" />
//             <div className="space-y-4">
//               <div className="h-16 bg-gray-900 rounded" />
//               <div className="h-16 bg-gray-900 rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   MenuIcon,
//   Search,
//   Undo2,
//   Redo2,
//   Play,
//   SkipBack,
//   Volume2,
//   Maximize2,
//   ZoomIn,
//   ZoomOut,
//   SplitSquareHorizontal,
//   Globe,
//   Download,
//   Settings2,
//   HelpCircle,
// } from "lucide-react";
// import Image from "next/image";

// const Navbar = () => (
//   <header className="flex items-center justify-between px-4 h-14 border-b border-gray-800">
//     <div className="flex items-center gap-4">
//       <Button variant="ghost" size="icon" className="text-gray-400">
//         <MenuIcon className="h-5 w-5" />
//       </Button>
//       <div className="flex items-center gap-2">
//         <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={24}
//             height={24}
//             className="opacity-0"
//           />
//         </div>
//         <span className="font-semibold">Clipchamp</span>
//       </div>
//       <span className="text-gray-400">Untitled video</span>
//     </div>
//     <div className="flex items-center gap-4">
//       <Button variant="ghost" size="sm" className="gap-2">
//         <Globe className="h-4 w-4" /> Upgrade
//       </Button>
//       <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
//         <Download className="h-4 w-4" /> Export
//       </Button>
//       <Button variant="ghost" size="icon">
//         <Settings2 className="h-5 w-5" />
//       </Button>
//       <Button variant="ghost" size="icon">
//         <HelpCircle className="h-5 w-5" />
//       </Button>
//       <div className="w-8 h-8 rounded-full bg-gray-700" />
//     </div>
//   </header>
// );

// const Sidebar = () => (
//   <aside className="w-72 border-r border-gray-800 flex flex-col p-4">
//     <div className="relative mb-4">
//       <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//       <Input placeholder="Search transitions" className="pl-9 bg-gray-900 border-gray-800" />
//     </div>
//     <h3 className="font-medium mb-4">Add transitions</h3>
//     <div className="space-y-4">
//       {["Fades & blurs", "Wipes"].map((title, index) => (
//         <div key={index}>
//           <h4 className="text-sm text-gray-400 mb-2">{title}</h4>
//           <div className="grid grid-cols-2 gap-2">
//             {Array.from({ length: index === 0 ? 4 : 6 }).map((_, i) => (
//               <div key={i} className="aspect-video bg-gray-800 rounded overflow-hidden" />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   </aside>
// );

// const VideoPreview = ({ currentTime, totalTime }) => (
//   <div className="flex-1 bg-black p-4 flex items-center justify-center">
//     <div className="aspect-video w-full max-w-4xl bg-gray-900 rounded-lg relative">
//       <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-sm">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <Play className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon">
//             <SkipBack className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon">
//             <Volume2 className="h-4 w-4" />
//           </Button>
//           <span>{currentTime} / {totalTime}</span>
//         </div>
//         <Button variant="ghost" size="icon">
//           <Maximize2 className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   </div>
// );

// const Timeline = () => (
//   <div className="h-64 border-t border-gray-800 p-4">
//     <div className="flex items-center justify-end gap-2 mb-4">
//       {[ZoomIn, ZoomOut, SplitSquareHorizontal].map((Icon, i) => (
//         <Button key={i} variant="ghost" size="icon">
//           <Icon className="h-4 w-4" />
//         </Button>
//       ))}
//     </div>
//     <div className="h-px bg-gray-800 my-4" />
//     <div className="space-y-4">
//       <div className="h-16 bg-gray-900 rounded" />
//       <div className="h-16 bg-gray-900 rounded" />
//     </div>
//   </div>
// );

// export default function VideoEditor() {
//   const [currentTime, setCurrentTime] = useState("0:00.70");
//   const [totalTime, setTotalTime] = useState("0:18.06");

//   return (
//     <div className="min-h-screen bg-[#1a1b1e] text-white">
//       <Navbar />
//       <div className="flex h-[calc(100vh-3.5rem)]">
//         <Sidebar />
//         <main className="flex-1 flex flex-col">
//           <div className="p-4 flex items-center justify-between">
//             <div className="flex gap-2">
//               {[Undo2, Redo2].map((Icon, i) => (
//                 <Button key={i} variant="ghost" size="icon">
//                   <Icon className="h-4 w-4" />
//                 </Button>
//               ))}
//             </div>
//             <Button variant="secondary" size="sm">Size</Button>
//           </div>
//           <VideoPreview currentTime={currentTime} totalTime={totalTime} />
//           <Timeline />
//         </main>
//       </div>
//     </div>
//   );
// }

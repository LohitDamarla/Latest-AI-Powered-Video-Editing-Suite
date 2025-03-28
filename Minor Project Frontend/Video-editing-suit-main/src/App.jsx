import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor"; // New Editor Page Import

// const EditorPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
// 
//   // Handle file selection
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setDownloadUrl("");
//     setMessage("");
//   };

//   // Upload video to Flask backend
//   // Reusable file upload function
//   const handleUpload = async (endpoint) => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }
  
//     setLoading(true);
//     setMessage("");
  
//     const formData = new FormData();
//     formData.append("file", selectedFile); // Fix key from "video" to "file"
  
//     try {
//       const response = await fetch(`http://localhost:5001/${endpoint}`, {
//         method: "POST",
//         body: formData,
//         headers: {
//           "Accept": "application/json"
//         }
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setDownloadUrl(`http://localhost:5001/download?filename=${data.filename}`);
//         setMessage(data.transcript ? `Transcript: ${data.transcript}` : data.message);
//       } else {
//         setMessage(data.error || "Something went wrong.");
//       }
//     } catch (error) {
//       setMessage("Failed to connect to the server.");
//     }
  
//     setLoading(false);
//   };
  

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>AI Video Editor</h2>
      
//       <input type="file" accept="video/*" onChange={handleFileChange} />
      
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={() => handleUpload("color-correct")} disabled={loading}>Color Correct</button>
//         <button onClick={() => handleUpload("content_analysis")} disabled={loading}>Content Analysis</button>
//         <button onClick={() => handleUpload("real_time_editing")} disabled={loading}>Real-Time Edit</button>
//       </div>

//       {loading && <p>Processing...</p>}

//       {message && <p>{message}</p>}

//       {downloadUrl && (
//         <div>
//           <p>Download Processed Video:</p>
//           <a href={downloadUrl} download>
//             <button>Download</button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

const predefinedUser = {
  email: "vedantvaidya11@gmail.com",
  password: "123456",
};

const App = () => {
  const [user, setUser] = useState(null);

  // Check login status on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login setUser={setUser} predefinedUser={predefinedUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/editor" element={user ? <Editor /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;



// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Editor from "./pages/Editor"; // New Editor Page Import

// const App = () => {
//   const [user, setUser] = useState(null);

//   // Check login status on page load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage user={user} handleLogout={handleLogout} />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/signup" element={<Signup setUser={setUser} />} />
//         <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/editor" element={user ? <Editor /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

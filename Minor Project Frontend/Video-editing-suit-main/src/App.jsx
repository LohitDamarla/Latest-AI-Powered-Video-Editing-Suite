import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor"; 
import AIEnhancements from "./components/AIEnhancements"; // Import AI Enhancements Page
import Navbar from "./components/NavBar"; // Import Navbar

const predefinedUser = {
  email: "vedantvaidya11@gmail.com",
  password: "123456",
};

const App = () => {
  const [user, setUser] = useState(null);

  // Check login status when page loads
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
      <Navbar user={user} handleLogout={handleLogout} /> {/* ✅ Added Navbar here */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage user={user} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login setUser={setUser} predefinedUser={predefinedUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={user ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/editor" element={user ? <Editor /> : <Navigate to="/login" />} />
        <Route path="/ai-enhancements" element={user ? <AIEnhancements /> : <Navigate to="/login" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

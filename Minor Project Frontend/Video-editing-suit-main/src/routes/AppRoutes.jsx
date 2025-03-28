import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Editor from "../pages/Editor";

const AppRoutes = ({ user, setUser, handleLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} handleLogout={handleLogout} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/editor" element={user ? <Editor /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;

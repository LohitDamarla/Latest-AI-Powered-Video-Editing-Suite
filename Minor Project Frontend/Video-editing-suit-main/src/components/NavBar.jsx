import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {user && <Link to="/dashboard" className="mr-4">Dashboard</Link>}
        {user && <Link to="/editor" className="mr-4">Editor</Link>}
        {user && <Link to="/ai-enhancements" className="mr-4">AI Enhancements</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

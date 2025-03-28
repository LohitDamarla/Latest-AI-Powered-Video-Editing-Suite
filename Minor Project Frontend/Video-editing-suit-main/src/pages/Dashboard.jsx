import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = {
    name: "Vedant", // Replace with actual user data from authentication
    avatar: "public\User.jpg", // Replace with actual profile image
  };

  const recentProjects = [
    { name: "Project Alpha", lastEdited: "3 hours ago", size: "578.9KB" },
    { name: "Untitled", lastEdited: "8 days ago", size: "31.1KB" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-black-800">
        <h1 className="text-purple-400 text-xl font-bold">REAL</h1>
        <nav className="mt-6">
          <ul>
            <li className="p-2 bg-gray-700 rounded-lg">Home</li>
            <li className="p-2 mt-2 hover:bg-gray-700 rounded-lg">Learn</li>
            <li className="p-2 mt-2 hover:bg-gray-700 rounded-lg">Settings</li>
          </ul>
        </nav>
        <div className="mt-6">
          <button className="w-full p-2 bg-gray-700 rounded-lg">New Project...</button>
          <button className="w-full p-2 mt-2 bg-gray-700 rounded-lg">Open Project...</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Welcome back, {user.name}</h2>
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
            <FaUser className="text-xl" />
          </div>
        </header>

        {/* Tutorial Banner */}
        <div className="bg-purple-700 p-6 rounded-lg">
          <h3 className="text-lg font-bold">Make yourself at home</h3>
          <p className="text-sm">Explore tutorials to learn video editing basics.</p>
          <button className="mt-4 px-4 py-2 bg-purple-900 rounded-lg">Start First Tutorial</button>
        </div>

        {/* Recent Files */}
        <section className="mt-6">
          <h3 className="text-lg font-bold">Recent Projects</h3>
          <div className="mt-2 bg-gray-800 p-4 rounded-lg">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex justify-between border-b pb-2 mb-2">
                <span>{project.name}</span>
                <span>{project.lastEdited}</span>
                <span>{project.size}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <Link to="/editor" className="text-blue-400 underline">Go to Video Editor</Link>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
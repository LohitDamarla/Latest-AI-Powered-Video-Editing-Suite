import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LandingBG from "../assets/LandingBG.mp4";
import { FaUserCircle } from "react-icons/fa";

const headingText = "Elevate Your Video Editing Experience".split(" ");

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const wordVariants = {
  initial: { opacity: 0, x: -100, y: 30 },
  animate: {
    opacity: 1,
    x: 0,
    y: [30, -10, 0],
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

const buttonVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  hover: { scale: 1.1, boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)" },
  tap: { scale: 0.9 },
};

const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const logoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const LandingPage = ({ user, handleLogout }) => {
  const navigate = useNavigate(); 

  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      
      {/* Top Navbar */}
      <div className="absolute top-4 w-full flex justify-between items-center px-6 z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          className="text-2xl font-bold text-white">

          <span className="text-blue-500">REAL</span>
        </motion.div>

        {/* Navbar Buttons */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={navbarVariants}
          className="flex space-x-4"
        >
          {user ? (
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-white text-3xl" />
              <motion.button 
                className="text-white bg-red-500 px-4 py-2 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={LandingBG} type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Hero Section */}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="text-center z-10 max-w-screen-lg"
      >
        {/* Bouncing Words Effect */}
        <h1 className="text-5xl font-bold text-blue-500 mb-4 flex justify-center flex-wrap">
          {headingText.map((word, index) => (
            <motion.span 
              key={index} 
              variants={wordVariants} 
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Create stunning videos with AI-powered scene detection, real-time previews, and an intuitive timeline editor.
        </p>

        {/* Start Button Navigates to Dashboard */}
        <motion.div 
          variants={buttonVariants} 
          initial="initial" 
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            className="bg-red-500 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300"
            onClick={() => navigate(user ? "/dashboard" : "/login")}
          >
            {user ? "Go to Dashboard" : "Start Editing Now"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
  
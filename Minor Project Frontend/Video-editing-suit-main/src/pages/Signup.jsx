import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Stars = () => {
  const ref = useRef();
  
  useEffect(() => {
    let stars = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      stars[i] = (Math.random() - 0.5) * 10;
    }
    ref.current.geometry.setAttribute("position", new THREE.BufferAttribute(stars, 3));
  }, []);

  useFrame(() => {
    ref.current.rotation.y += 0.0005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry />
      <pointsMaterial color="white" size={0.02} />
    </points>
  );
};

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ fullName, email }));
    navigate("/dashboard");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Stars />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="backdrop-blur-lg bg-white/10 shadow-2xl p-10 rounded-2xl border border-white/20 w-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold text-center mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Create an Account
          </motion.h1>
          <motion.input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSignup} className="w-full bg-green-500 p-3 text-white rounded-lg shadow-lg">
              Sign Up
            </Button>
          </motion.div>
          <div className="flex flex-col space-y-4 mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-red-500 p-3 text-white rounded-lg shadow-lg">
                Sign Up with Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-blue-700 p-3 text-white rounded-lg shadow-lg">
                Sign Up with Facebook
              </Button>
            </motion.div>
          </div>
          <p className="mt-6 text-center text-white">
            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;

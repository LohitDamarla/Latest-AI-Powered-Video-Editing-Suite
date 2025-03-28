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

const LoginPage = ({ setUser, predefinedUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      if (email === predefinedUser.email && password === predefinedUser.password) {
        const userData = { email };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
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
            Login to Your Account
          </motion.h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            <Button onClick={handleLogin} className="w-full bg-blue-500 p-3 text-white rounded-lg shadow-lg">
              Login
            </Button>
          </motion.div>
          <div className="flex flex-col space-y-4 mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-red-500 p-3 text-white rounded-lg shadow-lg">
                Login with Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-blue-700 p-3 text-white rounded-lg shadow-lg">
                Login with Facebook
              </Button>
            </motion.div>
          </div>
          <p className="mt-6 text-center text-white">
            Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;







/*import React, { useState, useRef, useEffect } from "react";
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

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
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
            Login to Your Account
          </motion.h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            <Button onClick={handleLogin} className="w-full bg-blue-500 p-3 text-white rounded-lg shadow-lg">
              Login
            </Button>
          </motion.div>
          <div className="flex flex-col space-y-4 mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-red-500 p-3 text-white rounded-lg shadow-lg">
                Login with Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-blue-700 p-3 text-white rounded-lg shadow-lg">
                Login with Facebook
              </Button>
            </motion.div>
          </div>
          <p className="mt-6 text-center text-white">
            Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
*/

import React from "react";
import { Link } from "react-router-dom";

const AnotherPage = () => {
  return (
    <div className="p-6 bg-gray-900 text-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Another Page!</h1>
      <Link to="/">
        <button className="mt-4 px-4 py-2 bg-blue-600 rounded">Go Back</button>
      </Link>
    </div>
  );
};

export default AnotherPage;

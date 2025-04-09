import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b  transition-colors">
      <div className="max-w-3xl text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-6">
          Welcome to EduBook 📅
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          EduBook is your smart platform for managing educational events, networking, and learning opportunities—all in one place. 📝
        </p>
        <Link to="/about">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full text-lg font-semibold transition">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
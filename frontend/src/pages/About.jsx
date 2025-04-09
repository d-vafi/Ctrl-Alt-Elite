import React from "react";
import githubIcon from "../assets/Github.png"; // Make sure you have this in your assets folder

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-3xl text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About EduBook 💭
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          EduBook is designed to revolutionize educational event management by bringing organizers and participants together through a seamless digital experience.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          From planning and promotion to networking and real-time feedback, EduBook streamlines every step of the process.
        </p>

      </div>
        {/* GitHub Icon */}
        <a
          href="https://github.com/d-vafi/Ctrl-Alt-Elite" // 🔗 Replace with your GitHub link
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8 opacity-0 animate-fade-in"
        >
          <img
            src={githubIcon}
            alt="GitHub"
            className="w-8 h-8 mx-auto animate-pulse-slow animate-bounce  transition-transform"
          />
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            View on GitHub
          </p>
        </a>
    </div>
  );
};

export default About;

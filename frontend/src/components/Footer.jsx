import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center py-6 mt-10">
      <div className="container mx-auto text-gray-600 dark:text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            EduBook
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-4xl font-bold">Welcome to EduBook</h1>
      {/* white text in dark mode */}
      <p className="text-lg dark:text-white-700 mt-4">
        Your smart platform for educational events is called EduBook.
      </p>
    </div>
  );
};

export default HomePage;

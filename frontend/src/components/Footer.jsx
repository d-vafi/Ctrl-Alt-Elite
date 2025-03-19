import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 w-full p-4 text-center">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} EduBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

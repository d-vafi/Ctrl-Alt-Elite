import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/LogIn.jsx";
import EventLogin from "./pages/EventLogIn.jsx";
import EventPromotionDashboard from "./pages/EventPromotionDashboard.jsx";


const App = () => {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/eventlogin" element={<EventLogin />}/>
          <Route path="/eventpromotiondashboard" element={<EventPromotionDashboard />}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

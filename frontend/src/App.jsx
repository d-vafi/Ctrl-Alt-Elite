import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/LogIn.jsx";
import EventPromotionDashboard from "./pages/EventPromotionDashboard.jsx";
import UserPromotionDashboard from "./pages/UserPromotionDashboard.jsx";
import PaymentForm from "./pages/PaymentForm.jsx";
import EventCatalog from "./pages/EventCatalog.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentError from "./pages/PaymentError.jsx";
import EventPlanning from "./pages/EventPlanning"; // 👈 import the new page
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";

import SwipePage from "./pages/SwipePage.jsx"; // Import the SwipePage component

import UserDashboard from "./pages/UserDashboard.jsx";
import Networking from "./pages/Networking.jsx";
import SignupDetails from "./pages/SignupDetails.jsx";

const App = () => {
  //dark mode using state
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* dark mode accessibility feature */}
      <Navbar toggleDarkMode={toggleDarkMode} />
      <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 pt-20 bg-white dark:bg-gray-900 text-black dark:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/eventpromotiondashboard"
            element={<EventPromotionDashboard />}
          />
          <Route path="/networking" element={<Networking />} />
          <Route
            path="/userpromotiondashboard"
            element={<UserPromotionDashboard />}
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <PaymentForm />
              </PrivateRoute>
            }
          />
          <Route path="/events" element={<EventCatalog />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-error" element={<PaymentError />} />
          <Route path="/swipe" element={<SwipePage />} />
          <Route path="/eventplanning" element={<EventPlanning />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/organizer-dashboard"
            element={
              <PrivateRoute>
                <OrganizerDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/signup-details" element={<SignupDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

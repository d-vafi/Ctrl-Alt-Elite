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
import UserPromotionDashboard from "./pages/UserPromotionDashboard.jsx";
import PaymentForm from "./pages/PaymentForm.jsx";
import EventCatalog from "./pages/EventCatalog.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentError from "./pages/PaymentError.jsx";


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
          <Route path="/userpromotiondashboard" element={<UserPromotionDashboard />} />
          <Route path="/payment" element={
             <PrivateRoute>
                <PaymentForm />
            </PrivateRoute>
          } />
          <Route path="/events" element={<EventCatalog/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-error" element={<PaymentError />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

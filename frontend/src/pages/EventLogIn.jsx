import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/eventlogin", formData);
      if (response.data.status === "success") {
        alert("Login successful!");
        setMessage(response.data.message);
        setError(null);
  
        if (response.data.type === "user") {
          sessionStorage.setItem("userEmail", response.data.email);
          navigate("/userpromotiondashboard");
        } else if (response.data.type === "admin") {
          navigate("/eventpromotiondashboard");
        }
      } else {
        setError(response.data.message);
        setMessage(null);
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message || error);
      setError("An error occurred during login.");
      setMessage(null);
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventLogin;

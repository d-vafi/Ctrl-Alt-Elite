import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../theme.css"; // Import the CSS file

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    role: "Attendee", // Default role
  });

  const roles = ["Organizer", "Attendee", "Stakeholder"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      navigate("/signup-details", { state: formData });
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container p-8 shadow-lg rounded-lg w-full max-w-md bg-white dark:bg-gray-800 transition-colors">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input w-full p-2 border rounded mt-1"
              placeholder="Enter your full name"
            />
          </div>
          {/* Username */}
          <div>
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input w-full p-2 border rounded mt-1"
              placeholder="Enter your username"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
            />
          </div>
          {/* Role Selection */}
          <div>
            <label className="block font-semibold">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input w-full p-2 border rounded mt-1"
            >
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
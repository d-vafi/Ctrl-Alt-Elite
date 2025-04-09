import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      if (res.data.status === "success") {
        const userId = res.data.userId;

        localStorage.setItem("token", "mock-token");
        localStorage.setItem("userId", userId);
        localStorage.setItem("type", res.data.userType);
        setIsLoggedIn(true);

        // 🔁 Get user profile to extract their type
        const profileRes = await axios.get(
          `http://localhost:8080/api/users/me?userId=${userId}`
        );

        const userType = profileRes.data?.user?.type || "";
        localStorage.setItem("userType", userType);
        const email = profileRes.data?.user?.email || "";
        console.log(profileRes.data);
        console.log(profileRes.data.user.email);
        localStorage.setItem("email", email);
        navigate("/events");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors px-4">
      <div className="bg-white dark:bg-gray-800 transition-colors p-8 shadow-lg rounded-xl w-full max-w-md transition-colors">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded mt-1"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded mt-1"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return null;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

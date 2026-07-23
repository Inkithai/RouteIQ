import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

function RequireAuth({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/Login" replace />;
  }
  return children;
}

export default RequireAuth;

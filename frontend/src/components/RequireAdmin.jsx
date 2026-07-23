import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getUserRole } from "../lib/auth";

function RequireAdmin({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/Login" replace />;
  }
  
  if (getUserRole() !== "admin") {
    return <Navigate to="/dashboard/customer" replace />;
  }
  
  return children;
}

export default RequireAdmin;

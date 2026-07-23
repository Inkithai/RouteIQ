import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../lib/auth";

function ProtectedRoute({ allow = [], children }) {
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  if (!loggedIn) {
    return <Navigate to="/Login" replace />;
  }

  if (allow.length > 0 && !allow.includes(role)) {
    return <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/customer"} replace />;
  }

  return children;
}

export default ProtectedRoute;

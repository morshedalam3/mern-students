import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {
  const user = localStorage.getItem("token");
  let location = useLocation();
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;

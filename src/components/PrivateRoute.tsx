import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRole,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) return <Loading />;

  if (user === null) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;

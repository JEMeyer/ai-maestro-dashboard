import React from "react";
import { Navigate } from "react-router-dom";
import { useUserValue } from "../../state/app";

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRole,
}) => {
  const user = useUserValue();
  // Wait for user to load
  if (user === undefined) return <></>;

  if (user === null) {
    return <Navigate to="/unauthenticated" state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;

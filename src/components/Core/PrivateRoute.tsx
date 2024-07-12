import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserValue } from "../../state/app";

interface PrivateRouteProps {
  element: JSX.Element;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRole,
}) => {
  const user = useUserValue();
  const location = useLocation();

  // Wait for user to load
  if (user === undefined) return <></>;

  if (user === null) {
    return (
      <Navigate to="/unauthenticated" state={{ from: location.pathname }} />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} />;
  }

  return element;
};

export default PrivateRoute;

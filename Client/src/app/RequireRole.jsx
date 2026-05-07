import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// usage: <RequireRole roles={["admin","superadmin"]}><Component/></RequireRole>
const RequireRole = ({ roles, children }) => {
  const { user, isLoading, hasRole } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !hasRole(roles)) return <Navigate to="/" replace />;

  return children;
};

export default RequireRole;

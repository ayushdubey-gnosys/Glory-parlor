import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../services/auth/useAuthQuery";
import Loader from "../components/common/Loader";

const RequireRole = ({ roles = [], children }) => {
  const { data, isLoading, isError } = useCurrentUser();

  // Loading State
  if (isLoading) {
    return <Loader fullScreen />;
  }

  // Not Logged In
  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  // Current User Role
  const userRole = data.user.role;

  // Unauthorized
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Render Child or Nested Routes
  return children ? children : <Outlet />;
};

export default RequireRole;
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../services/auth/useAuthQuery";

const RequireAuth = ({ children }) => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;

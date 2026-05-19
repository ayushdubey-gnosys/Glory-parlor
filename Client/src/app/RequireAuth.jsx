import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../services/auth/useAuthQuery";
import Loader from "../components/common/Loader";

const RequireAuth = ({ children }) => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) return <Loader fullScreen />;

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;

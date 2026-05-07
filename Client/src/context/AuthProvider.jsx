import React, { createContext, useContext, useEffect } from "react";
import { useCurrentUser } from "../services/auth/useAuthQuery";
import { useLogin, useLogout } from "../services/auth/useAuthMutation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, refetch } = useCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (credentials) => {
    await loginMutation.mutateAsync(credentials);
    await refetch();
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      await refetch();
    }
  };

  const value = {
    user: data?.user || null,
    isLoading,
    login,
    logout,
    refetchUser: refetch,
  };

  // helper: check if current user has one of the roles
  const hasRole = (roles) => {
    if (!data?.user) return false;
    if (!roles) return true;
    const arr = Array.isArray(roles) ? roles : [roles];
    return arr.includes(data.user.role);
  };

  value.hasRole = hasRole;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

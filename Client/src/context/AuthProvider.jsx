import React, { createContext, useContext, useEffect } from "react";
import { useCurrentUser } from "../services/auth/useAuthQuery";
import { useLogin, useLogout } from "../services/auth/useAuthMutation";
import api from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, refetch } = useCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (credentials) => {
    const res = await loginMutation.mutateAsync(credentials);

    // if server returned a token, set Authorization header for subsequent requests
    if (res?.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
    }

    await refetch();
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      // remove Authorization header on logout
      delete api.defaults.headers.common["Authorization"];

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

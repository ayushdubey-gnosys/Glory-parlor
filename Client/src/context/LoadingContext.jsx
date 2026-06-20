import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import Loader from "../components/common/Loader";

const LoadingContext = createContext({
  isLoading: false,
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (config.method?.toLowerCase() !== 'get' && !config.skipGlobalLoader) {
          setActiveRequests((prev) => prev + 1);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        if (response.config.method?.toLowerCase() !== 'get' && !response.config.skipGlobalLoader) {
          setActiveRequests((prev) => Math.max(0, prev - 1));
        }
        return response;
      },
      (error) => {
        if (error.config && error.config.method?.toLowerCase() !== 'get' && !error.config.skipGlobalLoader) {
          setActiveRequests((prev) => Math.max(0, prev - 1));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const isLoading = activeRequests > 0;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && <Loader fullScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

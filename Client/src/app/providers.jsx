import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { AuthProvider } from "../context/AuthProvider";
import { LoadingProvider } from "../context/LoadingContext";

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { AuthProvider } from "../context/AuthProvider";

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
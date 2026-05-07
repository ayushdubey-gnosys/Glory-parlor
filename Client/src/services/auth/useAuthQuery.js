import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

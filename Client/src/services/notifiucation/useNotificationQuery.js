import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "./notification.api";

export const useNotifications =
  () => {
    return useQuery({
      queryKey: ["notifications"],

      queryFn: getNotifications,
    });
  };
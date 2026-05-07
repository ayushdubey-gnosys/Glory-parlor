import { useQuery } from "@tanstack/react-query";

import { getStaff } from "./staff.api";

import { staffKeys } from "./staff.key";

// GET ALL STAFF
export const useStaff = () => {
  return useQuery({
    queryKey: staffKeys.all,

    queryFn: getStaff,
  });
};
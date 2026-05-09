import { useQuery } from "@tanstack/react-query";
import { getStaffById } from "./staff.api";
import { staffKeys } from "./staff.key";

export const useStaffById = (id) => {
  return useQuery({
    queryKey: staffKeys.detail(id),
    queryFn: () => getStaffById(id),
    enabled: !!id,
  });
};

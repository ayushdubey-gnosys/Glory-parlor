import { useQuery } from "@tanstack/react-query";

import {
  getServices,
  getServiceById,
} from "./service.api";

import { serviceKeys } from "./service.key";

// GET ALL SERVICES
export const useServices = () => {
  return useQuery({
    queryKey: serviceKeys.all,

    queryFn: getServices,
  });
};

// GET SINGLE SERVICE
export const useService = (id) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),

    queryFn: () => getServiceById(id),

    enabled: !!id,
  });
};
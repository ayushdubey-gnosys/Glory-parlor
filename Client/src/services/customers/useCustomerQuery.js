import { useQuery } from "@tanstack/react-query";

import {
  getCustomers,
  getCustomerById,
} from "./customer.api";

import { customerKeys } from "./customer.keys";

export const useCustomers = () => {
  return useQuery({
    queryKey: customerKeys.all,
    queryFn: getCustomers,
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};
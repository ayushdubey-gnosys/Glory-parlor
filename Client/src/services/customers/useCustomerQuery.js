import { useQuery } from "@tanstack/react-query";

import {
  getCustomers,
  getCustomerById,
  getMyCustomer,
} from "./customer.api";

import { customerKeys } from "./customer.keys";

export const useCustomers = (opts = {}) => {
  // opts: { page, limit, category, status }
  return useQuery({
    queryKey: [...customerKeys.all, opts.page || 1, opts.limit || 10, opts.category || "", opts.status || ""],
    queryFn: () => getCustomers(opts),
    keepPreviousData: true,
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};

export const useMyCustomer = () => {
  return useQuery({
    queryKey: customerKeys.my,
    queryFn: () => getMyCustomer(),
  });
};
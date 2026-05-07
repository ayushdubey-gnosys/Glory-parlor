import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer, deleteCustomer } from "./customer.api";
import { customerKeys } from "./customer.keys";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => queryClient.invalidateQueries(customerKeys.all),
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (_, vars) => queryClient.invalidateQueries(customerKeys.detail(vars.id)),
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => queryClient.invalidateQueries(customerKeys.all),
  });
};
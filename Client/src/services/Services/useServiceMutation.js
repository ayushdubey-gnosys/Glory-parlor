import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createService,
  updateService,
  deleteService,
} from "./service.api";

import { serviceKeys } from "./service.key";

// CREATE SERVICE
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });
    },
  });
};

// UPDATE SERVICE
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });
    },
  });
};

// DELETE SERVICE
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });
    },
  });
};
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createStaff,
  updateStaff,
  deleteStaff,
  calculateIncentive,
} from "./staff.api";

import { staffKeys } from "./staff.key";

// CREATE STAFF
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staffKeys.all,
      });
    },
  });
};

// UPDATE STAFF
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staffKeys.all,
      });
    },
  });
};

// DELETE STAFF
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staffKeys.all,
      });
    },
  });
};

// CALCULATE INCENTIVE
export const useCalculateIncentive = () => {
  return useMutation({
    mutationFn: calculateIncentive,
  });
};
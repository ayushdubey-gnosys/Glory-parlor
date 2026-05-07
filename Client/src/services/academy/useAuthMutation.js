import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "./academy.api";

import { academyKeys } from "./academy.key";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: academyKeys.all,
      });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: academyKeys.all,
      });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: academyKeys.all,
      });
    },
  });
};
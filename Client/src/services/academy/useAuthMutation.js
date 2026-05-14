import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

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
    onError: (err) => {
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || "Failed to create course";
      toast.error(msg);
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
    onError: (err) => {
      const msg = err?.response?.data?.error || err?.message || "Failed to update course";
      toast.error(msg);
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
    onError: (err) => {
      const msg = err?.response?.data?.error || err?.message || "Failed to delete course";
      toast.error(msg);
    },
  });
};
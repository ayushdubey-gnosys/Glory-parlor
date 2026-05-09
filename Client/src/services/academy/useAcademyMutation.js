import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, updateCourse, deleteCourse } from "./academy.api";
import { enrollCourse } from "./academy.api";
import { academyKeys } from "./academy.key";

export const useCreateCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => qc.invalidateQueries({ queryKey: academyKeys.all }),
  });
};

export const useUpdateCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: academyKeys.all });
    },
  });
};

export const useDeleteCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => qc.invalidateQueries({ queryKey: academyKeys.all }),
  });
};

export const useEnrollCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: enrollCourse,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: academyKeys.all });
      if (data && data._id) qc.invalidateQueries({ queryKey: academyKeys.detail(data._id) });
    },
  });
};

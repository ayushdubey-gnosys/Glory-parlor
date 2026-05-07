import { useQuery } from "@tanstack/react-query";

import {
  getCourses,
  getCourseById,
} from "./academy.api";

import { academyKeys } from "./academy.key";

// GET ALL COURSES
export const useCourses = () => {
  return useQuery({
    queryKey: academyKeys.all,
    queryFn: getCourses,
  });
};

// GET SINGLE COURSE
export const useCourse = (id) => {
  return useQuery({
    queryKey: academyKeys.detail(id),

    queryFn: () => getCourseById(id),

    enabled: !!id,
  });
};
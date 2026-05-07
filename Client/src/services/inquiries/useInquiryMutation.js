// src/hooks/inquiry/useInquiryMutation.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from "./inquiry.api";

export const useCreateInquiry =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: createInquiry,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["inquiries"],
        });
      },
    });
  };

export const useUpdateInquiry =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: updateInquiry,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["inquiries"],
        });
      },
    });
  };

export const useDeleteInquiry =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: deleteInquiry,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["inquiries"],
        });
      },
    });
  };
// src/hooks/inquiry/useInquiryQuery.js

import { useQuery } from "@tanstack/react-query";

import { getInquiries, getInquiry } from "./inquiry.api";

export const useGetInquiries = ({ page = 1, limit = 10, q = "", status } = {}) => {
  return useQuery({
    queryKey: ["inquiries", { page, limit, q, status }],

    queryFn: () => getInquiries({ page, limit, q, status }),
    keepPreviousData: true,
  });
};

export const useGetInquiry = (id) => {
  return useQuery({
    queryKey: ["inquiry", id],
    queryFn: () => getInquiry(id),
    enabled: !!id,
  });
};
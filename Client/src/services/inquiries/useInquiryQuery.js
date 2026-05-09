// src/hooks/inquiry/useInquiryQuery.js

import { useQuery } from "@tanstack/react-query";

import { getInquiries } from "./inquiry.api";

export const useGetInquiries = ({ page = 1, limit = 10, q = "" } = {}) => {
  return useQuery({
    queryKey: ["inquiries", { page, limit, q }],

    queryFn: () => getInquiries({ page, limit, q }),
    keepPreviousData: true,
  });
};
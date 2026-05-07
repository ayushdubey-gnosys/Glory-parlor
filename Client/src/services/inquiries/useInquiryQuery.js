// src/hooks/inquiry/useInquiryQuery.js

import { useQuery } from "@tanstack/react-query";

import { getInquiries } from "./inquiry.api";

export const useGetInquiries = () => {
  return useQuery({
    queryKey: ["inquiries"],

    queryFn: getInquiries,
  });
};
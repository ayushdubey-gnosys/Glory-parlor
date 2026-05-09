import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { generateInvoiceApi } from "./billing.api";

export const useGenerateInvoice =
  () => {
    return useMutation({
      mutationFn: generateInvoiceApi,

      onSuccess: () => {
        toast.success(
          "Invoice Generated"
        );
      },

      onError: err => {
        toast.error(err.message);
      },
    });
  };
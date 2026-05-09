import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { sendCampaign } from "./marketing.api";

export const useSendCampaign = () => {
  return useMutation({
    mutationFn: sendCampaign,

    onSuccess: (data) => {
      toast.success(data.message || "Campaign sent");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};
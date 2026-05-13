import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { calculateIncentive } from "../services/staff/staffApi";

export default function useCalculateIncentive() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: calculateIncentive,
    onSuccess: (data) => {
      toast.success("Incentive calculated");
      // optionally invalidate related queries (v5 object form)
      qc.invalidateQueries({ queryKey: ["staff-list"] });
      qc.invalidateQueries({ queryKey: ["incentive"] });
      return data;
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message || "Failed to calculate incentive";
      toast.error(message);
    },
  });
}

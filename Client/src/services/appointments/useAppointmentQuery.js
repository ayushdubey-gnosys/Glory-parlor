import { useQuery } from "@tanstack/react-query";

import {
  getAppointments,
} from "./appointment.api";

import { appointmentKeys } from "./appointment.key";

// GET ALL APPOINTMENTS
export const useAppointments = (page = 1, limit = 10, mode) => {
  return useQuery({
    queryKey: [...appointmentKeys.all, page, limit, mode || "all"],

    queryFn: () => getAppointments({ page, limit, mode }),
  });
};
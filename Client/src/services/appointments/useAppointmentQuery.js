import { useQuery } from "@tanstack/react-query";

import {
  getAppointments,
} from "./appointment.api";

import { appointmentKeys } from "./appointment.key";

// GET ALL APPOINTMENTS
export const useAppointments = () => {
  return useQuery({
    queryKey: appointmentKeys.all,

    queryFn: getAppointments,
  });
};
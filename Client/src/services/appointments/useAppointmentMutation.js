import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./appointment.api";

import { appointmentKeys } from "./appointment.key";

// CREATE APPOINTMENT
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.all,
      });
    },
  });
};

// UPDATE APPOINTMENT
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.all,
      });
    },
  });
};

// DELETE APPOINTMENT
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.all,
      });
    },
  });
};
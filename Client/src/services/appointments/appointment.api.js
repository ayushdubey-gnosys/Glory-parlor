import api from "../../api/api";

// CREATE APPOINTMENT
export const createAppointment = async (
  data
) => {
  const response = await api.post(
    "/appointments",
    data
  );

  return response.data;
};

// GET ALL APPOINTMENTS
export const getAppointments = async () => {
  const response = await api.get(
    "/appointments"
  );

  return response.data;
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/appointments/${id}`,
    data
  );

  return response.data;
};

// DELETE APPOINTMENT
export const deleteAppointment = async (
  id
) => {
  const response = await api.delete(
    `/appointments/${id}`
  );

  return response.data;
};
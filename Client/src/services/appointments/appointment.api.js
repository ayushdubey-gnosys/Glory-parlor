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

// GET ALL APPOINTMENTS (supports pagination)
export const getAppointments = async ({ page = 1, limit = 10, mode } = {}) => {
  let url = `/appointments?page=${page}&limit=${limit}`;

  if (mode) {
    url += `&mode=${encodeURIComponent(mode)}`;
  }

  const response = await api.get(url);

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
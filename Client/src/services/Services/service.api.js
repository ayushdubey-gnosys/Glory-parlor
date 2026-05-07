import api from "../../api/api";

// CREATE SERVICE
export const createService = async (data) => {
  const response = await api.post(
    "/services",
    data
  );

  return response.data;
};

// GET ALL SERVICES
export const getServices = async () => {
  const response = await api.get("/services");

  return response.data;
};

// GET SINGLE SERVICE
export const getServiceById = async (id) => {
  const response = await api.get(
    `/services/${id}`
  );

  return response.data;
};

// UPDATE SERVICE
export const updateService = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/services/${id}`,
    data
  );

  return response.data;
};

// DELETE SERVICE
export const deleteService = async (id) => {
  const response = await api.delete(
    `/services/${id}`
  );

  return response.data;
};
import api from "../../api/api";

// CREATE STAFF
export const createStaff = async (data) => {
  const response = await api.post(
    "/staff",
    data
  );

  return response.data;
};

// GET ALL STAFF
export const getStaff = async () => {
  const response = await api.get("/staff");

  return response.data;
};

// UPDATE STAFF
export const updateStaff = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/staff/${id}`,
    data
  );

  return response.data;
};

// DELETE STAFF
export const deleteStaff = async (id) => {
  const response = await api.delete(
    `/staff/${id}`
  );

  return response.data;
};

// CALCULATE INCENTIVE
export const calculateIncentive = async (
  data
) => {
  const response = await api.post(
    "/staff/incentive",
    data
  );

  return response.data;
};
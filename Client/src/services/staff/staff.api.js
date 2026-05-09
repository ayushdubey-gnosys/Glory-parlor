import api from "../../api/api";

// CREATE STAFF
export const createStaff = async (data) => {
  const response = await api.post(
    "/staff",
    data
  );

  // server returns { success, message, staff }
  return response.data?.staff || response.data;
};

// GET ALL STAFF
export const getStaff = async () => {
  const response = await api.get("/staff");

  // server returns { success, staff }
  return response.data?.staff || response.data;
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

  // server returns { success, message, staff }
  return response.data?.staff || response.data;
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

// GET SINGLE STAFF
export const getStaffById = async (id) => {
  const response = await api.get(`/staff/${id}`);

  return response.data?.staff || response.data;
};
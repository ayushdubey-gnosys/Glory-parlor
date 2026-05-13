import api from "../../api/api";

export const calculateIncentive = async (data) => {
  const response = await api.post("/staff/incentive", data);
  return response.data;
};

export const getStaff = async () => {
  const response = await api.get("/staff");
  return response.data?.staff || response.data;
};

export default {
  calculateIncentive,
  getStaff,
};

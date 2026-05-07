import api from "../../api/api";

export const getCustomers = async () => {
  const res = await api.get("/customers");
  return res.data;
};

export const getCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (payload) => {
  const res = await api.post(`/customers`, payload);
  return res.data;
};

export const updateCustomer = async ({ id, payload }) => {
  const res = await api.patch(`/customers/${id}`, payload);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};
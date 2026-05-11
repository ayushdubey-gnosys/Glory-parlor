import api from "../../api/api";

export const getCustomers = async (params = {}) => {
  // accept optional params: { page, limit, category }
  // avoid using `arguments` (not available in arrow functions)
  const res = await api.get("/customers", { params });
  // server returns { success: true, customers, total, page, pages }
  // return the whole payload so caller can access pagination metadata
  return res.data;
};

export const getCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}`);
  // server returns { success: true, customer }
  return res.data?.customer ?? res.data;
};

export const getMyCustomer = async () => {
  const res = await api.get(`/customers/me`);
  return res.data?.customer ?? res.data;
};

export const createMyCustomer = async (payload) => {
  const res = await api.post(`/customers/me`, payload);
  return res.data?.customer ?? res.data;
};

export const updateMyCustomer = async (payload) => {
  const res = await api.patch(`/customers/me`, payload);
  return res.data?.customer ?? res.data;
};

export const createCustomer = async (payload) => {
  const res = await api.post(`/customers`, payload);
  return res.data?.customer ?? res.data;
};

export const updateCustomer = async ({ id, payload }) => {
  const res = await api.patch(`/customers/${id}`, payload);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};
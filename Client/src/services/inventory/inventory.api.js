import api from "../../api/api";

// ADD PRODUCT
export const addProduct = async (data) => {
  const response = await api.post(
    "/inventory",
    data
  );

  return response.data;
};

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await api.get("/inventory");

  return response.data;
};

// UPDATE PRODUCT
export const updateProduct = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/inventory/${id}`,
    data
  );

  return response.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/inventory/${id}`
  );

  return response.data;
};

// UPDATE STOCK
export const updateStock = async (data) => {
  const response = await api.patch(
    "/inventory/stock",
    data
  );

  return response.data;
};
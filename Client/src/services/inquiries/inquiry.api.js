// src/api/inquiry.api.js

import api from "../../api/api";

// CREATE INQUIRY

export const createInquiry = async (
  data
) => {
  const response = await api.post(
    "/inquiries",
    data
  );

  return response.data;
};

// GET ALL INQUIRIES

export const getInquiries = async ({ page = 1, limit = 10, q = "", status } = {}) => {
  const params = { page, limit, q };
  if (status) params.status = status;

  const response = await api.get("/inquiries", { params });

  return response.data;
};

// UPDATE INQUIRY

export const updateInquiry = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/inquiries/${id}`,
    data
  );

  return response.data;
};

// DELETE INQUIRY

export const deleteInquiry = async (
  id
) => {
  const response = await api.delete(
    `/inquiries/${id}`
  );

  return response.data;
};

// GET SINGLE INQUIRY
export const getInquiry = async (id) => {
  const response = await api.get(`/inquiries/${id}`);
  return response.data;
};
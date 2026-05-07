// src/api/inquiry.api.js

import api from "../../api/api";

// CREATE INQUIRY

export const createInquiry = async (
  data
) => {
  const response = await api.post(
    "/inquiry",
    data
  );

  return response.data;
};

// GET ALL INQUIRIES

export const getInquiries =
  async () => {
    const response = await api.get(
      "/inquiry"
    );

    return response.data;
  };

// UPDATE INQUIRY

export const updateInquiry = async ({
  id,
  data,
}) => {
  const response = await api.patch(
    `/inquiry/${id}`,
    data
  );

  return response.data;
};

// DELETE INQUIRY

export const deleteInquiry = async (
  id
) => {
  const response = await api.delete(
    `/inquiry/${id}`
  );

  return response.data;
};
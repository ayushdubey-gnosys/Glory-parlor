import api from "../../api/api";

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/register",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await api.patch("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const changePassword = async (payload) => {
  const response = await api.patch("/auth/change-password", payload);
  return response.data;
};
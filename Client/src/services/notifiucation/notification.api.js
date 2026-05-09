import api from "../../api/api";

export const getNotifications = async () => {
  const response = await api.get("/notifications/my");

  return response.data;
};
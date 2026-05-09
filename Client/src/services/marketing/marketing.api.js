import api from "../../api/api";

export const sendCampaign = async (data) => {
  const response = await api.post(
    "/marketing/campaign",
    data
  );

  return response.data;
};
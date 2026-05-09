import api from "../../api/api";

export const generateInvoiceApi = async (
  data
) => {
  const res = await api.post(
    "/billing/invoice",
    data
  );

  return res.data;
};
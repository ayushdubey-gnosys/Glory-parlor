import React from "react";
import axios from "axios";
import { generateInvoicePdf } from "../../utils/generateInvoicePdf";

const InvoicePage = () => {
  const handleGenerate = async () => {
    try {
      // Example payload — replace with real selection in your app
      const payload = {
        customer: "69fc22ae2b93c440f4871315",
        services: [
          { service: "69fdcdd21430102e81c601cf", price: 300 },
        ],
        products: [
          { product: "69fdcdd21430102e81c601d0", price: 500, qty: 1 },
        ],
      };

      const resp = await axios.post("http://localhost:3000/api/billing/invoice", payload, {
        withCredentials: true,
      });

      const invoice = resp.data;

      generateInvoicePdf(invoice);
    } catch (err) {
      console.error("Generate invoice error:", err);
      alert(err?.response?.data?.message || err?.message || "Failed to generate invoice");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Generate Invoice</h1>

      <button onClick={handleGenerate} className="px-4 py-2 bg-black text-white rounded">
        Generate Invoice PDF
      </button>
    </div>
  );
};

export default InvoicePage;

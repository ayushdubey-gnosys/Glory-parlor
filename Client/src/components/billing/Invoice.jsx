import axios from "axios";

import { generateInvoicePdf } from "../utils/generateInvoicePdf";

const InvoicePage = () => {
  const createInvoice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/billing/invoice",

        {
          customer: "69fc22ae2b93c440f4871315",

          services: [
            {
              service:
                "69fdcdd21430102e81c601cf",

              price: 300,
            },
          ],

          products: [
            {
              product:
                "69fdcdd21430102e81c601d0",

              price: 500,

              qty: 1,
            },
          ],
        },

        {
          withCredentials: true,
        }
      );

      // PDF GENERATE
      generateInvoicePdf(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={createInvoice}>
        Generate Invoice PDF
      </button>
    </div>
  );
};

export default InvoicePage;
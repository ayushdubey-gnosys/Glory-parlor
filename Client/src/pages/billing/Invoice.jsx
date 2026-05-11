import React, { useState } from "react";



import InvoicePreview from "../../components/billing/InvoicePreview";
import { useGenerateInvoice } from "../../services/billing/useBillingMutation";

const InvoiceForm = () => {
  const { mutateAsync } =
    useGenerateInvoice();

  const [invoice, setInvoice] =
    useState(null);

  const [formData, setFormData] =
    useState({
      customer: "",

      services: [
        {
          service: "",
          price: "",
        },
      ],

      products: [
        {
          product: "",
          price: "",
          qty: "",
        },
      ],

      paymentMethod: "Cash",
      discount: 0,
    });

  const handleServiceChange = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...formData.services,
    ];

    updated[index][field] = value;

    setFormData({
      ...formData,
      services: updated,
    });
  };

  const handleProductChange = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...formData.products,
    ];

    updated[index][field] = value;

    setFormData({
      ...formData,
      products: updated,
    });
  };


  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer ID"
          className="border p-2 w-full mb-3"
          onChange={e =>
            setFormData({
              ...formData,
              customer:
                e.target.value,
            })
          }
        />

        <h2 className="font-bold mb-2">
          Services
        </h2>

        {formData.services.map(
          (service, index) => (
            <div
              key={index}
              className="flex gap-2 mb-2"
            >
              <input
                type="text"
                placeholder="Service ID"
                className="border p-2"
                onChange={e =>
                  handleServiceChange(
                    index,
                    "service",
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-2"
                onChange={e =>
                  handleServiceChange(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />
            </div>
          )
        )}

        <button
          type="button"
          className="bg-black text-white px-3 py-2 mb-4"
          onClick={() =>
            setFormData({
              ...formData,
              services: [
                ...formData.services,
                {
                  service: "",
                  price: "",
                },
              ],
            })
          }
        >
          Add Service
        </button>

        <h2 className="font-bold mb-2">
          Products
        </h2>

        {formData.products.map(
          (product, index) => (
            <div
              key={index}
              className="flex gap-2 mb-2"
            >
              <input
                type="text"
                placeholder="Product ID"
                className="border p-2"
                onChange={e =>
                  handleProductChange(
                    index,
                    "product",
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-2"
                onChange={e =>
                  handleProductChange(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Qty"
                className="border p-2"
                onChange={e =>
                  handleProductChange(
                    index,
                    "qty",
                    e.target.value
                  )
                }
              />
            </div>
          )
        )}

        <button
          type="button"
          className="bg-black text-white px-3 py-2 mb-4"
          onClick={() =>
            setFormData({
              ...formData,
              products: [
                ...formData.products,
                {
                  product: "",
                  price: "",
                  qty: "",
                },
              ],
            })
          }
        >
          Add Product
        </button>

        <input
          type="number"
          placeholder="Discount"
          className="border p-2 w-full mb-3"
          onChange={e =>
            setFormData({
              ...formData,
              discount:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-4"
          onChange={e =>
            setFormData({
              ...formData,
              paymentMethod:
                e.target.value,
            })
          }
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Generate Invoice
        </button>
      </form>

      {invoice && (
        <InvoicePreview
          invoice={invoice}
        />
      )}
    </div>
  );
};

export default InvoiceForm;
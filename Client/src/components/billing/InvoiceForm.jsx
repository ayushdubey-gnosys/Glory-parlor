import React, { useMemo, useState } from "react";

import { useGenerateInvoice } from "../../services/billing/useBillingMutation";
import { useCustomers } from "../../services/customers/useCustomerQuery";
import { useCreateCustomer } from "../../services/customers/useCustomerMutation";
import { useServices } from "../../services/Services/useServiceQuery";
import { useProducts } from "../../services/inventory/useInventoryQuery";

import InvoicePreview from "./InvoicePreview";

const InvoiceForm = () => {
  const { mutateAsync } = useGenerateInvoice();

  const { data: customers = [] } = useCustomers();
  const { data: services = [] } = useServices();
  const { data: products = [] } = useProducts();

  const [invoice, setInvoice] = useState(null);

  const [formData, setFormData] = useState({
    customer: null, // will store { _id, name }

    services: [
      {
        service: "",
        price: 0,
      },
    ],

    products: [
      {
        product: "",
        price: 0,
        qty: 1,
      },
    ],

    paymentMethod: "Cash",
    discount: 0,
  });

  const [newCustomerPhone, setNewCustomerPhone] = useState("");

  const createCustomerMutation = useCreateCustomer();

  const [customerQuery, setCustomerQuery] = useState("");

  const matchedCustomers = useMemo(() => {
    if (!customerQuery) return [];
    const q = customerQuery.toLowerCase();
    return customers.filter((c) => (c.name || "").toLowerCase().includes(q));
  }, [customerQuery, customers]);

  const handleSelectCustomer = (cust) => {
    setFormData({ ...formData, customer: { _id: cust._id, name: cust.name } });
    setCustomerQuery(cust.name);
  };

  const handleServiceSelect = (index, serviceId) => {
    const svc = services.find((s) => s._id === serviceId) || null;
    const updated = [...formData.services];
    updated[index].service = svc ? svc._id : "";
    updated[index].price = svc ? svc.price || 0 : 0;
    setFormData({ ...formData, services: updated });
  };

  const handleProductSelect = (index, productId) => {
    const prod = products.find((p) => p._id === productId) || null;
    const updated = [...formData.products];
    updated[index].product = prod ? prod._id : "";
    updated[index].price = prod ? prod.price || 0 : 0;
    if (!updated[index].qty) updated[index].qty = 1;
    setFormData({ ...formData, products: updated });
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...formData.services];
    updated[index][field] = value;
    setFormData({ ...formData, services: updated });
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = value;
    setFormData({ ...formData, products: updated });
  };

  const addService = () => {
    setFormData({ ...formData, services: [...formData.services, { service: "", price: 0 }] });
  };

  const removeService = (index) => {
    const updated = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updated.length ? updated : [{ service: "", price: 0 }] });
  };

  const addProduct = () => {
    setFormData({ ...formData, products: [...formData.products, { product: "", price: 0, qty: 1 }] });
  };

  const removeProduct = (index) => {
    const updated = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updated.length ? updated : [{ product: "", price: 0, qty: 1 }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let customerId = null;

    if (formData.customer && formData.customer._id) {
      customerId = formData.customer._id;
    } else if (customerQuery && !formData.customer) {
      // create new customer with provided name and phone
      if (!newCustomerPhone) {
        return alert("Please provide phone number for new customer");
      }

      try {
        const created = await createCustomerMutation.mutateAsync({
          name: customerQuery,
          phone: newCustomerPhone,
          email: "",
        });

        customerId = created._id || created.id;
        // set selection to created customer for preview
        setFormData({ ...formData, customer: { _id: customerId, name: created.name, phone: created.phone } });
      } catch (err) {
        console.error("Create customer failed", err);
        return alert("Failed to create customer");
      }
    } else {
      return alert("Please select a customer from the list or enter a new one");
    }

    let total = 0;

    formData.products.forEach((p) => {
      total += Number(p.price || 0) * Number(p.qty || 0);
    });

    formData.services.forEach((s) => {
      total += Number(s.price || 0);
    });

    const payload = {
      customer: formData.customer._id,
      services: formData.services.map((s) => ({ service: s.service, price: s.price })),
      products: formData.products.map((p) => ({ product: p.product, price: p.price, qty: p.qty })),
      paymentMethod: formData.paymentMethod,
      discount: Number(formData.discount || 0),
      totalAmount: total,
      finalAmount: total - Number(formData.discount || 0),
    };

    const res = await mutateAsync(payload);
    // build enriched services/products with names for preview
    const enrichedServices = payload.services.map((s) => {
      const svc = services.find((x) => x._id === s.service) || {};
      return { ...s, name: svc.name || "" };
    });

    const enrichedProducts = payload.products.map((p) => {
      const prod = products.find((x) => x._id === p.product) || {};
      return { ...p, name: prod.name || "" };
    });

    const invoiceOut = {
      ...res,
      customer: formData.customer ? formData.customer : { _id: customerId, name: customerQuery, phone: newCustomerPhone },
      services: enrichedServices,
      products: enrichedProducts,
      totalAmount: payload.totalAmount,
      finalAmount: payload.finalAmount,
    };

    setInvoice(invoiceOut);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 relative">
          <input
            type="text"
            placeholder="Search customer by name"
            className="border p-2 w-full"
            value={customerQuery}
            onChange={(e) => {
              setCustomerQuery(e.target.value);
              // clear selection if typing
              setFormData({ ...formData, customer: null });
            }}
          />

          {customerQuery && matchedCustomers.length > 0 && (
            <div className="absolute z-40 bg-white border w-full mt-1 max-h-40 overflow-y-auto">
              {matchedCustomers.map((c) => (
                <div
                  key={c._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCustomer(c)}
                >
                  {c.name} — {c.phone}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New-customer phone input (shown when a customer is not selected) */}
        {!formData.customer && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Phone (WhatsApp) for new customer"
              className="border p-2 w-full"
              value={newCustomerPhone}
              onChange={(e) => setNewCustomerPhone(e.target.value)}
            />
          </div>
        )}

        <h2 className="font-bold mb-2">Services</h2>

        {formData.services.map((service, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <select
              className="border p-2 flex-1"
              value={service.service}
              onChange={(e) => handleServiceSelect(index, e.target.value)}
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} — {s.price}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-36"
              value={service.price}
              onChange={(e) => handleServiceChange(index, "price", e.target.value)}
            />

            <button type="button" className="text-sm text-red-600" onClick={() => removeService(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" className="bg-black text-white px-3 py-2 mb-4" onClick={addService}>
          Add Service
        </button>

        <h2 className="font-bold mb-2">Products</h2>

        {formData.products.map((product, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <select
              className="border p-2"
              value={product.product}
              onChange={(e) => handleProductSelect(index, e.target.value)}
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} — {p.price}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-32"
              value={product.price}
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
            />

            <input
              type="number"
              placeholder="Qty"
              className="border p-2 w-24"
              value={product.qty}
              onChange={(e) => handleProductChange(index, "qty", e.target.value)}
            />

            <button type="button" className="text-sm text-red-600" onClick={() => removeProduct(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" className="bg-black text-white px-3 py-2 mb-4" onClick={addProduct}>
          Add Product
        </button>

        <input
          type="number"
          placeholder="Discount"
          className="border p-2 w-full mb-3"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-4"
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">Generate Invoice</button>
      </form>

      {invoice && <InvoicePreview invoice={invoice} />}
    </div>
  );
};

export default InvoiceForm;
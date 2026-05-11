// InvoiceForm.jsx

import React, {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Trash2,
  Search,
  User,
  ShoppingBag,
  Scissors,
} from "lucide-react";

import { toast } from "react-toastify";

import { useGenerateInvoice } from "../../services/billing/useBillingMutation";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import { useCreateCustomer } from "../../services/customers/useCustomerMutation";

import { useServices } from "../../services/Services/useServiceQuery";

import { useProducts } from "../../services/inventory/useInventoryQuery";

import InvoicePreview from "./InvoicePreview";

const InvoiceForm = () => {
  const generateInvoiceMutation =
    useGenerateInvoice();

  const {
    mutateAsync: generateAsync,
    isLoading: isGenerating,
  } = generateInvoiceMutation;

  // CUSTOMERS

  const {
    data: customersData,
  } = useCustomers();

  const customers =
    Array.isArray(
      customersData
    )
      ? customersData
      : customersData?.customers ||
        [];

  // SERVICES

  const {
    data: servicesData,
  } = useServices();

  const services =
    Array.isArray(
      servicesData
    )
      ? servicesData
      : servicesData?.services ||
        [];

  // PRODUCTS

  const {
    data: productsData,
  } = useProducts();

  const products =
    Array.isArray(
      productsData
    )
      ? productsData
      : productsData?.products ||
        [];

  // CREATE CUSTOMER

  const createCustomerMutation =
    useCreateCustomer();

  const {
    mutateAsync:
      createCustomerAsync,
    isLoading: isCreating,
  } =
    createCustomerMutation;

  const [invoice, setInvoice] =
    useState(null);

  const [
    customerQuery,
    setCustomerQuery,
  ] = useState("");

  const [
    newCustomerPhone,
    setNewCustomerPhone,
  ] = useState("");

  const [formData, setFormData] =
    useState({
      customer: null,

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

      paymentMethod:
        "Cash",

      discount: 0,
    });

  // SEARCH CUSTOMER

  const matchedCustomers =
    useMemo(() => {
      if (
        !customerQuery
      )
        return [];

      return customers.filter(
        (c) =>
          c.name
            ?.toLowerCase()
            .includes(
              customerQuery.toLowerCase()
            ) ||
          c.phone?.includes(
            customerQuery
          )
      );
    }, [
      customerQuery,
      customers,
    ]);

  // SELECT CUSTOMER

  const handleSelectCustomer =
    (cust) => {
      setFormData((prev) => ({
        ...prev,

        customer: {
          _id: cust._id,

          name: cust.name,

          phone: cust.phone,

          email:
            cust.email || "",

          address:
            cust.address ||
            "",
        },
      }));

      setCustomerQuery(
        cust.name
      );

      setNewCustomerPhone(
        cust.phone
      );
    };

  // SERVICE SELECT

  const handleServiceSelect =
    (
      index,
      serviceId
    ) => {
      const svc =
        services.find(
          (s) =>
            s._id ===
            serviceId
        );

      const updated = [
        ...formData.services,
      ];

      updated[index] = {
        service:
          svc?._id ||
          "",

        price:
          svc?.price ||
          0,
      };

      setFormData({
        ...formData,
        services:
          updated,
      });
    };

  // PRODUCT SELECT

  const handleProductSelect =
    (
      index,
      productId
    ) => {
      const prod =
        products.find(
          (p) =>
            p._id ===
            productId
        );

      const updated = [
        ...formData.products,
      ];

      updated[index] = {
        product:
          prod?._id ||
          "",

        price:
          prod
            ?.sellingPrice ||
          0,

        qty: 1,
      };

      setFormData({
        ...formData,
        products:
          updated,
      });
    };

  // SERVICE CHANGE

  const handleServiceChange =
    (
      index,
      field,
      value
    ) => {
      const updated = [
        ...formData.services,
      ];

      updated[index][field] =
        value;

      setFormData({
        ...formData,
        services:
          updated,
      });
    };

  // PRODUCT CHANGE

  const handleProductChange =
    (
      index,
      field,
      value
    ) => {
      const updated = [
        ...formData.products,
      ];

      updated[index][field] =
        value;

      setFormData({
        ...formData,
        products:
          updated,
      });
    };

  // ADD SERVICE

  const addService = () => {
    setFormData({
      ...formData,

      services: [
        ...formData.services,

        {
          service: "",
          price: 0,
        },
      ],
    });
  };

  // REMOVE SERVICE

  const removeService =
    (index) => {
      const updated =
        formData.services.filter(
          (_, i) =>
            i !== index
        );

      setFormData({
        ...formData,

        services:
          updated.length
            ? updated
            : [
                {
                  service:
                    "",

                  price: 0,
                },
              ],
      });
    };

  // ADD PRODUCT

  const addProduct = () => {
    setFormData({
      ...formData,

      products: [
        ...formData.products,

        {
          product: "",
          price: 0,
          qty: 1,
        },
      ],
    });
  };

  // REMOVE PRODUCT

  const removeProduct =
    (index) => {
      const updated =
        formData.products.filter(
          (_, i) =>
            i !== index
        );

      setFormData({
        ...formData,

        products:
          updated.length
            ? updated
            : [
                {
                  product:
                    "",

                  price: 0,

                  qty: 1,
                },
              ],
      });
    };

  // SUBMIT

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        let customerId =
          null;

        let createdCustomer =
          null;

        // EXISTING CUSTOMER

        if (
          formData.customer
            ?._id
        ) {
          customerId =
            formData.customer
              ._id;
        } else {
          // CHECK IF PHONE EXISTS

          const existing =
            customers.find(
              (c) =>
                c.phone ===
                newCustomerPhone
            );

          if (existing) {
            customerId =
              existing._id;

            createdCustomer =
              existing;
          } else {
            // CREATE CUSTOMER

            if (!customerQuery || !newCustomerPhone) {
              toast.error("Customer name & phone required");
              return;
            }

            try {
              createdCustomer = await createCustomerAsync({
                name: customerQuery,
                phone: newCustomerPhone,
              });

              customerId = createdCustomer._id;
            } catch (createErr) {
              // If server reports duplicate key or customer exists, try to reuse cached customer
              const msg = createErr?.response?.data?.message || createErr?.message || "Failed to create customer";

              if (msg && msg.toLowerCase().includes("already exists")) {
                const existingFallback = customers.find((c) => c.phone === newCustomerPhone || (c.name || "").toLowerCase() === customerQuery.toLowerCase());

                if (existingFallback) {
                  createdCustomer = existingFallback;
                  customerId = existingFallback._id;
                  toast.info("Using existing customer record");
                } else {
                  toast.error("Customer already exists — please search and select the customer");
                  return;
                }
              } else {
                console.error("CREATE CUSTOMER ERROR:", createErr);
                toast.error(msg);
                return;
              }
            }
          }
        }

        // TOTALS

        let total = 0;

        formData.services.forEach(
          (s) => {
            total +=
              Number(
                s.price
              ) || 0;
          }
        );

        formData.products.forEach(
          (p) => {
            total +=
              (Number(
                p.price
              ) || 0) *
              (Number(
                p.qty
              ) || 0);
          }
        );

        const discount =
          Number(
            formData.discount
          ) || 0;

        const payload = {
          customer:
            customerId,

          services:
            formData.services,

          products:
            formData.products,

          paymentMethod:
            formData.paymentMethod,

          discount,

          totalAmount:
            total,

          finalAmount:
            total -
            discount,
        };

        // GENERATE INVOICE

        const invoiceRes =
          await generateAsync(
            payload
          );

        // CUSTOMER DATA

        const selectedCustomerData =
          customers.find(
            (c) =>
              c._id ===
              customerId
          ) ||
          createdCustomer;

        // PREVIEW

        const preview = {
          ...invoiceRes,

          customer: {
            _id:
              selectedCustomerData?._id,

            name:
              selectedCustomerData?.name ||
              customerQuery,

            phone:
              selectedCustomerData?.phone ||
              newCustomerPhone,

            email:
              selectedCustomerData?.email ||
              "",

            address:
              selectedCustomerData?.address ||
              "",
          },

          services:
            formData.services.map(
              (s) => ({
                ...s,

                service:
                  services.find(
                    (
                      sv
                    ) =>
                      sv._id ===
                      s.service
                  ) || {
                    name: "Service",
                  },
              })
            ),

          products:
            formData.products.map(
              (p) => ({
                ...p,

                product:
                  products.find(
                    (
                      pr
                    ) =>
                      pr._id ===
                      p.product
                  ) || {
                    name: "Product",
                  },
              })
            ),

          totalAmount:
            payload.totalAmount,

          finalAmount:
            payload.finalAmount,

          discount,

          paymentMethod:
            payload.paymentMethod,
        };

        setInvoice(
          preview
        );

        toast.success(
          "Invoice generated successfully"
        );
      } catch (err) {
        console.log(
          "INVOICE ERROR:",
          err
        );

        toast.error(
          err?.response?.data
            ?.message ||
            "Invoice failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Billing
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-8"
        >

          {/* CUSTOMER */}

          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <User size={20} />
              Customer
            </h2>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-4 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Search customer..."
                value={
                  customerQuery
                }
                onChange={(
                  e
                ) => {
                  setCustomerQuery(
                    e.target
                      .value
                  );

                  setFormData({
                    ...formData,
                    customer:
                      null,
                  });
                }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none"
              />

              {matchedCustomers.length >
                0 && (
                <div className="absolute w-full bg-zinc-900 border border-zinc-800 rounded-2xl mt-2 z-50 overflow-hidden">
                  {matchedCustomers.map(
                    (
                      c
                    ) => (
                      <div
                        key={
                          c._id
                        }
                        onClick={() =>
                          handleSelectCustomer(
                            c
                          )
                        }
                        className="p-4 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800"
                      >
                        {
                          c.name
                        }{" "}
                        -{" "}
                        {
                          c.phone
                        }
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {!formData.customer && (
              <input
                type="text"
                placeholder="Phone number"
                value={
                  newCustomerPhone
                }
                onChange={(
                  e
                ) =>
                  setNewCustomerPhone(
                    e.target
                      .value
                  )
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 mt-4 outline-none"
              />
            )}
          </div>

          {/* SERVICES */}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Scissors size={20} />
                Services
              </h2>

              <button
                type="button"
                onClick={
                  addService
                }
                className="bg-white text-black px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {formData.services.map(
                (
                  service,
                  index
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <select
                      value={
                        service.service
                      }
                      onChange={(
                        e
                      ) =>
                        handleServiceSelect(
                          index,
                          e.target
                            .value
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
                    >
                      <option value="">
                        Select Service
                      </option>

                      {services.map(
                        (
                          s
                        ) => (
                          <option
                            key={
                              s._id
                            }
                            value={
                              s._id
                            }
                          >
                            {
                              s.name
                            }
                          </option>
                        )
                      )}
                    </select>

                    <input
                      type="number"
                      value={
                        service.price
                      }
                      onChange={(
                        e
                      ) =>
                        handleServiceChange(
                          index,
                          "price",
                          e.target
                            .value
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeService(
                          index
                        )
                      }
                      className="bg-red-500 rounded-2xl"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* PRODUCTS */}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ShoppingBag size={20} />
                Products
              </h2>

              <button
                type="button"
                onClick={
                  addProduct
                }
                className="bg-white text-black px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {formData.products.map(
                (
                  product,
                  index
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <select
                      value={
                        product.product
                      }
                      onChange={(
                        e
                      ) =>
                        handleProductSelect(
                          index,
                          e.target
                            .value
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
                    >
                      <option value="">
                        Select Product
                      </option>

                      {products.map(
                        (
                          p
                        ) => (
                          <option
                            key={
                              p._id
                            }
                            value={
                              p._id
                            }
                          >
                            {
                              p.name
                            }
                          </option>
                        )
                      )}
                    </select>

                    <input
                      type="number"
                      value={
                        product.price
                      }
                      onChange={(
                        e
                      ) =>
                        handleProductChange(
                          index,
                          "price",
                          e.target
                            .value
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
                    />

                    <input
                      type="number"
                      value={
                        product.qty
                      }
                      onChange={(
                        e
                      ) =>
                        handleProductChange(
                          index,
                          "qty",
                          e.target
                            .value
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeProduct(
                          index
                        )
                      }
                      className="bg-red-500 rounded-2xl"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* PAYMENT */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Discount"
              value={
                formData.discount
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  discount:
                    e.target
                      .value,
                })
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
            />

            <select
              value={
                formData.paymentMethod
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  paymentMethod:
                    e.target
                      .value,
                })
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
            >
              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Card
              </option>
            </select>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={
              isGenerating ||
              isCreating
            }
            className="w-full py-4 rounded-2xl text-lg font-bold bg-white text-black hover:bg-zinc-200 transition"
          >
            {isGenerating ||
            isCreating
              ? "Generating..."
              : "Generate Invoice"}
          </button>
        </form>

        {/* PREVIEW */}

        {invoice && (
          <InvoicePreview
            invoice={
              invoice
            }
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;
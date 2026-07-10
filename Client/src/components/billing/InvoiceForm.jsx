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
  Sparkles,
  Receipt,
  Tag,
  Check,
  X,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
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

        const discountPercent =
          Number(
            formData.discount
          ) || 0;

        const discountAmount =
          (total * discountPercent) / 100;

        const payload = {
          customer:
            customerId,

          services:
            formData.services,

          products:
            formData.products,

          paymentMethod:
            formData.paymentMethod,

          discountPercent,

          discount:
            discountAmount,

          totalAmount:
            total,

          finalAmount:
            Math.max(0, total - discountAmount),
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

          discount:
            discountAmount,

          discountPercent,

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

  const currentServicesTotal = useMemo(() => {
    return formData.services.reduce(
      (acc, item) => acc + (Number(item.price) || 0),
      0
    );
  }, [formData.services]);

  const currentProductsTotal = useMemo(() => {
    return formData.products.reduce(
      (acc, item) =>
        acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0
    );
  }, [formData.products]);

  const currentSubtotal =
    currentServicesTotal + currentProductsTotal;
  const currentDiscountPercent =
    Number(formData.discount) || 0;
  const currentDiscountAmount =
    (currentSubtotal * currentDiscountPercent) / 100;
  const currentFinalAmount = Math.max(
    0,
    currentSubtotal - currentDiscountAmount
  );

  return (
    <div className="pb-16 text-zinc-800 dm">
      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-[#292B2B] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-[#D68B2A] text-xs px-3.5 py-1 rounded-full uppercase tracking-[2px] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} /> Luxury POS Terminal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Billing &{" "}
            <span className="text-[#D68B2A] font-normal">
              Invoicing
            </span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl leading-relaxed">
            Create professional itemized invoices for salon appointments, specialist treatments, and retail products.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* LEFT COLUMN: BUILDER PANEL (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* CUSTOMER SECTION */}
          <div className="bg-white border border-zinc-200 shadow-xl shadow-black/[0.03] rounded-3xl p-6 md:p-8 transition-all">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <h2 className="flex items-center gap-3 text-lg font-semibold text-zinc-900">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-yellow-500/80 to-yellow-800 flex items-center justify-center text-white shadow-md shadow-yellow-500/20">
                  <User size={18} />
                </div>
                <span>Customer Information</span>
              </h2>
              {formData.customer && (
                <span className="text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Check size={13} /> Record Selected
                </span>
              )}
            </div>

            {/* SEARCH OR SELECTED CUSTOMER DISPLAY */}
            {formData.customer ? (
              <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#D68B2A]/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#292B2B] text-[#D68B2A] flex items-center justify-center text-lg font-bold shadow-md">
                    {formData.customer.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-lg">
                      {formData.customer.name}
                    </h3>
                    <p className="text-sm text-zinc-500 flex items-center gap-2 mt-0.5">
                      <Phone size={14} className="text-[#D68B2A]" />
                      {formData.customer.phone}
                      {formData.customer.email && (
                        <span className="hidden sm:inline">
                          • {formData.customer.email}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, customer: null });
                    setCustomerQuery("");
                    setNewCustomerPhone("");
                  }}
                  className="p-2.5 rounded-xl hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition"
                  title="Change Customer"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-4 text-zinc-400"
                  />
                  <input
                    type="text"
                    placeholder="Search existing customer by name or phone number..."
                    value={customerQuery}
                    onChange={(e) => {
                      setCustomerQuery(e.target.value);
                      setFormData({ ...formData, customer: null });
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#D68B2A] focus:bg-white focus:ring-4 focus:ring-[#D68B2A]/10 transition font-medium"
                  />

                  {matchedCustomers.length > 0 && (
                    <div className="absolute w-full bg-white border border-zinc-200 rounded-2xl mt-2 z-50 overflow-hidden shadow-2xl max-h-64 overflow-y-auto">
                      {matchedCustomers.map((c) => (
                        <div
                          key={c._id}
                          onClick={() => handleSelectCustomer(c)}
                          className="p-3.5 hover:bg-[#faf9f5] cursor-pointer border-b border-zinc-100 last:border-0 flex items-center justify-between transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center font-bold text-xs">
                              {c.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-zinc-800">
                                {c.name}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {c.phone}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-[#D68B2A] bg-[#D68B2A]/10 px-2.5 py-1 rounded-lg">
                            Select
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!formData.customer && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                    <p className="text-xs text-amber-800 font-medium mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-[#D68B2A]" />
                      If customer is new, enter name above & phone below (record will be created upon invoice generation):
                    </p>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-3.5 text-zinc-400"
                      />
                      <input
                        type="text"
                        placeholder="Customer phone number (e.g., 9876543210)"
                        value={newCustomerPhone}
                        onChange={(e) => setNewCustomerPhone(e.target.value)}
                        className="w-full bg-white border border-amber-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#D68B2A] focus:ring-2 focus:ring-[#D68B2A]/20 transition"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SERVICES SECTION */}
          <div className="bg-white border border-zinc-200 shadow-xl shadow-black/[0.03] rounded-3xl p-6 md:p-8 transition-all">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <h2 className="flex items-center gap-3 text-lg font-semibold text-zinc-900">
                <div className="w-10 h-10 rounded-2xl bg-[#292B2B] flex items-center justify-center text-[#D68B2A] shadow-md">
                  <Scissors size={18} />
                </div>
                <div>
                  <span>Salon Services</span>
                  <p className="text-xs text-zinc-400 font-normal mt-0.5">
                    Select treatments & appointments
                  </p>
                </div>
              </h2>

              <button
                type="button"
                onClick={addService}
                className="bg-[#292B2B] hover:bg-black text-[#D68B2A] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition shadow-md"
              >
                <Plus size={15} />
                Add Service
              </button>
            </div>

            <div className="space-y-3.5">
              {formData.services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-[#faf9f5]/70 border border-zinc-200/80 hover:border-[#D68B2A]/40 transition flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="w-full sm:flex-1">
                    <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Service Type #{index + 1}
                    </label>
                    <select
                      value={service.service}
                      onChange={(e) =>
                        handleServiceSelect(index, e.target.value)
                      }
                      className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-800 outline-none focus:border-[#D68B2A] transition"
                    >
                      <option value="">Select Service...</option>
                      {services.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name} — ₹{s.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full sm:w-44">
                    <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-zinc-400 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-full bg-white border border-zinc-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-[#D68B2A] transition text-right"
                      />
                    </div>
                  </div>

                  <div className="sm:pt-6 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition"
                      title="Remove Service"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCTS SECTION */}
          <div className="bg-white border border-zinc-200 shadow-xl shadow-black/[0.03] rounded-3xl p-6 md:p-8 transition-all">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <h2 className="flex items-center gap-3 text-lg font-semibold text-zinc-900">
                <div className="w-10 h-10 rounded-2xl bg-[#292B2B] flex items-center justify-center text-[#D68B2A] shadow-md">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <span>Retail Products</span>
                  <p className="text-xs text-zinc-400 font-normal mt-0.5">
                    Shampoos, serums & boutique items
                  </p>
                </div>
              </h2>

              <button
                type="button"
                onClick={addProduct}
                className="bg-[#292B2B] hover:bg-black text-[#D68B2A] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition shadow-md"
              >
                <Plus size={15} />
                Add Product
              </button>
            </div>

            <div className="space-y-3.5">
              {formData.products.map((product, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-[#faf9f5]/70 border border-zinc-200/80 hover:border-[#D68B2A]/40 transition flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="w-full sm:flex-1">
                    <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Product #{index + 1}
                    </label>
                    <select
                      value={product.product}
                      onChange={(e) =>
                        handleProductSelect(index, e.target.value)
                      }
                      className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-800 outline-none focus:border-[#D68B2A] transition"
                    >
                      <option value="">Select Product...</option>
                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} — ₹{p.sellingPrice || p.price || 0}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full sm:w-36">
                    <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Unit Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-zinc-400 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-full bg-white border border-zinc-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-[#D68B2A] transition text-right"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-28">
                    <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={product.qty}
                      onChange={(e) =>
                        handleProductChange(index, "qty", e.target.value)
                      }
                      className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-[#D68B2A] transition text-center"
                    />
                  </div>

                  <div className="sm:pt-6 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition"
                      title="Remove Product"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY CHECKOUT SUMMARY (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-[#292B2B] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 relative z-10">
              <h3 className="text-lg font-semibold tracking-wide flex items-center gap-2 text-yellow-500">
                <Receipt size={20} /> Payment Summary
              </h3>
            </div>

            <div className="space-y-4 relative z-10 text-sm">
              <div className="flex justify-between items-center text-zinc-300">
                <span>Services ({formData.services.filter((s) => s.service).length})</span>
                <span className="font-mono font-medium text-white">
                  ₹{currentServicesTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-300">
                <span>Products ({formData.products.filter((p) => p.product).length})</span>
                <span className="font-mono font-medium text-white">
                  ₹{currentProductsTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 text-zinc-200 font-semibold border-t border-white/10">
                <span>Subtotal</span>
                <span className="font-mono text-base">
                  ₹{currentSubtotal.toLocaleString()}
                </span>
              </div>

              {/* DISCOUNT ROW (%) */}
              <div className="py-3 px-3.5 bg-white/[0.04] rounded-2xl border border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-zinc-300 text-xs flex items-center gap-1.5 font-medium">
                    <Tag size={15} className="text-[#D68B2A]" /> Discount (%)
                  </span>
                  <div className="relative w-32">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/15 rounded-xl pr-7 pl-3 py-1.5 text-right text-yellow-400 font-bold text-sm focus:outline-none focus:border-yellow-500 transition"
                    />
                    <span className="absolute right-3 top-2 text-yellow-500 font-bold text-xs">
                      %
                    </span>
                  </div>
                </div>
                {currentDiscountPercent > 0 && (
                  <div className="flex justify-between items-center text-[11px] text-emerald-400 border-t border-white/5 pt-2 mt-0.5">
                    <span>Savings ({currentDiscountPercent}%)</span>
                    <span className="font-mono font-bold">
                      - ₹{currentDiscountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#D68B2A]" /> Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
                  {["Cash", "UPI", "Card"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: method })
                      }
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        formData.paymentMethod === method
                          ? "bg-gradient-to-b from-yellow-500/90 to-amber-700 text-white shadow-md shadow-yellow-500/20"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRAND TOTAL */}
              <div className="pt-6 mt-4 border-t border-white/15">
                <div className="flex justify-between items-baseline">
                  <span className="text-zinc-300 font-medium uppercase tracking-wider text-xs">
                    Grand Total
                  </span>
                  <span className="text-3xl lg:text-4xl font-light text-white font-mono tracking-tight text-yellow-500 font-bold">
                    ₹{currentFinalAmount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 text-right mt-1">
                  Inclusive of all taxes & salon service fees
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isGenerating || isCreating}
                className="w-full mt-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-[2px] bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-amber-400 transition-all shadow-xl shadow-yellow-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <Receipt size={18} />
                {isGenerating || isCreating
                  ? "Generating Invoice..."
                  : "Generate Invoice"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* PREVIEW */}
      {invoice && (
        <div id="invoice-preview-section" className="mt-16 pt-8 border-t-2 border-dashed border-[#D68B2A]/30">
          <InvoicePreview invoice={invoice} />
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
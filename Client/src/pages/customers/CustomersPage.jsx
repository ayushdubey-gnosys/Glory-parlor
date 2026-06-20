import React from "react";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import CustomerCard from "../../components/customers/CustomerCard";

import CustomerDetailsModal from "../../components/customers/CustomerDetailsModal";
import CreateCustomerModal from "../../components/customers/CreateCustomerModal";

const CustomersPage = () => {
  const [page, setPage] =
    React.useState(1);

  // SHOW ONLY 10 CUSTOMERS
  const [limit] =
    React.useState(10);

  const [category, setCategory] =
    React.useState("");

  const [status, setStatus] =
    React.useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useCustomers({
    page,
    limit,
    category,
    status,
  });

  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = React.useState(null);

  const [modalOpen, setModalOpen] =
    React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);

  if (isLoading)
    return (
      <div className="p-6">
        Loading customers...
      </div>
    );

  if (isError) {
    const msg =
      error?.response?.data
        ?.message ||
      error?.message ||
      "Failed to load customers";

    return (
      <div className="p-6">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-4">
          Customers
        </h1>

        <div className="text-red-400 dm bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
          {msg}
        </div>
      </div>
    );
  }

  // SUPPORT MULTIPLE RESPONSE SHAPES
  const customers =
    Array.isArray(data)
      ? data
      : Array.isArray(data?.customers)
      ? data.customers
      : Array.isArray(data?.data)
      ? data.data
      : [];

  const total =
    data?.total ??
    data?.totalItems ??
    0;

  const pages =
    data?.pages ??
    data?.totalPages ??
    1;

  if (!customers.length) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-serif text-gray-900 tracking-wide mb-4">
          Customers
        </h1>

        <div className="text-gray-500 dm bg-white border border-gray-100 p-8 rounded-3xl text-center shadow-sm">
          No customers found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        
        <div>
          <p className="dm text-[11px] uppercase tracking-[3px] text-[#c9a96e] mb-1">
            Client Management
          </p>
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 tracking-wide">
            Customers
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-gradient-to-b from-yellow-500/80 to-yellow-800 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-all dm text-sm font-light"
          >
            Add Customer
          </button>
          
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(
                  e.target.value
                );

                setPage(1);
              }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
            >
              <option value="">
                All categories
              </option>

              <option value="premium">
                Premium
              </option>

              <option value="middle">
                Middle
              </option>

              <option value="economy">
                Economy
              </option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
            >
              <option value="">All Statuses</option>
              <option value="active">Active (Online)</option>
              <option value="inactive">Inactive (Offline)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div className="text-sm text-[#c9a96e] dm font-light w-16">
            {isFetching
              ? "Updating..."
              : ""}
          </div>
        </div>
      </div>

      {/* CUSTOMER GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        
        {customers.map(
          (customer) => (
            <CustomerCard
              key={customer._id}
              customer={customer}
              onClick={(c) => {
                setSelectedCustomerId(
                  c._id
                );

                setModalOpen(true);
              }}
            />
          )
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-12 dm">
        
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) => prev - 1
            )
          }
          className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium shadow-sm"
        >
          Prev
        </button>

        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{pages}</span>
        </div>

        <button
          disabled={page === pages}
          onClick={() =>
            setPage(
              (prev) => prev + 1
            )
          }
          className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium shadow-sm"
        >
          Next
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-center text-sm text-gray-500 mt-6 dm tracking-wide font-medium">
        Total Customers: <span className="text-[#D68B2A]">{total}</span>
      </div>

      {/* MODAL */}
      <CustomerDetailsModal
        customerId={
          selectedCustomerId
        }
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);

          setSelectedCustomerId(
            null
          );
        }}
      />
      <CreateCustomerModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
};

export default CustomersPage;
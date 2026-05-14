import React from "react";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import CustomerCard from "../../components/customers/CustomerCard";

import CustomerDetailsModal from "../../components/customers/CustomerDetailsModal";

const CustomersPage = () => {
  const [page, setPage] =
    React.useState(1);

  // SHOW ONLY 6 CUSTOMERS
  const [limit] =
    React.useState(9);

  const [category, setCategory] =
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
  });

  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = React.useState(null);

  const [modalOpen, setModalOpen] =
    React.useState(false);

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
        <h1 className="text-3xl font-bold mb-4">
          Customers
        </h1>

        <div className="text-red-400">
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
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Customers
        </h1>

        <div className="text-zinc-400">
          No customers found.
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <div className="flex items-center gap-4">
          
          <select
            value={category}
            onChange={(e) => {
              setCategory(
                e.target.value
              );

              setPage(1);
            }}
            className="border rounded-xl px-4 py-2"
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

          <div className="text-sm text-gray-500">
            {isFetching
              ? "Updating..."
              : ""}
          </div>
        </div>
      </div>

      {/* CUSTOMER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        
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
      <div className="flex items-center justify-center gap-3 mt-10">
        
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) => prev - 1
            )
          }
          className="px-4 py-2 rounded-xl border border-zinc-300 disabled:opacity-50"
        >
          Prev
        </button>

        <div className="text-sm font-medium">
          Page {page} of {pages}
        </div>

        <button
          disabled={page === pages}
          onClick={() =>
            setPage(
              (prev) => prev + 1
            )
          }
          className="px-4 py-2 rounded-xl border border-zinc-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-center text-sm text-zinc-500 mt-4">
        Total Customers: {total}
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
    </div>
  );
};

export default CustomersPage;
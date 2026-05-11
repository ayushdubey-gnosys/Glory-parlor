import React from "react";
import { useCustomers } from "../../services/customers/useCustomerQuery";
import CustomerCard from "../../components/customers/CustomerCard";
import CustomerDetailsModal from "../../components/customers/CustomerDetailsModal";

const CustomersPage = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(12);
  const [category, setCategory] = React.useState("");

  const { data, isLoading, isError, error, isFetching } = useCustomers({ page, limit, category });

  const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  // debug
  console.log("customers raw data:", data);

  if (isLoading) return <div className="p-6">Loading customers...</div>;

  if (isError) {
    console.error("Failed to load customers", error);
    const msg = error?.response?.data?.message || error?.message || "Failed to load customers";
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Customers</h1>
        <div className="text-red-400">{msg}</div>
      </div>
    );
  }

  // Accept multiple shapes: array | { customers: [] } | { data: [] }
  const customers = Array.isArray(data)
    ? data
    : Array.isArray(data?.customers)
    ? data.customers
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const total = data?.total ?? data?.totalItems ?? 0;
  const pages = data?.pages ?? data?.totalPages ?? 1;

  if (!customers.length) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Customers</h1>
        <div className="text-zinc-400">No customers found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Customers</h1>

        <div className="flex items-center gap-4">
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="border rounded p-2">
            <option value="">All categories</option>
            <option value="premium">Premium</option>
            <option value="middle">Middle</option>
            <option value="economy">Economy</option>
          </select>

          <div className="text-sm text-gray-600">{isFetching ? "Updating..." : ""}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <CustomerCard
            key={customer._id}
            customer={customer}
            onClick={(c) => {
              setSelectedCustomerId(c._id);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      <CustomerDetailsModal
        customerId={selectedCustomerId}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomerId(null);
        }}
      />
    </div>
  );
};

export default CustomersPage;
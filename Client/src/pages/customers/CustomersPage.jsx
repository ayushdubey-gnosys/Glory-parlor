import React from "react";
import { useCustomers } from "../../services/customers/useCustomerQuery";
import CustomerCard from "../../components/customers/CustomerCard";
import CustomerDetailsModal from "../../components/customers/CustomerDetailsModal";

const CustomersPage = () => {
  const { data, isLoading } = useCustomers();

  const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const customers = Array.isArray(data) ? data : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Customers</h1>

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
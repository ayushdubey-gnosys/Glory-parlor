import React from "react";
import FormModal from "../Modal/FormModal";
import { useCustomer } from "../../services/customers/useCustomerQuery";

const CustomerDetailsModal = ({ customerId, open, onClose }) => {
  const { data: customer, isLoading } = useCustomer(customerId);

  if (!open) return null;

  return (
    <FormModal open={open} onClose={onClose} title={customer?.name || "Customer details"}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <img
              src={customer?.profilePic || "https://via.placeholder.com/200"}
              alt={customer?.name}
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <div className="font-semibold text-xl">{customer?.name}</div>
            <div className="text-sm text-gray-600">{customer?.email}</div>
            <div className="text-sm text-gray-600">{customer?.phone}</div>
          </div>

          <div>
            <div className="mb-2">
              <div className="font-semibold">Category</div>
              <div>{customer?.category || "--"}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold">Address</div>
              <div>{customer?.address || "--"}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold">Notes</div>
              <div>{customer?.notes || "-"}</div>
            </div>

            <div className="mt-4 text-sm text-gray-500">Joined: {customer?._id ? new Date(customer.createdAt).toLocaleString() : "-"}</div>
          </div>
        </div>
      )}
    </FormModal>
  );
};

export default CustomerDetailsModal;

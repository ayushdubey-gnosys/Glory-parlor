import React, { useState, useEffect } from "react";
import FormModal from "../Modal/FormModal";
import { useCustomer } from "../../services/customers/useCustomerQuery";
import { useAuth } from "../../context/AuthProvider";
import { useUpdateCustomer } from "../../services/customers/useCustomerMutation";

const CustomerDetailsModal = ({ customerId, open, onClose }) => {
  const { data: customer, isLoading, error } = useCustomer(customerId);
  const { user, hasRole } = useAuth();

  const [editingCategory, setEditingCategory] = useState("");
  const updateMutation = useUpdateCustomer();

  useEffect(() => {
    if (customer) setEditingCategory(customer.category || "middle");
  }, [customer]);

  if (!open) return null;

  return (
    <FormModal open={open} onClose={onClose} title={customer?.name || "Customer details"}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">Failed to load customer</div>
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
              {hasRole(["admin", "staff", "superadmin"]) ? (
                <div className="mt-2">
                  <select
                    value={editingCategory}
                    onChange={(e) => setEditingCategory(e.target.value)}
                    className="border rounded px-3 py-1"
                  >
                    <option value="premium">premium</option>
                    <option value="middle">middle</option>
                    <option value="economy">economy</option>
                  </select>
                  <div className="mt-2">
                    <button
                      disabled={updateMutation.isLoading || editingCategory === customer?.category}
                      onClick={() => {
                        updateMutation.mutate({ id: customer._id, payload: { category: editingCategory } });
                      }}
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                      {updateMutation.isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>{customer?.category || "--"}</div>
              )}
            </div>

            <div className="mb-2">
              <div className="font-semibold">Status</div>
              <div>{customer?.status || "active"}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold">Address</div>
              <div>{customer?.address || "--"}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold">Notes</div>
              <div>{customer?.notes || "-"}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold">Created By</div>
              <div>{customer?.createdBy?.name || "-"}</div>
            </div>

            <div className="mt-4 text-sm text-gray-500">Joined: {customer?._id ? new Date(customer.createdAt).toLocaleString() : "-"}</div>
          </div>
        </div>
      )}
    </FormModal>
  );
};

export default CustomerDetailsModal;

import React, {
  useState,
  useEffect,
} from "react";

import FormModal from "../Modal/FormModal";

import {
  useCustomer,
} from "../../services/customers/useCustomerQuery";

import {
  useAuth,
} from "../../context/AuthProvider";

import {
  useUpdateCustomer,
  useDeleteCustomer,
} from "../../services/customers/useCustomerMutation";
import { toast } from "react-toastify";
import { getAvatarUrl } from "../../utils/avatar";

const CustomerDetailsModal = ({
  customerId,
  open,
  onClose,
}) => {
  const {
    data: customer,
    isLoading,
    error,
  } = useCustomer(customerId);

  const { hasRole } = useAuth();

  const [
    editingCategory,
    setEditingCategory,
  ] = useState("");

  const updateMutation =
    useUpdateCustomer();
  const deleteMutation =
    useDeleteCustomer();

  useEffect(() => {
    if (customer) {
      setEditingCategory(
        customer.category || "middle"
      );
    }
  }, [customer]);

  if (!open) return null;

  return (
    <FormModal
      open={open}
      onClose={() => {
        setEditingCategory("");
        onClose?.();
      }}
      title="Customer Profile Details"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-[#D68B2A] dm">
          Loading customer info...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-2xl p-4 dm font-medium border border-red-200">
          Failed to load customer details.
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto text-gray-800 pt-2">
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT */}
            <div className="flex flex-col items-center md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
              <img
                src={getAvatarUrl(customer)}
                alt={customer?.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-amber-50 shadow-md mb-4"
              />

              <h2 className="text-2xl font-serif text-gray-900 text-center font-medium">
                {customer?.name}
              </h2>

              {customer?.email && (
                <p className="text-sm text-gray-500 mt-1 text-center dm">
                  {customer?.email}
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1 dm font-medium">
                {customer?.phone}
              </p>

              <div className="mt-4 bg-[#D68B2A]/10 text-[#D68B2A] border border-[#D68B2A]/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider dm">
                {customer?.category || "middle"}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* STATUS */}
                <div className="bg-zinc-50 border border-gray-100 p-3 rounded-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                    Status
                  </p>
                  <p className="mt-0.5 capitalize text-sm font-medium text-gray-800">
                    {customer?.status || "active"}
                  </p>
                </div>

                {/* GENDER */}
                <div className="bg-zinc-50 border border-gray-100 p-3 rounded-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                    Gender
                  </p>
                  <p className="mt-0.5 capitalize text-sm font-medium text-gray-800">
                    {customer?.gender || "Not provided"}
                  </p>
                </div>

                {/* CREATED BY */}
                <div className="bg-zinc-50 border border-gray-100 p-3 rounded-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                    Created By
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-800 truncate">
                    {customer?.createdBy?.name || "-"}
                  </p>
                </div>

                {/* DOB */}
                <div className="bg-zinc-50 border border-gray-100 p-3 rounded-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                    Date of Birth
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {customer?.dob ? new Date(customer.dob).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Not provided"}
                  </p>
                </div>

                {/* ANNIVERSARY */}
                <div className="bg-zinc-50 border border-gray-100 p-3 rounded-xl sm:col-span-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                    Anniversary
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {customer?.anniversary ? new Date(customer.anniversary).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Not provided"}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="bg-zinc-50 border border-gray-100 p-3.5 rounded-xl">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                  Address
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {customer?.address || "No address provided"}
                </p>
              </div>

              {/* NOTES */}
              <div className="bg-zinc-50 border border-gray-100 p-3.5 rounded-xl">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dm">
                  Notes & Preferences
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {customer?.notes || "No notes available"}
                </p>
              </div>

              {/* JOINED */}
              <div className="flex items-center justify-between px-1 text-xs text-gray-400 dm">
                <span>Joined Date:</span>
                <span className="font-medium text-gray-600">
                  {customer?.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </span>
              </div>

              {/* CATEGORY EDIT & ACTIONS */}
              {hasRole(["admin", "staff", "superadmin"]) && (
                <div className="pt-4 mt-2 border-t border-gray-100 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 dm">
                      Change Category
                    </p>

                    <div className="flex gap-2">
                      <select
                        value={editingCategory}
                        onChange={(e) => setEditingCategory(e.target.value)}
                        className="flex-1 bg-zinc-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] transition-all shadow-sm dm"
                      >
                        <option value="premium">Premium</option>
                        <option value="middle">Middle</option>
                        <option value="economy">Economy</option>
                      </select>

                      <button
                        disabled={
                          updateMutation.isLoading ||
                          editingCategory === customer?.category
                        }
                        onClick={() => {
                          updateMutation.mutate({
                            id: customer._id,
                            payload: {
                              category: editingCategory,
                            },
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#D68B2A] to-[#B57320] text-white font-medium text-sm shadow-md shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all disabled:opacity-50 dm"
                      >
                        {updateMutation.isLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>

                  {/* DELETE CUSTOMER BUTTON */}
                  <div className="pt-2 border-t border-gray-100 flex justify-end">
                    <button
                      type="button"
                      disabled={deleteMutation.isLoading}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete customer "${customer?.name}"? This action cannot be undone.`
                          )
                        ) {
                          deleteMutation.mutate(customer._id, {
                            onSuccess: (res) => {
                              toast.success(res?.message || "Customer deleted successfully");
                              onClose?.();
                            },
                            onError: (err) => {
                              toast.error(
                                err?.response?.data?.message || "Failed to delete customer"
                              );
                            },
                          });
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm dm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      {deleteMutation.isLoading ? "Deleting..." : "Delete Customer"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </FormModal>
  );
};

export default CustomerDetailsModal;
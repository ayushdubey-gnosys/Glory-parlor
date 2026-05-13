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
} from "../../services/customers/useCustomerMutation";

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
      onClose={onClose}
      title=""
    >
      {isLoading ? (
        <div className="text-center py-6">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500">
          Failed to load customer
        </div>
      ) : (
        <div
          className="
            bg-zinc-800
            text-white
            rounded-2xl
            p-6
            w-full
            max-w-2xl
            mx-auto
          "
        >
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* LEFT */}
            <div className="flex flex-col items-center md:w-1/3">
              
              <img
                src={
                  customer?.profilePic ||
                  "https://via.placeholder.com/150"
                }
                alt={customer?.name}
                className="
                  w-28 h-28
                  rounded-full
                  object-cover
                  mb-4
                "
              />

              <h2 className="text-xl font-semibold text-center">
                {customer?.name}
              </h2>

              <p className="text-sm text-zinc-300 mt-1 text-center">
                {customer?.email}
              </p>

              <p className="text-sm text-zinc-400 mt-1">
                {customer?.phone}
              </p>

              <div
                className="
                  mt-4
                  bg-white
                  text-black
                  px-4 py-1
                  rounded-full
                  text-sm
                  capitalize
                  font-medium
                "
              >
                {customer?.category ||
                  "middle"}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 space-y-4">
              
              {/* STATUS */}
              <div>
                <p className="text-sm text-zinc-400">
                  Status
                </p>

                <p className="mt-1 capitalize">
                  {customer?.status ||
                    "active"}
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <p className="text-sm text-zinc-400">
                  Address
                </p>

                <p className="mt-1">
                  {customer?.address ||
                    "--"}
                </p>
              </div>

              {/* NOTES */}
              <div>
                <p className="text-sm text-zinc-400">
                  Notes
                </p>

                <p className="mt-1">
                  {customer?.notes ||
                    "No notes"}
                </p>
              </div>

              {/* CREATED BY */}
              <div>
                <p className="text-sm text-zinc-400">
                  Created By
                </p>

                <p className="mt-1">
                  {customer?.createdBy
                    ?.name || "-"}
                </p>
              </div>

              {/* JOINED */}
              <div>
                <p className="text-sm text-zinc-400">
                  Joined
                </p>

                <p className="mt-1">
                  {customer?.createdAt
                    ? new Date(
                        customer.createdAt
                      ).toLocaleString()
                    : "-"}
                </p>
              </div>

              {/* CATEGORY EDIT */}
              {hasRole([
                "admin",
                "staff",
                "superadmin",
              ]) && (
                <div className="pt-2">
                  
                  <p className="text-sm text-zinc-400 mb-2">
                    Change Category
                  </p>

                  <div className="flex gap-2">
                    
                    <select
                      value={
                        editingCategory
                      }
                      onChange={(e) =>
                        setEditingCategory(
                          e.target.value
                        )
                      }
                      className="
                        flex-1
                        bg-zinc-900
                        border border-zinc-700
                        rounded-lg
                        px-3 py-2
                        text-white
                        outline-none
                      "
                    >
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

                    <button
                      disabled={
                        updateMutation.isLoading ||
                        editingCategory ===
                          customer?.category
                      }
                      onClick={() => {
                        updateMutation.mutate(
                          {
                            id: customer._id,
                            payload: {
                              category:
                                editingCategory,
                            },
                          }
                        );
                      }}
                      className="
                        bg-white
                        text-black
                        px-4
                        rounded-lg
                        font-medium
                        hover:bg-zinc-200
                        transition
                        disabled:opacity-50
                      "
                    >
                      {updateMutation.isLoading
                        ? "Saving..."
                        : "Save"}
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
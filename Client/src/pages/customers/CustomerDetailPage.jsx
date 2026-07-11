import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../../services/customers/useCustomerQuery";
import { getAvatarUrl } from "../../utils/avatar";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: customer, isLoading, error } = useCustomer(id);

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600">&larr; Back</button>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">Error loading customer</div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex gap-6">
            <div className="flex flex-col items-center w-1/3">
              <img src={getAvatarUrl(customer)} alt={customer?.name} className="w-40 h-40 rounded-full object-cover mb-4" />
              <div className="font-semibold text-xl">{customer?.name}</div>
              <div className="text-sm text-gray-600">{customer?.email}</div>
              <div className="text-sm text-gray-600">{customer?.phone}</div>
            </div>

            <div className="flex-1">
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

              <div className="mb-2">
                <div className="font-semibold">Status</div>
                <div>{customer?.status || "active"}</div>
              </div>

              <div className="mt-4 text-sm text-gray-500">Joined: {customer?.createdAt ? new Date(customer.createdAt).toLocaleString() : "-"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailPage;

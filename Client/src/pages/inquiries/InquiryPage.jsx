import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import InquiryForm from "../../components/inquiry/InquiryForm";
import InquiryList from "../../components/inquiry/InquiryList";

import { useServices } from "../../services/Services/useServiceQuery";
import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";

import {
  useCreateInquiry,
  useDeleteInquiry,
} from "../../services/inquiries/useInquiryMutation";
import { useUpdateInquiry } from "../../services/inquiries/useInquiryMutation";

const InquiryPage = () => {
  const queryClient = useQueryClient();

  const { data: services = [] } = useServices();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");

  const navigate = useNavigate();

  const { data: resp, isLoading } = useGetInquiries({ page, limit, q });

  const inquiries = resp?.data || [];
  const total = resp?.total || 0;
  const totalPages = resp?.totalPages || 1;

  const { mutate: createInquiry, isPending } =
    useCreateInquiry();

  const { mutate: deleteInquiry } =
    useDeleteInquiry();

  const handleCreate = (form) => {
    createInquiry(form, {
      onSuccess: () => {
        toast.success("Inquiry Created");

        queryClient.invalidateQueries({
          queryKey: ["inquiries"],
        });
      },

      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            "Failed"
        );
      },
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete inquiry?"))
      return;

    deleteInquiry(id, {
      onSuccess: () => {
        toast.success("Deleted");

        queryClient.invalidateQueries({
          queryKey: ["inquiries"],
        });
      },
    });
  };

  const updateMutation = useUpdateInquiry();

  const handleRespond = (id, responseText) => {
    if (!responseText || !id) return;

    updateMutation.mutate(
      { id, data: { response: responseText, status: "follow-up" } },
      {
        onSuccess: () => {
          toast.success("Response saved");
          queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        },
        onError: () => toast.error("Failed to save response"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Inquiry Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer inquiries
          </p>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FORM */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              
              <h2 className="text-2xl font-semibold mb-6">
                Create Inquiry
              </h2>

              <InquiryForm
                services={services}
                onSubmit={handleCreate}
                loading={isPending}
              />
            </div>
          </div>
          

          {/* LIST */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  All Inquiries
                </h2>

                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold">
                    {total} Total
                  </div>

                  <button
                    onClick={() => navigate("/inquiry")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700"
                  >
                    Create Customer Inquiry
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search inquiries..."
                  className="border rounded-lg px-3 py-2 w-full"
                />
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>

              <InquiryList
                items={inquiries}
                loading={isLoading}
                onDelete={handleDelete}
                onRespond={handleRespond}
              />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  Page {page} of {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
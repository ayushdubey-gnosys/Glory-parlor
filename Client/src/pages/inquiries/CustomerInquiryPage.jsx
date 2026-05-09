import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import InquiryForm from "../../components/inquiry/InquiryForm";
import InquiryList from "../../components/inquiry/InquiryList";
import { useServices } from "../../services/Services/useServiceQuery";
import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";
import { useCreateInquiry, useDeleteInquiry } from "../../services/inquiries/useInquiryMutation";

const CustomerInquiryPage = () => {
  const { data: services } = useServices();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");

  const { data: resp, isLoading } = useGetInquiries({ page, limit, q });
  const inquiries = resp?.data || [];
  const total = resp?.total || 0;
  const totalPages = resp?.totalPages || 1;

  const queryClient = useQueryClient();
  const { mutate: createInquiry, isPending } = useCreateInquiry();
  const { mutate: deleteInquiry } = useDeleteInquiry();

  const handleCreate = (form) => {
    createInquiry(form, {
      onSuccess: () => {
        toast.success("Inquiry created");
        queryClient.invalidateQueries(["inquiries"]);
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Failed to create"),
    });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this inquiry?")) return;
    deleteInquiry(id, {
      onSuccess: () => {
        toast.success("Inquiry deleted");
        queryClient.invalidateQueries(["inquiries"]);
      },
      onError: () => toast.error("Delete failed"),
    });
  };

  return (
    <div className="min-h-screen p-8" style={{ background: "linear-gradient(135deg,#fff7f0 0%,#f0f9ff 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Inquiries</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <InquiryForm services={services} onSubmit={handleCreate} loading={isPending} />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search your inquiries..."
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

            <InquiryList items={inquiries} loading={isLoading} onDelete={handleDelete} />

            <div className="mt-4 flex items-center justify-between">
              <div>Page {page} of {totalPages}</div>

              <div className="flex items-center gap-2">
                <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInquiryPage;

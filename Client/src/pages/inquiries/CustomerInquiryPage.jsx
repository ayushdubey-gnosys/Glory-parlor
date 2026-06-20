import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import InquiryCard from "../../components/inquiry/InquiryCard";
import InquiryList from "../../components/inquiry/InquiryList";
import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";
import { useDeleteInquiry } from "../../services/inquiries/useInquiryMutation";

const CustomerInquiryPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: resp, isLoading } = useGetInquiries({ page, limit, q, status: filter === 'all' ? undefined : filter });
  const inquiries = resp?.data || [];
  const total = resp?.total || inquiries.length;
  const totalPages = resp?.totalPages || Math.max(1, Math.ceil(total / limit));

  const { mutate: deleteInquiry } = useDeleteInquiry();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    deleteInquiry(id, {
      onSuccess: () => {
        toast.success("Inquiry deleted");
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      },
      onError: () => toast.error("Delete failed"),
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">Overview</p>
          <h1 className="text-4xl font-light text-[#D68B2A] tracking-wide">My Inquiries</h1>
          <p className="text-zinc-500 mt-2">Your submitted inquiries</p>
        </div>

        <div className="bg-white border border-[#D68B2A]/10 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search your inquiries..."
                className="flex-1 border border-[#D68B2A]/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 text-sm bg-[#faf9f5]"
              />

              <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} className="border border-[#D68B2A]/20 rounded-xl px-4 py-2.5 bg-[#faf9f5] focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 text-sm">
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="follow-up">Follow-up</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-[#D68B2A] uppercase tracking-wider font-semibold">Total</span>
                <span className="text-lg font-light text-zinc-800">{total}</span>
              </div>

              <button onClick={() => navigate('/inquiries/create')} className="inline-flex items-center gap-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] hover:scale-105 transition-all text-white px-6 py-2.5 rounded-xl font-medium shadow-md">Create Inquiry</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-6 w-40 bg-zinc-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-44 bg-zinc-100 rounded-3xl animate-pulse" />
                  ))}
                </div>
              </div>
            ) : !inquiries.length ? (
              <div className="px-6 py-12 text-center">
                <h3 className="text-lg font-semibold text-zinc-900">No inquiries yet</h3>
                <p className="text-sm text-zinc-500 mt-2">Submit an inquiry to get started.</p>
                <div className="mt-4">
                  <button onClick={() => navigate('/inquiries/create')} className="bg-gradient-to-b from-[#D68B2A] to-[#b57321] hover:scale-105 transition-all text-white px-6 py-2.5 rounded-xl font-medium shadow-md">Create Inquiry</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inquiries.map((inq) => (
                  <InquiryCard key={inq._id || inq.id} inquiry={inq} onDelete={handleDelete} />
                ))}
              </div>
            )}

            {inquiries.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-zinc-500">Page {page} of {totalPages}</div>
                <div className="flex gap-2">
                  <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border bg-white disabled:opacity-50">Prev</button>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border bg-white disabled:opacity-50">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInquiryPage;

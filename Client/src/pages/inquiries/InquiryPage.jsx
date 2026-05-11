import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import InquiryList from "../../components/inquiry/InquiryList";
import InquiryCard from "../../components/inquiry/InquiryCard";
import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";

import {
  useCreateInquiry,
  useDeleteInquiry,
} from "../../services/inquiries/useInquiryMutation";
import { useUpdateInquiry } from "../../services/inquiries/useInquiryMutation";

const InquiryPage = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const { data: resp, isLoading } = useGetInquiries({ page, limit, q, status: filter === 'all' ? undefined : filter });

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
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-zinc-900">Inquiries</h1>
          <p className="text-zinc-500 mt-2">Customer inquiries and follow-ups</p>
        </div>

        {/* ACTIONS + STATS */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search inquiries by name, phone or note..."
                className="flex-1 border border-zinc-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />

              <select
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                className="border border-zinc-200 rounded-xl px-3 py-2 bg-white"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="follow-up">Follow-up</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-zinc-500">Total</span>
                <span className="text-lg font-semibold text-zinc-900">{total}</span>
              </div>

              <button
                onClick={() => navigate("/inquiries/create")}
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-2xl hover:bg-zinc-800"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                Create Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* LIST CARD */}
        <div className="mt-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-zinc-900">All Inquiries</h2>
              <p className="text-sm text-zinc-500 mt-1">Browse and manage inquiries</p>
            </div>

            <div className="space-y-4">
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
                  <p className="text-sm text-zinc-500 mt-2">Create an inquiry to get started.</p>
                  <div className="mt-4">
                    <button onClick={() => navigate("/inquiries/create")} className="bg-zinc-900 text-white px-4 py-2 rounded-2xl">Create Inquiry</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="text-sm text-zinc-500 border-b">
                            <th className="py-3 pr-6">Name</th>
                            <th className="py-3 pr-6">Contact</th>
                            <th className="py-3 pr-6">Service</th>
                            <th className="py-3 pr-6">Status</th>
                            <th className="py-3 pr-6">Created</th>
                            <th className="py-3 pr-6">Actions</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y">
                          {inquiries.map((inq) => (
                            <tr key={inq._id || inq.id} className="align-top">
                              <td className="py-4 pr-6">
                                <div className="font-semibold text-zinc-900">{inq.name}</div>
                                <div className="text-sm text-zinc-500">{inq.note || ''}</div>
                              </td>
                              <td className="py-4 pr-6 text-sm text-zinc-700">{inq.phone} {inq.email && <div className="text-zinc-500">{inq.email}</div>}</td>
                              <td className="py-4 pr-6 text-sm text-zinc-700">{inq.serviceInterest || '-'}</td>
                              <td className="py-4 pr-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${inq.status === 'converted' ? 'bg-green-100 text-green-700' : inq.status === 'lost' ? 'bg-red-100 text-red-700' : inq.status === 'follow-up' ? 'bg-indigo-100 text-indigo-700' : 'bg-zinc-100 text-zinc-700'}`}>
                                  {inq.status || 'new'}
                                </span>
                              </td>
                              <td className="py-4 pr-6 text-sm text-zinc-500">{new Date(inq.createdAt || inq.created || Date.now()).toLocaleDateString()}</td>
                              <td className="py-4 pr-6">
                                <div className="flex gap-2">
                                  <button onClick={() => navigate(`/inquiries/${inq._id}`)} className="text-sm px-3 py-1 rounded border border-zinc-200">View</button>
                                  <button onClick={() => handleDelete(inq._id)} className="text-sm px-3 py-1 rounded bg-red-50 text-red-600 border border-red-100">Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
                    {inquiries.map((inq) => (
                      <InquiryCard key={inq._id || inq.id} inquiry={inq} onDelete={handleDelete} onRespond={handleRespond} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* pagination */}
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

export default InquiryPage;
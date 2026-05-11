import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetInquiry } from "../../services/inquiries/useInquiryQuery";
import { useDeleteInquiry, useUpdateInquiry } from "../../services/inquiries/useInquiryMutation";

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: resp, isLoading, isError } = useGetInquiry(id);
  const inquiry = resp?.data || resp || null;

  const { mutate: deleteInquiry } = useDeleteInquiry();
  const updateMutation = useUpdateInquiry();

  const handleDelete = () => {
    if (!window.confirm("Delete this inquiry?")) return;
    deleteInquiry(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        navigate(-1);
      },
    });
  };

  const handleMarkResolved = () => {
    updateMutation.mutate({ id, data: { status: "converted" } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inquiries"] }),
    });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !inquiry) return <div className="p-6">Inquiry not found</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">Inquiry Details</h1>
              <p className="text-sm text-zinc-500 mt-1">{inquiry?.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "-"}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-md border bg-white">Back</button>
              <button onClick={handleDelete} className="px-3 py-2 rounded-md bg-red-600 text-white">Delete</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-zinc-500">Name</h3>
              <div className="mt-2 text-zinc-900 font-medium">{inquiry.name || "-"}</div>

              <h3 className="text-sm text-zinc-500 mt-4">Contact</h3>
              <div className="mt-2 text-zinc-900">{inquiry.phone || inquiry.email || "-"}</div>

              <h3 className="text-sm text-zinc-500 mt-4">Status</h3>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' : inquiry.status === 'converted' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'}`}>
                  {inquiry.status || 'new'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-zinc-500">Service Interested</h3>
              <div className="mt-2 text-zinc-900">{inquiry.serviceInterest || "-"}</div>

              <h3 className="text-sm text-zinc-500 mt-4">Message</h3>
              <div className="mt-2 text-zinc-900 whitespace-pre-wrap">{inquiry.message || "-"}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            {inquiry.status !== 'converted' && (
              <button onClick={handleMarkResolved} className="px-4 py-2 rounded-2xl bg-emerald-600 text-white">Mark Converted</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailPage;

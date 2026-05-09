import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const InquiryCard = ({
  inquiry,
  onDelete,
  onRespond,
}) => {
  const { hasRole } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {inquiry.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {inquiry.phone} {inquiry.email && (<span className="ml-3 text-sm text-gray-400">{inquiry.email}</span>)}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${(() => {
            const s = inquiry.status || "new";
            if (s === "converted") return "bg-green-100 text-green-700";
            if (s === "lost") return "bg-red-100 text-red-700";
            if (s === "follow-up") return "bg-indigo-100 text-indigo-700";
            return "bg-yellow-100 text-yellow-700";
          })()}`}
        >
          {inquiry.status || "new"}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 space-y-3 text-sm">
        
        {inquiry.serviceInterest && (
          <div>
            <span className="font-semibold text-gray-700">
              Service:
            </span>

            <span className="text-gray-600 ml-2">
              {inquiry.serviceInterest}
            </span>
          </div>
        )}

        {inquiry.reference && (
          <div>
            <span className="font-semibold text-gray-700">
              Source:
            </span>

            <span className="text-gray-600 ml-2 capitalize">
              {inquiry.reference}
            </span>
          </div>
        )}

        {inquiry.preferredDate && (
          <div>
            <span className="font-semibold text-gray-700">
              Date:
            </span>

            <span className="text-gray-600 ml-2">
              {new Date(
                inquiry.preferredDate
              ).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* MESSAGE */}
      {inquiry.message && (
        <div className="mt-5 bg-gray-50 rounded-xl p-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {inquiry.message}
          </p>
        </div>
      )}

      {/* RESPONSE */}
      {inquiry.response && (
        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-sm text-indigo-700">
            <span className="font-semibold">
              Response:
            </span>{" "}
            {inquiry.response}
          </p>
        </div>
      )}

      {/* ACTION */}
      <div className="mt-5 space-y-2">
        {hasRole(["staff", "admin", "superadmin"]) && (
          <div>
            <button
              onClick={() => setReplyOpen((s) => !s)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium"
            >
              {replyOpen ? "Cancel" : "Respond"}
            </button>

            {replyOpen && (
              <div className="mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full border rounded p-2 h-24"
                  placeholder="Write a response visible to customer"
                />

                <button
                  onClick={() => {
                    if (!replyText.trim()) return;
                    onRespond?.(inquiry._id, replyText.trim());
                    setReplyText("");
                    setReplyOpen(false);
                  }}
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
                >
                  Send Response
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => onDelete(inquiry._id)}
          className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2.5 rounded-xl font-medium"
        >
          Delete Inquiry
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;
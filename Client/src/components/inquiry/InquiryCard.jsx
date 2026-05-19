import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const InquiryCard = ({ inquiry, onDelete, onRespond }) => {
  const { hasRole } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Get initials for customer avatar
  const getInitials = (name) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Helper to parse dynamic interest type & label
  const getInquiryDetails = () => {
    const raw = inquiry.serviceInterest || "";
    if (raw.startsWith("[COURSE]")) {
      return {
        type: "Academy Course",
        name: raw.replace("[COURSE]", "").trim(),
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200/60",
        avatarBg: "from-amber-400 to-orange-500",
      };
    }
    if (raw.startsWith("[PARLOR PRODUCT]")) {
      return {
        type: "Parlor Product",
        name: raw.replace("[PARLOR PRODUCT]", "").trim(),
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        avatarBg: "from-emerald-400 to-teal-600",
      };
    }
    if (raw.startsWith("[OTHER]")) {
      return {
        type: "General Inquiry",
        name: raw.replace("[OTHER]", "").trim(),
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200/60",
        avatarBg: "from-purple-400 to-indigo-600",
      };
    }
    // Default to service
    return {
      type: "Salon Service",
      name: raw || "General Salon Services",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200/60",
      avatarBg: "from-rose-400 to-pink-600",
    };
  };

  const details = getInquiryDetails();

  // Helper for status badge styling
  const getStatusStyle = (status) => {
    const s = (status || "new").toLowerCase();
    switch (s) {
      case "converted":
        return "bg-green-50 text-green-700 border-green-200/60";
      case "lost":
        return "bg-red-50 text-red-700 border-red-200/60";
      case "follow-up":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200/60";
    }
  };

  // Format Date beautifully
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Decorative subtle background elements for premium feel */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-zinc-50 to-zinc-100/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300" />
      
      <div>
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border capitalize ${details.badgeBg}`}>
            {details.type}
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize tracking-wide ${getStatusStyle(inquiry.status)}`}>
            {inquiry.status || "new"}
          </span>
        </div>

        {/* CUSTOMER PROFILE HEADER */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${details.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-inner`}>
            {getInitials(inquiry.name)}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-zinc-955 truncate group-hover:text-black transition-colors">
              {inquiry.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 truncate">
              {inquiry.phone} {inquiry.email ? `• ${inquiry.email}` : ""}
            </p>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="space-y-3 bg-zinc-50/60 border border-zinc-100 rounded-2xl p-4 mb-4">
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-zinc-400 font-medium">Interest Category / Item</span>
            <span className="text-zinc-800 font-semibold text-sm line-clamp-2">
              {details.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-200/40 text-xs">
            {inquiry.preferredDate && (
              <div className="flex flex-col gap-1">
                <span className="text-zinc-400 font-medium">Preferred Date</span>
                <span className="text-zinc-800 font-bold">
                  {formatDate(inquiry.preferredDate)}
                </span>
              </div>
            )}
            {inquiry.reference && (
              <div className="flex flex-col gap-1">
                <span className="text-zinc-400 font-medium">Referral Source</span>
                <span className="text-zinc-800 font-bold capitalize truncate">
                  {inquiry.reference}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CUSTOMER MESSAGE */}
        {inquiry.message && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message</h4>
            <div className="bg-zinc-50/80 border border-zinc-100 rounded-2xl p-4">
              <p className="text-sm text-zinc-700 leading-relaxed break-words whitespace-pre-line italic">
                "{inquiry.message}"
              </p>
            </div>
          </div>
        )}

        {/* ADMIN REPLY */}
        {inquiry.response && (
          <div className="mt-4 pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Admin Response</h4>
            </div>
            <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-4 shadow-sm">
              <p className="text-sm leading-relaxed break-words font-medium">
                {inquiry.response}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col gap-2.5">
        {hasRole(["staff", "admin", "superadmin"]) && (
          <div className="w-full">
            <button
              onClick={() => setReplyOpen((s) => !s)}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm active:scale-95 duration-200"
            >
              {replyOpen ? "Cancel Response" : "Respond to Customer"}
            </button>

            {replyOpen && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full border border-zinc-200 rounded-2xl p-3.5 h-28 text-sm text-zinc-950 resize-none outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
                  placeholder="Write a custom, polite response..."
                />

                <button
                  onClick={() => {
                    if (!replyText.trim()) return;
                    onRespond?.(inquiry._id, replyText.trim());
                    setReplyText("");
                    setReplyOpen(false);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all"
                >
                  Send Response
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => onDelete(inquiry._id)}
          className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-95"
        >
          Delete Inquiry
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;
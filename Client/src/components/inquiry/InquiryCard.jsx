import React, {
  useState,
} from "react";

import { useAuth } from "../../context/AuthProvider";

const InquiryCard = ({
  inquiry,
  onDelete,
  onRespond,
}) => {
  const { hasRole } = useAuth();

  const [replyOpen, setReplyOpen] =
    useState(false);

  const [replyText, setReplyText] =
    useState("");

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4 sm:p-5
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      {/* TOP */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-start
          sm:justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          
          <h3
            className="
              text-lg
              sm:text-xl
              font-semibold
              text-zinc-900
              break-words
            "
          >
            {inquiry.name}
          </h3>

          <div
            className="
              mt-1
              text-sm
              text-zinc-500
              space-y-1
            "
          >
            <p className="break-all">
              {inquiry.phone}
            </p>

            {inquiry.email && (
              <p className="text-zinc-400 break-all">
                {inquiry.email}
              </p>
            )}
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`
            self-start
            px-3 py-1
            rounded-full
            text-xs
            font-medium
            whitespace-nowrap
            ${
              inquiry.status ===
              "converted"
                ? "bg-green-100 text-green-700"
                : inquiry.status ===
                  "lost"
                ? "bg-red-100 text-red-700"
                : inquiry.status ===
                  "follow-up"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-zinc-100 text-zinc-700"
            }
          `}
        >
          {inquiry.status || "new"}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm">
        
        {inquiry.serviceInterest && (
          <div className="flex flex-wrap gap-1">
            <span className="font-medium text-zinc-700">
              Service:
            </span>

            <span className="text-zinc-600 break-words">
              {inquiry.serviceInterest}
            </span>
          </div>
        )}

        {inquiry.reference && (
          <div className="flex flex-wrap gap-1">
            <span className="font-medium text-zinc-700">
              Source:
            </span>

            <span className="text-zinc-600 capitalize">
              {inquiry.reference}
            </span>
          </div>
        )}

        {inquiry.preferredDate && (
          <div className="flex flex-wrap gap-1">
            <span className="font-medium text-zinc-700">
              Date:
            </span>

            <span className="text-zinc-600">
              {new Date(
                inquiry.preferredDate
              ).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* MESSAGE */}
      {inquiry.message && (
        <div
          className="
            mt-4
            bg-zinc-50
            rounded-xl
            p-4
          "
        >
          <p
            className="
              text-sm
              text-zinc-700
              leading-relaxed
              break-words
            "
          >
            {inquiry.message}
          </p>
        </div>
      )}

      {/* RESPONSE */}
      {inquiry.response && (
        <div
          className="
            mt-4
            bg-zinc-50
            border border-zinc-100
            rounded-xl
            p-4
          "
        >
          <p
            className="
              text-sm
              text-zinc-700
              break-words
            "
          >
            <span className="font-semibold">
              Response:
            </span>{" "}
            {inquiry.response}
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-5 space-y-3">
        
        {hasRole([
          "staff",
          "admin",
          "superadmin",
        ]) && (
          <div>
            <button
              onClick={() =>
                setReplyOpen((s) => !s)
              }
              className="
                w-full
                bg-zinc-900
                hover:bg-zinc-800
                text-white
                py-2.5
                rounded-xl
                font-medium
                transition
              "
            >
              {replyOpen
                ? "Cancel"
                : "Respond"}
            </button>

            {replyOpen && (
              <div className="mt-3">
                
                <textarea
                  value={replyText}
                  onChange={(e) =>
                    setReplyText(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border border-zinc-200
                    rounded-xl
                    p-3
                    h-24
                    text-zinc-900
                    resize-none
                    outline-none
                    focus:ring-2
                    focus:ring-zinc-200
                  "
                  placeholder="Write response..."
                />

                <button
                  onClick={() => {
                    if (
                      !replyText.trim()
                    )
                      return;

                    onRespond?.(
                      inquiry._id,
                      replyText.trim()
                    );

                    setReplyText("");

                    setReplyOpen(false);
                  }}
                  className="
                    mt-2
                    w-full
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-2.5
                    rounded-xl
                    transition
                  "
                >
                  Send Response
                </button>
              </div>
            )}
          </div>
        )}

        {/* DELETE */}
        <button
          onClick={() =>
            onDelete(inquiry._id)
          }
          className="
            w-full
            bg-red-500
            hover:bg-red-600
            text-white
            py-2.5
            rounded-xl
            font-medium
            transition
          "
        >
          Delete Inquiry
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;
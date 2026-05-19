import React, { useState } from "react";

import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import InquiryCard from "../../components/inquiry/InquiryCard";

import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";

import {
  useDeleteInquiry,
  useUpdateInquiry,
} from "../../services/inquiries/useInquiryMutation";

const InquiryPage = () => {
  const queryClient =
    useQueryClient();

  const navigate = useNavigate();

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(5);

  const [q, setQ] =
    useState("");

  // DEFAULT ALL
  const [filter, setFilter] =
    useState("all");

  // DESKTOP RESPONSE
  const [
    replyOpenId,
    setReplyOpenId,
  ] = useState(null);

  const [
    replyText,
    setReplyText,
  ] = useState("");

  // QUERY
  const {
    data: resp,
    isLoading,
  } = useGetInquiries({
    page,
    limit,
    q,

    status:
      filter === "all"
        ? undefined
        : filter,

    // NEWEST FIRST
    sort: "-createdAt",
  });

  const inquiries =
    resp?.data || [];

  const total =
    resp?.total || 0;

  const totalPages =
    resp?.totalPages || 1;

  // DELETE
  const {
    mutate: deleteInquiry,
  } = useDeleteInquiry();

  // UPDATE
  const updateMutation =
    useUpdateInquiry();

  // DELETE
  const handleDelete = (
    id
  ) => {
    if (
      !window.confirm(
        "Delete inquiry?"
      )
    )
      return;

    deleteInquiry(id, {
      onSuccess: () => {
        toast.success(
          "Inquiry deleted"
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "inquiries",
            ],
          }
        );
      },
    });
  };

  // RESPOND
  const handleRespond = (
    id,
    responseText
  ) => {
    if (
      !responseText.trim()
    )
      return;

    updateMutation.mutate(
      {
        id,

        data: {
          response:
            responseText,

          status:
            "follow-up",
        },
      },

      {
        onSuccess: () => {
          toast.success(
            "Response saved"
          );

          setReplyOpenId(
            null
          );

          setReplyText("");

          queryClient.invalidateQueries(
            {
              queryKey: [
                "inquiries",
              ],
            }
          );
        },

        onError: () => {
          toast.error(
            "Failed to respond"
          );
        },
      }
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-zinc-50
        p-4
        sm:p-6
        lg:p-10
      "
    >
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div
          className="
            mb-6
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-extrabold
                text-zinc-900
              "
            >
              Inquiries
            </h1>

            <p className="text-zinc-500 mt-1">
              Customer inquiries
              and follow-ups
            </p>
          </div>

          <div
            className="
              bg-zinc-900
              text-white
              px-4 py-2
              rounded-2xl
              text-sm
              font-medium
              w-fit
            "
          >
            Total: {total}
          </div>
        </div>

        {/* FILTER */}
        <div
          className="
            bg-white
            border border-zinc-200
            rounded-3xl
            p-4 sm:p-6
            shadow-sm
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-4
            "
          >
            {/* SEARCH + FILTER */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                flex-1
              "
            >
              <input
                value={q}
                onChange={(
                  e
                ) => {
                  setQ(
                    e.target.value
                  );

                  setPage(1);
                }}
                placeholder="Search inquiries..."
                className="
                  w-full
                  flex-1
                  border border-zinc-200
                  rounded-xl
                  px-4 py-3
                  text-sm
                  outline-none
                "
              />

              <select
                value={filter}
                onChange={(
                  e
                ) => {
                  setFilter(
                    e.target.value
                  );

                  setPage(1);
                }}
                className="
                  w-full
                  sm:w-[180px]
                  border border-zinc-200
                  rounded-xl
                  px-3 py-3
                  bg-white
                  text-sm
                "
              >
                <option value="all">
                  All statuses
                </option>

                <option value="new">
                  New
                </option>

                <option value="follow-up">
                  Follow-up
                </option>

                <option value="converted">
                  Converted
                </option>

                <option value="lost">
                  Lost
                </option>
              </select>
            </div>

            {/* CREATE */}
            <button
              onClick={() =>
                navigate(
                  "/inquiries/create"
                )
              }
              className="
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                bg-zinc-900
                hover:bg-zinc-800
                text-white
                px-5 py-3
                rounded-xl
                text-sm
                font-medium
              "
            >
              Create Inquiry
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          
          {/* LOADING */}
          {isLoading ? (
            <div className="text-center py-20 text-zinc-500">
              Loading inquiries...
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden xl:block">
                <div
                  className="
                    bg-white
                    border border-zinc-200
                    rounded-3xl
                    overflow-hidden
                  "
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      
                      <thead className="bg-zinc-100 border-b">
                        <tr className="text-left text-sm text-zinc-600">
                          
                          <th className="px-6 py-4">
                            Name
                          </th>

                          <th className="px-6 py-4">
                            Contact
                          </th>

                          <th className="px-6 py-4">
                            Status
                          </th>

                          <th className="px-6 py-4">
                            Date
                          </th>

                          <th className="px-6 py-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {inquiries.map(
                          (
                            inquiry
                          ) => (
                            <React.Fragment
                              key={
                                inquiry._id
                              }
                            >
                              <tr className="border-b">
                                
                                <td className="px-6 py-5">
                                  <div className="font-semibold text-zinc-900">
                                    {
                                      inquiry.name
                                    }
                                  </div>

                                  <div className="text-sm text-zinc-500 mt-1">
                                    {inquiry.serviceInterest ||
                                      "-"}
                                  </div>
                                </td>

                                <td className="px-6 py-5 text-sm">
                                  <div>
                                    {
                                      inquiry.phone
                                    }
                                  </div>

                                  <div className="text-zinc-400">
                                    {
                                      inquiry.email
                                    }
                                  </div>
                                </td>

                                <td className="px-6 py-5">
                                  <span
                                    className={`
                                      px-3 py-1
                                      rounded-full
                                      text-xs
                                      font-medium
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
                                    {inquiry.status ||
                                      "new"}
                                  </span>
                                </td>

                                <td className="px-6 py-5 text-sm text-zinc-500">
                                  {new Date(
                                    inquiry.createdAt
                                  ).toLocaleDateString()}
                                </td>

                                {/* DESKTOP ACTIONS */}
                                <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                    
                                    <button
                                      onClick={() =>
                                        setReplyOpenId(
                                          replyOpenId ===
                                            inquiry._id
                                            ? null
                                            : inquiry._id
                                        )
                                      }
                                      className="
                                        px-4 py-2
                                        rounded-xl
                                        bg-zinc-900
                                        text-white
                                        text-sm
                                        hover:bg-zinc-800
                                      "
                                    >
                                      Respond
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleDelete(
                                          inquiry._id
                                        )
                                      }
                                      className="
                                        px-4 py-2
                                        rounded-xl
                                        bg-red-500
                                        text-white
                                        text-sm
                                        hover:bg-red-600
                                      "
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* RESPONSE BOX */}
                              {replyOpenId ===
                                inquiry._id && (
                                <tr className="border-b bg-zinc-50">
                                  <td
                                    colSpan={
                                      5
                                    }
                                    className="px-6 py-5"
                                  >
                                    <div className="max-w-2xl">
                                      
                                      <textarea
                                        value={
                                          replyText
                                        }
                                        onChange={(
                                          e
                                        ) =>
                                          setReplyText(
                                            e
                                              .target
                                              .value
                                          )
                                        }
                                        placeholder="Write response..."
                                        className="
                                          w-full
                                          border border-zinc-200
                                          rounded-xl
                                          p-4
                                          h-28
                                          outline-none
                                        "
                                      />

                                      <div className="flex gap-3 mt-3">
                                        
                                        <button
                                          onClick={() =>
                                            handleRespond(
                                              inquiry._id,
                                              replyText
                                            )
                                          }
                                          className="
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            px-5 py-2
                                            rounded-xl
                                          "
                                        >
                                          Send
                                        </button>

                                        <button
                                          onClick={() => {
                                            setReplyOpenId(
                                              null
                                            );

                                            setReplyText(
                                              ""
                                            );
                                          }}
                                          className="
                                            bg-zinc-200
                                            hover:bg-zinc-300
                                            text-zinc-900
                                            px-5 py-2
                                            rounded-xl
                                          "
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* MOBILE CARDS */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                  xl:hidden
                "
              >
                {inquiries.map(
                  (item) => (
                    <InquiryCard
                      key={
                        item._id
                      }
                      inquiry={item}
                      onDelete={
                        handleDelete
                      }
                      onRespond={
                        handleRespond
                      }
                    />
                  )
                )}
              </div>
            </>
          )}

          {/* PAGINATION */}
          {inquiries.length >
            0 && (
            <div
              className="
                mt-6
                flex
                flex-col
                sm:flex-row
                items-center
                justify-between
                gap-4
              "
            >
              <div className="text-sm text-zinc-500">
                Page {page} of{" "}
                {totalPages}
              </div>

              <div className="flex gap-2">
                
                <button
                  disabled={
                    page <= 1
                  }
                  onClick={() =>
                    setPage(
                      (p) =>
                        Math.max(
                          1,
                          p - 1
                        )
                    )
                  }
                  className="
                    px-4 py-2
                    rounded-xl
                    border border-zinc-200
                    bg-white
                    hover:bg-zinc-100
                    disabled:opacity-50
                  "
                >
                  Prev
                </button>

                <button
                  disabled={
                    page >=
                    totalPages
                  }
                  onClick={() =>
                    setPage(
                      (p) =>
                        Math.min(
                          totalPages,
                          p + 1
                        )
                    )
                  }
                  className="
                    px-4 py-2
                    rounded-xl
                    border border-zinc-200
                    bg-white
                    hover:bg-zinc-100
                    disabled:opacity-50
                  "
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
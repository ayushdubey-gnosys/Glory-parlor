// src/pages/inquiry/InquiryPage.jsx

import React from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import {
  useCreateInquiry,
  useDeleteInquiry,
} from "../../services/inquiries/useInquiryMutation";

import { useGetInquiries } from "../../services/inquiries/useInquiryQuery";

const InquiryPage = () => {
  const { data, isLoading } =
    useGetInquiries();

  const inquiries = data || [];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const {
    mutate: createInquiry,
    isPending,
  } = useCreateInquiry();

  const {
    mutate: deleteInquiry,
  } = useDeleteInquiry();

  const onSubmit = (data) => {
    createInquiry(data, {
      onSuccess: () => {
        toast.success(
          "Inquiry Created"
        );

        reset();
      },

      onError: (error) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed"
        );
      },
    });
  };

  const handleDelete = (id) => {
    deleteInquiry(id, {
      onSuccess: () => {
        toast.success(
          "Inquiry Deleted"
        );
      },
    });
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">
        Inquiry Management
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="bg-white p-5 rounded-xl shadow flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Customer Name"
          {...register("name", {
            required: true,
          })}
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="border p-3 rounded-lg"
        />

        <textarea
          placeholder="Write inquiry..."
          {...register("message", {
            required: true,
          })}
          className="border p-3 rounded-lg h-32"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white py-3 rounded-lg"
        >
          {isPending
            ? "Loading..."
            : "Create Inquiry"}
        </button>
      </form>

      {/* LIST */}

      <div className="grid gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : inquiries?.length === 0 ? (
          <p>No inquiries found</p>
        ) : (
          inquiries?.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-start"
            >
              <div>
                <h2 className="font-bold text-lg">
                  {item.name}
                </h2>

                <p>
                  {item.email}
                </p>

                <p className="mt-2 text-gray-600">
                  {item.message}
                </p>
              </div>

              <button
                onClick={() =>
                  handleDelete(
                    item._id
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InquiryPage;
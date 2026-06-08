import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateCustomer } from "../../services/customers/useCustomerMutation";

const RegisterCustomerPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { mutate, isLoading } = useCreateCustomer();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Customer registered successfully");
        reset();
        navigate(redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Register as Customer</h2>

        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            {...register("name")}
            placeholder="Full name"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone</label>
          <input
            {...register("phone")}
            placeholder="Phone number"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Address</label>
          <input
            {...register("address")}
            placeholder="Enter address"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Notes (optional)</label>
          <textarea
            {...register("notes")}
            placeholder="Any notes"
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isLoading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterCustomerPage;

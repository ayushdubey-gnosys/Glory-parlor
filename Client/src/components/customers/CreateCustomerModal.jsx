import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormModal from "../Modal/FormModal";
import { useCreateCustomer } from "../../services/customers/useCustomerMutation";

const CreateCustomerModal = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const { mutate, isLoading } = useCreateCustomer();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Customer created");
        reset();
        onClose?.();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to create customer");
      },
    });
  };

  return (
    <FormModal title="Create New Customer" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Customer Name *
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g., Sarah Jenkins"
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Phone Number *
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              placeholder="e.g., 9876543210"
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Email Address *
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="e.g., sarah@example.com"
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Address *
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              placeholder="e.g., 123 Fashion St, Mumbai"
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Gender *
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Date of Birth (DOB) *
            </label>
            <input
              type="date"
              {...register("dob", { required: "DOB is required" })}
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
              Anniversary *
            </label>
            <input
              type="date"
              {...register("anniversary", { required: "Anniversary is required" })}
              className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 dm">
            Notes & Preferences (Optional)
          </label>
          <textarea
            {...register("notes")}
            placeholder="Add any specific preferences, hair type, or notes..."
            className="w-full bg-zinc-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#D68B2A] focus:ring-4 focus:ring-[#D68B2A]/10 transition-all shadow-sm resize-none"
            rows="3"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose?.();
            }}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-medium shadow-sm dm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#D68B2A] to-[#B57320] text-white font-medium text-sm shadow-lg shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all disabled:opacity-70 dm"
          >
            {isLoading ? "Creating..." : "Create Customer"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateCustomerModal;

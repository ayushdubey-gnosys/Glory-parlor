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
    <FormModal title="Create Customer" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-light text-zinc-400 mb-1">Name</label>
          <input {...register("name")} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]/50 focus:border-[#caa04d] text-white transition-all" />
        </div>

        <div>
          <label className="block text-sm font-light text-zinc-400 mb-1">Phone</label>
          <input {...register("phone")} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]/50 focus:border-[#caa04d] text-white transition-all" />
        </div>

        <div>
          <label className="block text-sm font-light text-zinc-400 mb-1">Email</label>
          <input {...register("email")} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]/50 focus:border-[#caa04d] text-white transition-all" />
        </div>

        <div>
          <label className="block text-sm font-light text-zinc-400 mb-1">Address</label>
          <input {...register("address")} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]/50 focus:border-[#caa04d] text-white transition-all" />
        </div>

        <div>
          <label className="block text-sm font-light text-zinc-400 mb-1">Notes</label>
          <textarea {...register("notes")} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]/50 focus:border-[#caa04d] text-white transition-all" rows="3" />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button type="button" onClick={() => { reset(); onClose?.(); }} className="px-5 py-2.5 rounded-xl border border-white/10 text-zinc-300 hover:bg-white/[0.05] transition-all text-sm font-light">
            Cancel
          </button>

          <button type="submit" disabled={isLoading} className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-yellow-500/80 to-yellow-800 text-white shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-all disabled:opacity-70 text-sm font-light">
            {isLoading ? "Creating..." : "Create Customer"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateCustomerModal;

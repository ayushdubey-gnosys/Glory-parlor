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
          <label className="block text-sm font-medium">Name</label>
          <input {...register("name")} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input {...register("phone")} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input {...register("address")} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea {...register("notes")} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => { reset(); onClose?.(); }} className="px-4 py-2 rounded border">
            Cancel
          </button>

          <button type="submit" disabled={isLoading} className="px-4 py-2 rounded bg-black text-white">
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateCustomerModal;

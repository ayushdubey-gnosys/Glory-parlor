import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import FormModal from "../Modal/FormModal";
import { useAuth } from "../../context/AuthProvider";
import { useCreateInquiry } from "../../services/inquiries/useInquiryMutation";

const ServiceInquiryModal = ({ service, open, onClose }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      serviceInterest: "",
      preferredDate: "",
      reference: "",
      message: "",
    },
  });

  // Prefill values whenever service, user, or open state changes
  useEffect(() => {
    if (open) {
      setValue("name", user?.name || "");
      setValue("phone", user?.mobile || "");
      setValue("serviceInterest", service?.name || "");
      setValue("message", `Hi, I am interested in inquiring about the "${service?.name}" service. Please let me know the availability.`);
    }
  }, [open, service, user, setValue]);

  if (!service) return null;

  const submitHandler = (data) => {
    createInquiry(data, {
      onSuccess: () => {
        toast.success("Inquiry submitted successfully!");
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        reset();
        onClose();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to submit inquiry.");
      },
    });
  };

  return (
    <FormModal open={open} onClose={onClose} title={`Inquire about "${service.name}"`}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* CUSTOMER NAME */}
        <div>
          <label className="block text-[10px] font-semibold text-[#D68B2A] uppercase tracking-wider mb-1">
            Your Name
          </label>
          <input
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="w-full px-4 py-2.5 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-zinc-900 text-sm bg-[#faf9f5]"
          />
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label className="block text-[10px] font-semibold text-[#D68B2A] uppercase tracking-wider mb-1">
            Phone Number
          </label>
          <input
            {...register("phone", { required: true })}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2.5 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-zinc-900 text-sm bg-[#faf9f5]"
          />
        </div>

        {/* SERVICE INTEREST (READ-ONLY) */}
        <div>
          <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            Service of Interest (Locked)
          </label>
          <input
            {...register("serviceInterest")}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 text-sm cursor-not-allowed outline-none"
          />
        </div>

        {/* PREFERRED DATE */}
        <div>
          <label className="block text-[10px] font-semibold text-[#D68B2A] uppercase tracking-wider mb-1">
            Preferred Date
          </label>
          <input
            {...register("preferredDate", { required: true })}
            type="date"
            className="w-full px-4 py-2.5 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-zinc-900 text-sm bg-[#faf9f5]"
          />
        </div>

        {/* INQUIRY SOURCE */}
        <div>
          <label className="block text-[10px] font-semibold text-[#D68B2A] uppercase tracking-wider mb-1">
            How did you hear about us?
          </label>
          <select
            {...register("reference", { required: true })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-zinc-900 text-sm bg-[#faf9f5]"
          >
            <option value="">Select Option</option>
            <option value="google">Google</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="friend">Friend</option>
            <option value="walk-in">Walk-in</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-[10px] font-semibold text-[#D68B2A] uppercase tracking-wider mb-1">
            Message / Specific Requirements
          </label>
          <textarea
            {...register("message")}
            rows="3"
            placeholder="Any specific requests or requirements..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-zinc-900 text-sm resize-none bg-[#faf9f5]"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 text-sm bg-gradient-to-b from-[#D68B2A] to-[#b57321] hover:scale-105 shadow-md text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {isPending ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default ServiceInquiryModal;

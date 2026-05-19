import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import FormModal from "../Modal/FormModal";
import { useCreateAppointment } from "../../services/appointments/useAppointmentMutation";

const BookStaffAppointmentModal = ({ staff, services = [], open, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: createAppointment, isPending } = useCreateAppointment();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      service: "",
      date: "",
      time: "",
    },
  });

  // Reset form when modal opens or staff changes
  useEffect(() => {
    if (open) {
      reset({
        service: "",
        date: "",
        time: "",
      });
    }
  }, [open, reset]);

  if (!staff) return null;

  const submitHandler = (data) => {
    const payload = {
      staff: staff._id,
      service: data.service,
      date: data.date,
      time: data.time,
    };

    createAppointment(payload, {
      onSuccess: () => {
        toast.success("Appointment created successfully!");
        // Invalidate queries to refresh lists
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
        reset();
        onClose();
      },
      onError: (err) => {
        // Read conflict/error message from backend response
        const errMsg = err?.response?.data?.message || err?.response?.data?.error || "Failed to create appointment.";
        toast.error(errMsg);
      },
    });
  };

  return (
    <FormModal open={open} onClose={onClose} title={`Book Appointment with ${staff.name}`}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        
        {/* SELECTED STAFF (READ-ONLY) */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Stylist / Staff (Locked)
          </label>
          <input
            value={`${staff.name} (${staff.role || "Stylist"})`}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-100 bg-zinc-50 text-zinc-500 text-sm cursor-not-allowed outline-none"
          />
        </div>

        {/* SELECT SERVICE */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Select Service
          </label>
          <select
            {...register("service", { required: true })}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 text-sm bg-white"
          >
            <option value="">Choose a salon service</option>
            {services?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} (₹{s.price})
              </option>
            ))}
          </select>
        </div>

        {/* SELECT DATE */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Preferred Date
          </label>
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 text-sm"
          />
        </div>

        {/* SELECT TIME */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Preferred Time
          </label>
          <input
            {...register("time", { required: true })}
            type="time"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 text-sm"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 text-sm bg-black hover:bg-zinc-800 text-white rounded-xl font-medium transition disabled:opacity-50"
          >
            {isPending ? "Booking..." : "Confirm Booking"}
          </button>
        </div>

      </form>
    </FormModal>
  );
};

export default BookStaffAppointmentModal;

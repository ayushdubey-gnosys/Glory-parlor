import React from "react";
import { useForm } from "react-hook-form";

const InquiryForm = ({
  services = [],
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit, reset } =
    useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Customer Name</label>

        <input
          {...register("name")}
          placeholder="Enter customer name"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>

        <input
          {...register("phone")}
          placeholder="Enter phone number"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900"
        />
      </div>

      {/* SERVICE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Service</label>

        <select
          {...register("serviceInterest")}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900"
        >
          <option value="">Select Service</option>

          {services?.map((s) => (
            <option key={s._id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* DATE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Preferred Date</label>

        <input
          {...register("preferredDate")}
          type="date"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900"
        />
      </div>

      {/* SOURCE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Inquiry Source</label>

        <select
          {...register("reference")}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900"
        >
          <option value="">Select Source</option>
          <option value="google">Google</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="friend">Friend</option>
          <option value="walk-in">Walk In</option>
        </select>
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>

        <textarea
          {...register("message")}
          rows="4"
          placeholder="Enter message"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 resize-none text-zinc-900"
        />
      </div>

      {/* BUTTON */}
      <div className="sticky bottom-0 left-0 py-4 bg-white -mx-6 px-6 md:relative md:py-0 md:bg-transparent md:mx-0">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 hover:bg-zinc-800 transition text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Inquiry"}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;
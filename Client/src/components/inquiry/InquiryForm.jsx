import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";

const InquiryForm = ({
  services = [],
  courses = [],
  products = [],
  onSubmit,
  loading,
}) => {
  const { user } = useAuth();
  
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      serviceInterest: "",
      preferredDate: "",
      reference: "",
      message: "",
    },
  });

  const inquiryType = watch("inquiryType");

  // Prefill details from the logged-in customer user
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("phone", user.mobile || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  // Reset secondary interest field when inquiry type changes
  useEffect(() => {
    setValue("serviceInterest", "");
  }, [inquiryType, setValue]);

  const submitHandler = (data) => {
    // We can prepend the type to the serviceInterest or submit as is
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceInterest: data.serviceInterest
        ? `[${data.inquiryType.toUpperCase()}] ${data.serviceInterest}`
        : `[${data.inquiryType.toUpperCase()}] General`,
      preferredDate: data.preferredDate,
      reference: data.reference,
      message: data.message,
    };
    onSubmit(payload);
    reset({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.mobile || "",
      inquiryType: "",
      serviceInterest: "",
      preferredDate: "",
      reference: "",
      message: "",
    });
  };

  const isCustomer = user?.role === "customer";

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      
      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Customer Name {isCustomer && <span className="text-xs text-zinc-400 font-normal">(Auto-filled)</span>}
        </label>
        <input
          {...register("name", { required: true })}
          readOnly={isCustomer}
          placeholder="Enter customer name"
          className={`w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 ${
            isCustomer ? "bg-zinc-50 text-zinc-500 cursor-not-allowed" : "bg-white"
          }`}
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Email Address {isCustomer && <span className="text-xs text-zinc-400 font-normal">(Auto-filled)</span>}
        </label>
        <input
          {...register("email")}
          readOnly={isCustomer}
          type="email"
          placeholder="Enter email address"
          className={`w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 ${
            isCustomer ? "bg-zinc-50 text-zinc-500 cursor-not-allowed" : "bg-white"
          }`}
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Phone Number {isCustomer && <span className="text-xs text-zinc-400 font-normal">(Auto-filled)</span>}
        </label>
        <input
          {...register("phone", { required: true })}
          readOnly={isCustomer}
          placeholder="Enter phone number"
          className={`w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 ${
            isCustomer ? "bg-zinc-50 text-zinc-500 cursor-not-allowed" : "bg-white"
          }`}
        />
      </div>

      {/* INQUIRY TYPE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Inquiry Type</label>
        <select
          {...register("inquiryType", { required: true })}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
        >
          <option value="">Select Inquiry Type</option>
          <option value="parlor service">Parlor Service</option>
          <option value="course">Academy Course</option>
          <option value="parlor product">Parlor Product</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* DYNAMIC SECONDARY SELECTION BASED ON INQUIRY TYPE */}
      {inquiryType === "parlor service" && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Select Parlor Service</label>
          <select
            {...register("serviceInterest", { required: true })}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
          >
            <option value="">Choose service</option>
            {services?.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name} (₹{s.price})
              </option>
            ))}
          </select>
        </div>
      )}

      {inquiryType === "course" && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Select Academy Course</label>
          <select
            {...register("serviceInterest", { required: true })}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
          >
            <option value="">Choose course</option>
            {courses?.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name} (₹{c.price || c.fees || "N/A"})
              </option>
            ))}
          </select>
        </div>
      )}

      {inquiryType === "parlor product" && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Select Parlor Product</label>
          <select
            {...register("serviceInterest", { required: true })}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
          >
            <option value="">Choose product</option>
            {products?.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name} ({p.brand}) - ₹{p.sellingPrice}
              </option>
            ))}
          </select>
        </div>
      )}

      {inquiryType === "other" && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Please specify what you are inquiring about</label>
          <input
            {...register("serviceInterest", { required: true })}
            placeholder="Specify your inquiry interest"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
          />
        </div>
      )}

      {/* DATE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Preferred Date</label>
        <input
          {...register("preferredDate")}
          type="date"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
        />
      </div>

      {/* SOURCE */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Inquiry Source</label>
        <select
          {...register("reference")}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 text-zinc-900 bg-white"
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
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 resize-none text-zinc-900 bg-white"
        />
      </div>

      {/* BUTTON */}
      <div className="sticky bottom-0 left-0 py-4 bg-white -mx-6 px-6 md:relative md:py-0 md:bg-transparent md:mx-0 animate-fadeIn">
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
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister } from "../../services/auth/useAuthMutation";
import { useAuth } from "../../context/AuthProvider";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { mutate, isPending } = useRegister();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("role", "customer");
    formData.append("dob", data.dob);
    formData.append("anniversary", data.anniversary);
    formData.append("address", data.address);
    formData.append("gender", data.gender);
    if (data.notes) formData.append("notes", data.notes);

    mutate(formData, {
      onSuccess: async (response) => {
        toast.success(
          response?.message || "Registration Successful"
        );

        try {
          await login({
            email: data.email,
            password: data.password,
          });

          reset();
          navigate(redirectUrl || "/");
        } catch (error) {
          reset();
          navigate(redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login");
        }
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Registration Failed"
        );
      },
    });
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#f7f4ee]">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1627292441194-0280c19e74e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Astha PMS"
          className="w-full h-screen object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-10 text-white">
          <h1 className="text-6xl font-serif mb-6">
            Astha PMS
          </h1>

          <p className="text-center text-xl max-w-lg leading-relaxed">
            Luxury Beauty & Wellness Experience. Discover your natural beauty with our premium salon services and personalized care.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-[24px] border border-[#d9c29c] shadow-xl px-6 py-5 my-8">
          {/* LOGO ICON */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#1f2947] rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-[#d4a74d] text-xl">✦</span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-center text-3xl font-serif text-[#1f2947]">
            Register
          </h1>

          <p className="text-center text-gray-500 mt-1 mb-5 text-sm">
            Create your Astha PMS account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* NAME */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* MOBILE */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10 digit mobile"
                  {...register("mobile", {
                    required: "Phone is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Valid 10 digit phone required" },
                  })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("dob", { required: "DOB is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
              </div>

              {/* ANNIVERSARY */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Anniversary <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("anniversary", { required: "Anniversary is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.anniversary && <p className="text-red-500 text-xs mt-1">{errors.anniversary.message}</p>}
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Complete address"
                  {...register("address", { required: "Address is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              {/* GENDER */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>

              {/* NOTES */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Notes <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Any preferences, allergies, or special notes"
                  {...register("notes")}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                  className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#caa04d]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full
                bg-[#caa04d]
                text-white
                py-2.5
                rounded-xl
                font-semibold
                mt-2
                hover:opacity-90
                transition
              "
            >
              {isPending
                ? "Loading..."
                : "Create Account"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"}
                className="text-[#caa04d] font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
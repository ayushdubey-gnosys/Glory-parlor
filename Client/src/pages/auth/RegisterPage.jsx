import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister, useLogin } from "../../services/auth/useAuthMutation";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegister();
  const loginMutation = useLogin();

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

    mutate(formData, {
      onSuccess: async (response) => {
        toast.success(
          response?.message || "Registration Successful"
        );

        try {
          await loginMutation.mutateAsync({
            email: data.email,
            password: data.password,
          });

          reset();
          navigate("/profile");
        } catch (error) {
          reset();
          navigate("/login");
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
    <div className="h-screen overflow-hidden   flex bg-[#f7f4ee]">
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
            Luxury Beauty & Wellness Experience.
            Discover your natural beauty with our
            premium salon services and personalized
            care.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex  items-center justify-center p-6">
        <div
          className="
          w-full
          max-w-md
          bg-white/90
          backdrop-blur-sm
          rounded-[30px]
          border
          border-[#d9c29c]
          shadow-xl
          px-8
          py-4
        "
        >
          {/* LOGO ICON */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-[#1f2947] rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-[#d4a74d] text-xl">
                ✦
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-center text-5xl font-serif text-[#1f2947]">
            Register
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Create your Astha PMS account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                {...register("mobile", {
                  required:
                    "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message:
                      "Enter valid 10 digit mobile number",
                  },
                })}
                className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]"
              />

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required:
                    "Confirm password is required",
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
                className="w-full bg-[#eef2fb] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#caa04d]"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.confirmPassword
                      .message
                  }
                </p>
              )}
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full
                bg-[#caa04d]
                text-white
                py-3
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
            <div className="flex items-center gap-3 py-2">
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
                to="/login"
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
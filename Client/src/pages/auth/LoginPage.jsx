import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      await login(data);
      toast.success("Login Successful");
      navigate(redirectUrl);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#F8F6F0]">

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=1200&auto=format&fit=crop"
          alt="Salon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=1200&auto=format&fit=crop"
          alt="Salon"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-10">
          <h2 className="text-5xl lg:text-6xl font-serif mb-6">
            Astha PMS
          </h2>

          <p className="text-lg text-center max-w-md leading-relaxed">
            Luxury Beauty & Wellness Experience.
            Discover your natural beauty with our
            premium salon services and personalized care.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            w-full
            max-w-md
            bg-white/90
            backdrop-blur-xl
            border
            border-[#E6D7B9]
            rounded-[32px]
            shadow-2xl
            p-6
            sm:p-8
          "
        >
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-[#1A2238] flex items-center justify-center shadow-lg">
              <span className="text-[#C49A4A] text-3xl">
                ✦
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1A2238]">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to your Astha PMS account
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-gray-300
                focus:border-[#C49A4A]
                focus:ring-4
                focus:ring-[#C49A4A]/20
                outline-none
                transition
              "
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-gray-300
                focus:border-[#C49A4A]
                focus:ring-4
                focus:ring-[#C49A4A]/20
                outline-none
                transition
              "
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-[#C49A4A] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="
              w-full
              py-3
              rounded-xl
              bg-[#C49A4A]
              text-white
              font-semibold
              transition-all
              duration-300
              hover:bg-[#B88633]
              hover:scale-[1.02]
              disabled:opacity-70
            "
          >
            {isPending
              ? "Signing In..."
              : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-400 text-sm">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Register */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to={searchParams.get("redirect") ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : "/register"}
              className="text-[#C49A4A] font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
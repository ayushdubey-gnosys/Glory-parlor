import React from "react";

import { useForm } from "react-hook-form";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  useLogin,
} from "../../services/auth/useAuthMutation";

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            "Login Successful"
        );

        navigate("/");
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Login Failed"
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Customer Login
        </h1>

        {/* EMAIL */}

        <div className="flex flex-col gap-2">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}

        <div className="flex flex-col gap-2">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required:
                "Password is required",
            })}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {isPending
            ? "Loading..."
            : "Login"}
        </button>

        <p className="text-center text-sm">
          Don&apos;t have an account?
          {" "}

          <Link
            to="/register"
            className="text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
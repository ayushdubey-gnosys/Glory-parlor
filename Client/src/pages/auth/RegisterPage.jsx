import React from "react";

import { useForm } from "react-hook-form";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { toast } from "react-toastify";

import { useRegister, useLogin } from "../../services/auth/useAuthMutation";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } =
    useRegister();
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
    const formData =
      new FormData();

    formData.append(
      "name",
      data.name
    );

    formData.append(
      "email",
      data.email
    );

    formData.append(
      "mobile",
      data.mobile
    );

    formData.append(
      "password",
      data.password
    );

    formData.append(
      "role",
      "customer"
    );

    // PROFILE IMAGE

    if (
      data.profilePic &&
      data.profilePic[0]
    ) {
      formData.append(
        "profilePic",
        data.profilePic[0]
      );
    }

    // DEBUG: log FormData entries to console (won't print file contents)
    for (const pair of formData.entries()) {
      console.log("[REGISTER] formData", pair[0], pair[1]);
    }

    mutate(formData, {
      onSuccess: async (response) => {
        toast.success(response?.message || "Registration Successful");

        // attempt auto-login
        try {
          await loginMutation.mutateAsync({ email: data.email, password: data.password });
          reset();
          navigate("/profile");
        } catch (e) {
          // fallback to login page
          reset();
          navigate("/login");
        }
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Registration Failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Customer Register
        </h1>

        {/* PROFILE IMAGE */}

      

        {/* NAME */}

        <div className="flex flex-col gap-2">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required:
                "Name is required",
            })}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {
                errors.name
                  .message
              }
            </p>
          )}
        </div>

        {/* EMAIL */}

        <div className="flex flex-col gap-2">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required:
                "Email is required",
            })}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {
                errors.email
                  .message
              }
            </p>
          )}
        </div>

        {/* MOBILE */}

        <div className="flex flex-col gap-2">
          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            {...register(
              "mobile",
              {
                required:
                  "Mobile number is required",

                pattern: {
                  value:
                    /^[0-9]{10}$/,

                  message:
                    "Enter valid 10 digit mobile number",
                },
              }
            )}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.mobile && (
            <p className="text-red-500 text-sm">
              {
                errors.mobile
                  .message
              }
            </p>
          )}
        </div>
        
          <div className="flex flex-col gap-2">
          <label>
            Profile Picture
          </label>

          <input
            type="file"
            accept="image/*"
            {...register(
              "profilePic"
            )}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />
        </div>

        {/* PASSWORD */}

        <div className="flex flex-col gap-2">
          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            {...register(
              "password",
              {
                required:
                  "Password is required",

                minLength: {
                  value: 6,

                  message:
                    "Password must be at least 6 characters",
                },
              }
            )}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}

        <div className="flex flex-col gap-2">
          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            {...register(
              "confirmPassword",
              {
                required:
                  "Confirm password is required",

                validate: (
                  value
                ) =>
                  value ===
                    password ||
                  "Passwords do not match",
              }
            )}
            className="border border-gray-300 p-3 rounded-lg outline-none"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {
                errors
                  .confirmPassword
                  .message
              }
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
            : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?
          {" "}

          <Link
            to="/login"
            className="text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
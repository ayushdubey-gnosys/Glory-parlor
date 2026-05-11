import React from "react";

import { useForm } from "react-hook-form";

import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Crown,
  Camera,
} from "lucide-react";

import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthProvider";

import {
  useMyCustomer,
} from "../../services/customers/useCustomerQuery";

import {
  createMyCustomer,
  updateMyCustomer,
} from "../../services/customers/customer.api";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const CustomerProfilePage = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: customer,
    isLoading,
  } = useMyCustomer();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const profilePreview =
    watch("profilePic");

  React.useEffect(() => {
    if (customer) {
      setValue(
        "name",
        customer.name || ""
      );

      setValue(
        "email",
        customer.email || ""
      );

      setValue(
        "phone",
        customer.phone || ""
      );

      setValue(
        "address",
        customer.address || ""
      );

      setValue(
        "notes",
        customer.notes || ""
      );
    }
  }, [customer, setValue]);

  const createMutation =
    useMutation({
      mutationFn: createMyCustomer,

      onSuccess: () => {
        toast.success(
          "Profile created successfully"
        );

        queryClient.invalidateQueries(
          ["customers", "me"]
        );
      },

      onError: () => {
        toast.error(
          "Failed to create profile"
        );
      },
    });

const updateMutation =
  useMutation({
    mutationFn: updateMyCustomer,

    onSuccess: (data) => {
      toast.success(
        "Profile updated successfully"
      );

      // UPDATE AUTH USER

      // invalidate queries so navbar and auth refresh
      queryClient.invalidateQueries(["customers", "me"]);
      queryClient.invalidateQueries(["auth", "me"]);

      // if AuthProvider exposed refetch, call it to refresh context
      if (typeof window !== "undefined") {
        try {
          // call a global hook via custom event to ask provider to refetch (fallback)
          // Best-effort: invalidate auth query will trigger refetch in most setups
        } catch (e) {}
      }
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (
        key === "profilePic" &&
        data.profilePic?.[0]
      ) {
        formData.append(
          "profilePic",
          data.profilePic[0]
        );
      } else {
        formData.append(
          key,
          data[key]
        );
      }
    });

    if (customer) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#050505]
          text-white
          flex items-center
          justify-center
        "
      >
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#050505]
        text-white
        p-4
        md:p-8
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        "
      >
        {/* LEFT CARD */}

        <div
          className="
            bg-zinc-900
            border border-zinc-800
            rounded-3xl
            p-6
            h-fit
          "
        >
          <div className="flex flex-col items-center">
            
            {/* IMAGE */}

            <div className="relative">
              
              <img
                src={
                  profilePreview?.[0]
                    ? URL.createObjectURL(
                        profilePreview[0]
                      )
                    : customer?.profilePic ||
                      user?.profilePic ||
                      "https://via.placeholder.com/200"
                }
                alt="profile"
                className="
                  w-40 h-40
                  rounded-full
                  object-cover
                  border-4 border-zinc-700
                "
              />

              {/* IMAGE UPLOAD */}

              <label
                className="
                  absolute
                  bottom-2
                  right-2
                  bg-white
                  text-black
                  p-3
                  rounded-full
                  cursor-pointer
                  hover:bg-zinc-200
                  transition
                "
              >
                <Camera size={18} />

                <input
                  type="file"
                  hidden
                  {...register(
                    "profilePic"
                  )}
                />
              </label>
            </div>

            {/* NAME */}

            <h2
              className="
                text-2xl
                font-bold
                mt-5
              "
            >
              {customer?.name ||
                user?.name ||
                "Customer"}
            </h2>

            {/* EMAIL */}

            <p className="text-zinc-400 mt-2">
              {customer?.email ||
                user?.email}
            </p>

            {/* CATEGORY */}

            <div
              className="
                mt-5
                px-4 py-2
                rounded-full
                bg-yellow-500/20
                text-yellow-400
                text-sm
                flex items-center
                gap-2
                capitalize
              "
            >
              <Crown size={15} />

              {customer?.category ||
                "middle"}
            </div>

            {/* STATUS */}

            <div
              className={`
                mt-4
                px-4 py-2
                rounded-full
                text-sm
                capitalize
                ${
                  customer?.status ===
                  "inactive"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }
              `}
            >
              {customer?.status ||
                "active"}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div
          className="
            lg:col-span-2
            bg-zinc-900
            border border-zinc-800
            rounded-3xl
            p-6 md:p-8
          "
        >
          <div className="mb-8">
            <h1
              className="
                text-3xl
                font-bold
              "
            >
              My Profile
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage your personal details
            </p>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
              "
            >
              {/* NAME */}

              <div>
                <label className="text-sm text-zinc-400">
                  Full Name
                </label>

                <div
                  className="
                    mt-2
                    flex items-center
                    gap-3
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-4
                  "
                >
                  <User
                    size={18}
                    className="text-zinc-500"
                  />

                  <input
                    {...register(
                      "name"
                    )}
                    placeholder="Name"
                    className="
                      w-full
                      bg-transparent
                      py-4
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="text-sm text-zinc-400">
                  Email
                </label>

                <div
                  className="
                    mt-2
                    flex items-center
                    gap-3
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-4
                  "
                >
                  <Mail
                    size={18}
                    className="text-zinc-500"
                  />

                  <input
                    {...register(
                      "email"
                    )}
                    type="email"
                    placeholder="Email"
                    className="
                      w-full
                      bg-transparent
                      py-4
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label className="text-sm text-zinc-400">
                  Phone
                </label>

                <div
                  className="
                    mt-2
                    flex items-center
                    gap-3
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-4
                  "
                >
                  <Phone
                    size={18}
                    className="text-zinc-500"
                  />

                  <input
                    {...register(
                      "phone"
                    )}
                    placeholder="Phone"
                    className="
                      w-full
                      bg-transparent
                      py-4
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* CATEGORY READ ONLY */}

              <div>
                <label className="text-sm text-zinc-400">
                  Category
                </label>

                <div
                  className="
                    mt-2
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-4 py-4
                    text-yellow-400
                    font-medium
                    capitalize
                  "
                >
                  {customer?.category ||
                    "middle"}
                </div>
              </div>
            </div>

            {/* ADDRESS */}

            <div>
              <label className="text-sm text-zinc-400">
                Address
              </label>

              <div
                className="
                  mt-2
                  flex items-start
                  gap-3
                  bg-black
                  border border-zinc-800
                  rounded-2xl
                  px-4
                "
              >
                <MapPin
                  size={18}
                  className="
                    text-zinc-500
                    mt-4
                  "
                />

                <textarea
                  {...register(
                    "address"
                  )}
                  rows="3"
                  placeholder="Address"
                  className="
                    w-full
                    bg-transparent
                    py-4
                    outline-none
                  "
                />
              </div>
            </div>

            {/* NOTES */}

            <div>
              <label className="text-sm text-zinc-400">
                Notes
              </label>

              <div
                className="
                  mt-2
                  flex items-start
                  gap-3
                  bg-black
                  border border-zinc-800
                  rounded-2xl
                  px-4
                "
              >
                <FileText
                  size={18}
                  className="
                    text-zinc-500
                    mt-4
                  "
                />

                <textarea
                  {...register(
                    "notes"
                  )}
                  rows="4"
                  placeholder="Notes"
                  className="
                    w-full
                    bg-transparent
                    py-4
                    outline-none
                  "
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={
                createMutation.isPending ||
                updateMutation.isPending
              }
              className="
                w-full
                bg-white
                text-black
                py-4
                rounded-2xl
                font-semibold
                hover:bg-zinc-200
                transition
              "
            >
              {customer
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update Profile"
                : createMutation.isPending
                ? "Creating..."
                : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
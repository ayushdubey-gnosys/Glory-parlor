import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

import { toast } from "react-toastify";

import { useStaff } from "../../services/staff/useStaffQuery";

import {
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
} from "../../services/staff/useStaffMutation";

import FormModal from "../../components/Modal/FormModal";

import { useAuth } from "../../context/AuthProvider";

import Button from "../../components/ui/Button";

const StaffPage = () => {
  const { data, isLoading } =
    useStaff();

  const createMutation =
    useCreateStaff();

  const updateMutation =
    useUpdateStaff();

  const deleteMutation =
    useDeleteStaff();

  const { user } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      salary: "",
      experience: "",
      status: "active",
      profilePic: null,
      email: "",
      password: "",
      timing: "",
    });

  const openCreate = () => {
    setEditing(null);

    setForm({
      name: "",
      phone: "",
      salary: "",
      experience: "",
      status: "active",
      profilePic: null,
      email: "",
      password: "",
      timing: "",
    });

    setOpen(true);
  };

  const openEdit = (staff) => {
    setEditing(staff);

    setForm({
      name: staff.name || "",
      phone: staff.phone || "",
      salary: staff.salary || "",
      experience:
        staff.experience || "",
      status:
        staff.status || "active",
      profilePic: null,
      email: staff.email || "",
      password: "",
      timing: staff.timing || "",
    });

    setOpen(true);
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    if (name === "profilePic") {
      setForm((prev) => ({
        ...prev,
        profilePic: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          if (value) {
            fd.append(key, value);
          }
        }
      );

      if (editing) {
        await updateMutation.mutateAsync(
          {
            id: editing._id,
            data: fd,
          }
        );

        toast.success(
          "Staff updated"
        );
      } else {
        await createMutation.mutateAsync(
          fd
        );

        toast.success(
          "Staff created"
        );
      }

      setOpen(false);
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Operation failed"
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this staff member?"
      )
    )
      return;

    try {
      await deleteMutation.mutateAsync(
        id
      );

      toast.success(
        "Staff deleted"
      );
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Delete failed"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const list = Array.isArray(data)
    ? data
    : data?.staff || [];

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-10
        "
      >
        <div>
          <p
            className="
              text-zinc-500
              uppercase
              tracking-[3px]
              text-xs
              mb-3
            "
          >
            Team Management
          </p>

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Staff Members
          </h1>
        </div>

        {(user?.role === "admin" ||
          user?.role ===
            "superadmin") && (
          <Button
            onClick={openCreate}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
            "
          >
            <Plus size={18} />

            Add Staff
          </Button>
        )}
      </div>

      {/* STAFF GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((s) => (
          <div key={s._id} className="group rounded-3xl border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link
              to={`/staff/${s._id}`}
            >
              {/* IMAGE */}

            <div className="relative">
                <img src={s.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} alt={s.name} className="w-full h-64 object-cover" />

                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${s.status === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {s.status || 'active'}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h2
                      className="
                        text-2xl
                        font-semibold
                        capitalize
                      "
                    >
                      {s.name}
                    </h2>

                    <p
                      className="
                        text-zinc-500
                        text-sm
                        mt-1
                      "
                    >
                      Staff Member
                    </p>
                  </div>
                  <div className="bg-zinc-100 px-3 py-2 rounded-2xl text-sm font-medium text-zinc-700">{s.experience || 0} y</div>
                </div>

                {/* INFO */}

                <div className="mt-6 space-y-4">
                  
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-zinc-500
                      "
                    >
                      <Mail size={15} />

                      Email
                    </div>

                    <span className="text-zinc-300 truncate">
                      {s.email || "-"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-zinc-500
                      "
                    >
                      <Phone size={15} />

                      Phone
                    </div>

                    <span className="text-zinc-300">
                      {s.phone || "-"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-zinc-500
                      "
                    >
                      <Clock3 size={15} />

                      Timing
                    </div>

                    <span className="text-zinc-300">
                      {s.timing || "-"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                    "
                  >
                    <span className="text-zinc-500">
                      Salary
                    </span>

                    <span
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      ₹
                      {s.salary || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* ACTIONS */}

            {(user?.role ===
              "admin" ||
              user?.role ===
                "superadmin") && (
              <div
                className="
                  px-5
                  pb-5
                  flex
                  gap-3
                "
              >
                <button
                  onClick={() =>
                    openEdit(s)
                  }
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    bg-zinc-800
                    text-white
                    font-medium
                    hover:bg-zinc-700
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      s._id
                    )
                  }
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    bg-red-500
                    text-white
                    font-medium
                    hover:bg-red-400
                    transition
                  "
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}

   <FormModal
  title={
    editing
      ? "Edit Staff"
      : "Add Staff"
  }
  open={open}
  onClose={() =>
    setOpen(false)
  }
>
  <div
    className="
      w-full
      max-w-xl
      mx-auto
    "
  >
    <form
      onSubmit={handleSubmit}
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >
      {/* NAME */}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* PHONE */}

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* EMAIL */}

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* PASSWORD */}

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* SALARY */}

      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* EXPERIENCE */}

      <input
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* TIMING */}

      <input
        name="timing"
        value={form.timing}
        onChange={handleChange}
        placeholder="Timing"
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      />

      {/* STATUS */}

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="
          bg-zinc-900
          border border-zinc-800
          p-3
          rounded-xl
          outline-none
          text-sm
        "
      >
        <option value="active">
          Active
        </option>

        <option value="inactive">
          Inactive
        </option>
      </select>

      {/* IMAGE */}

      <div className="md:col-span-2">
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          className="
            w-full
            text-sm
            text-zinc-400
            border
            border-zinc-800
            rounded-xl
            p-3
            bg-zinc-900
          "
        />
      </div>

      {/* BUTTONS */}

      <div
        className="
          md:col-span-2
          flex
          gap-3
          mt-2
        "
      >
        <button
          type="submit"
          className="
            flex-1
            bg-white
            text-black
            py-3
            rounded-xl
            font-semibold
            hover:bg-zinc-200
            transition
          "
        >
          Save
        </button>

        <button
          type="button"
          onClick={() =>
            setOpen(false)
          }
          className="
            flex-1
            font-semibold
            text-zinc-900
            border border-zinc-700
            py-3
            rounded-xl
            hover:bg-zinc-200
            transition
          "
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</FormModal>
    </div>
  );
};

export default StaffPage;
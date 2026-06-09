import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

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

  const { user, hasRole } =
    useAuth();

  const { id: editId } =
    useParams();

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

  const list = Array.isArray(data)
    ? data
    : data?.staff || [];

  // FIXED HOOK ERROR
  useEffect(() => {
    if (!editId) return;

    if (
      !hasRole([
        "admin",
        "superadmin",
      ])
    )
      return;

    const target = list.find(
      (s) =>
        String(s._id) ===
        String(editId)
    );

    if (target) {
      openEdit(target);
    }
  }, [editId, list]);

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

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const fd =
        new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          if (value) {
            fd.append(
              key,
              value
            );
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
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] text-zinc-900 p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Our Professionals
          </p>

          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A]">
            Meet Our Experts
          </h1>

          <p className="max-w-2xl text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
            Discover the talented artists and experienced specialists dedicated to bringing your luxury beauty vision to life. From expert stylists to premium skincare professionals, our team is committed to providing you with an unforgettable experience.
          </p>
        </div>

        {(user?.role ===
          "admin" ||
          user?.role ===
            "superadmin") && (
          <Button
            onClick={
              openCreate
            }
            className="flex items-center text-white  gap-2 rounded-2xl bg-zinc-800 border-[1px] border-zinc-400 hover:bg-black  hover:text-zinc-300 cursor-pointer  animate-bounce "
          >
            <Plus size={18} />
            Add Staff
          </Button>
        )}
      </div>

      {/* STAFF GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {list.map((s) => (
          <div
            key={s._id}
            className="group rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-[540px] max-w-sm mx-auto w-full"
          >

            <div
              className="flex-1 flex flex-col overflow-hidden relative"
            >

              {/* FRONT OF CARD */}
              <div className="flex-1 flex flex-col h-full w-full">
                {/* 75% IMAGE */}
                <div className="h-[75%] w-full overflow-hidden relative">
                  <img
                    src={s.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      s.status === "inactive" ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-green-500/20 text-green-600 border border-green-500/30"
                    }`}
                  >
                    {s.status || "active"}
                  </div>
                </div>

                {/* 25% CONTENT */}
                <div className="h-[25%] p-4 flex flex-col items-center justify-center text-center bg-white">
                  <h2 className="text-2xl text-zinc-900 font-semibold capitalize line-clamp-1">
                    {s.name}
                  </h2>
                  <p className="text-[#D68B2A] text-xs uppercase tracking-widest font-medium mt-1">
                    Staff Member
                  </p>
                </div>
              </div>

              {/* BACK OF CARD / SWIPE OVERLAY */}
              <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-start transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                
                {/* CIRCULAR PROFILE PIC */}
                <img 
                  src={s.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} 
                  alt={s.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#D68B2A]/20 shadow-md mb-4 flex-shrink-0"
                />

                <h3 className="text-xl font-bold text-zinc-900 capitalize">{s.name}</h3>

                <p className="text-gray-500 text-sm text-center mt-3 line-clamp-4 italic">
                  {s.description || "No description provided."}
                </p>

                <div className="w-full mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Experience</span>
                    <span className="font-semibold text-zinc-800">{s.experience || 0} YRS</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Timing</span>
                    <span className="font-semibold text-zinc-800">{s.timing || "-"}</span>
                  </div>
                  {hasRole(["admin", "superadmin"]) && (
                    <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Salary</span>
                      <span className="font-semibold text-[#D68B2A]">₹{s.salary || 0}</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      toast.success(`Inquiry started for ${s.name}. Our team will contact you soon.`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white font-medium hover:scale-105 transition-all shadow-md mt-4"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIONS */}

            {(user?.role ===
              "admin" ||
              user?.role ===
                "superadmin") && (
              <div className="px-4 pb-4 mt-auto flex gap-3">

                <button
                  onClick={() =>
                    openEdit(s)
                  }
                  className="flex-1 py-1.5 rounded-xl bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white font-medium hover:scale-105 transition-all shadow-md text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      s._id
                    )
                  }
                  className="flex-1 py-1.5 rounded-xl 
                  border
                border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white transition text-sm"
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

        <div className="w-full max-w-xl mx-auto">

          <form
            onSubmit={
              handleSubmit
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Name"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={
                handleChange
              }
              placeholder="Phone"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
              placeholder="Email"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={
                handleChange
              }
              placeholder="Password"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              name="salary"
              value={form.salary}
              onChange={
                handleChange
              }
              placeholder="Salary"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              name="experience"
              value={
                form.experience
              }
              onChange={
                handleChange
              }
              placeholder="Experience"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <input
              name="timing"
              value={form.timing}
              onChange={
                handleChange
              }
              placeholder="Timing"
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
            />

            <select
              name="status"
              value={form.status}
              onChange={
                handleChange
              }
              className="bg-zinc-200 border border-zinc-700 p-3 rounded-xl outline-none text-sm"
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
                onChange={
                  handleChange
                }
                className="w-full text-sm text-zinc-400 border border-zinc-700 rounded-xl p-3 bg-zinc-200"
              />
            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3 mt-2">

              <button
                type="submit"
                className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="flex-1 border border-zinc-700 py-3 rounded-xl hover:bg-zinc-800 transition"
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
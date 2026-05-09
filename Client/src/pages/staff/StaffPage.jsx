import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useStaff } from "../../services/staff/useStaffQuery";
import {
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
  useCalculateIncentive,
} from "../../services/staff/useStaffMutation";

import FormModal from "../../components/Modal/FormModal";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";

const StaffPage = () => {
  const { data, isLoading } = useStaff();

  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();
  const deleteMutation = useDeleteStaff();

  const incentiveMutation = useCalculateIncentive();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    salary: "",
    experience: "",
    status: "",
    profilePic: null,
    email: "",
    password: "",
    timing: "",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", phone: "", salary: "", experience: "", status: "", profilePic: null, email: "", password: "", timing: "" });
    setOpen(true);
  };

  const openEdit = (staff) => {
    setEditing(staff);
    setForm({
      name: staff.name || "",
      phone: staff.phone || "",
      salary: staff.salary || "",
      experience: staff.experience || "",
      status: staff.status || "",
      profilePic: null,
      email: staff.email || "",
      password: "",
      timing: staff.timing || "",
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setForm((s) => ({ ...s, profilePic: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      if (form.email) fd.append("email", form.email);
      if (form.timing) fd.append("timing", form.timing);
      fd.append("salary", form.salary);
      fd.append("experience", form.experience);
      fd.append("status", form.status);
      if (form.password) fd.append("password", form.password);
      if (form.profilePic) fd.append("profilePic", form.profilePic);

      if (editing) {
        await updateMutation.mutateAsync({ id: editing._id, data: fd });
        toast.success("Staff updated");
      } else {
        await createMutation.mutateAsync(fd);
        toast.success("Staff created");
      }

      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this staff member?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        {user?.role === "admin" || user?.role === "superadmin" ? (
          <Button onClick={openCreate}>Add Staff</Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(() => {
          const list = Array.isArray(data) ? data : data?.staff || [];
          return list.map((s) => (
            <div key={s._id} className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-md">
              <Link to={`/staff/${s._id}`} className="block">
                <img src={s.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} alt={s.name} className="w-full h-40 object-cover rounded" />
                <div className="mt-4 flex-1">
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <p className="text-sm text-gray-800">{s.email || "-"}</p>
                  <p className="text-sm text-gray-800">{s.phone || "-"}</p>
                  <p className="text-sm text-gray-600">{s.timing || "-"}</p>
                </div>
              </Link>

              {user && (user?.role === "admin" || user?.role === "superadmin") && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(s)} className="px-3 py-1 rounded bg-blue-600 text-white">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                </div>
              )}
            </div>
          ));
        })()}
      </div>

      <FormModal title={editing ? "Edit Staff" : "Add Staff"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="border p-2 rounded" />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password (optional)" className="border p-2 rounded" />
          <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded" />
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (years)" className="border p-2 rounded" />
          <input name="status" value={form.status} onChange={handleChange} placeholder="Status (active/inactive)" className="border p-2 rounded" />
          <input name="timing" value={form.timing} onChange={handleChange} placeholder="Timing (e.g. 10:00-18:00)" className="border p-2 rounded" />
          <input name="profilePic" type="file" accept="image/*" onChange={handleChange} />

          <div className="flex gap-2 mt-3">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
            {editing && (user?.role === "admin" || user?.role === "superadmin") && (
              <button type="button" onClick={() => handleDelete(editing._id)} className="px-4 py-2 rounded bg-red-500 text-white">Delete</button>
            )}
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default StaffPage;
import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useUpdateProfile } from "../../services/auth/useAuthMutation";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, refetchUser, logout } = useAuth();
  const updateMutation = useUpdateProfile();

  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    profilePic: null,
  });

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

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("mobile", form.mobile);
    if (form.profilePic) fd.append("profilePic", form.profilePic);

    try {
      await updateMutation.mutateAsync(fd);
      toast.success("Profile updated");
      await refetchUser();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-gray-600">{user?.email}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Profile Picture</label>
          <input name="profilePic" type="file" accept="image/*" onChange={handleChange} />
        </div>

        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">
            Save
          </button>

          <button
            type="button"
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

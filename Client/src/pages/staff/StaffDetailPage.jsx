import React from "react";
import { useParams, Link } from "react-router-dom";
import { useStaffById } from "../../services/staff/useStaffById";
import { useAuth } from "../../context/AuthProvider";

const StaffDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useStaffById(id);
  const { user } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading staff</div>;

  const s = Array.isArray(data) ? data[0] : data?.staff || data;

  if (!s) return <div>Staff not found</div>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 flex gap-6">
        <img src={s.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} alt={s.name} className="w-48 h-48 object-cover rounded" />

        <div>
          <h1 className="text-2xl font-bold">{s.name}</h1>
          <p className="text-sm text-gray-700">Role: {s.role || "staff"}</p>
          <p className="text-sm text-gray-700">Email: {s.email || "-"}</p>
          <p className="text-sm text-gray-700">Phone: {s.phone || "-"}</p>
          <p className="text-sm text-gray-700">Timing: {s.timing || "-"}</p>
          <p className="text-sm text-gray-700">Salary: {s.salary || "-"}</p>
          <p className="text-sm text-gray-700">Experience: {s.experience || "-"} years</p>
          <p className="text-sm text-gray-700">Status: {s.status || "-"}</p>

          <div className="mt-4 flex gap-2">
            <Link to="/staff" className="px-3 py-1 rounded border">Back to staff</Link>
            {user && (user.role === "admin" || user.role === "superadmin") && (
              <Link to="/staff" className="px-3 py-1 rounded bg-blue-600 text-white">Edit</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;

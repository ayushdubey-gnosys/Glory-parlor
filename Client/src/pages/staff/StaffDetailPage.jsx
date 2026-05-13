import React from "react";
import { useParams, Link } from "react-router-dom";
import { useStaffById } from "../../services/staff/useStaffById";
import { useAuth } from "../../context/AuthProvider";

import {
  Mail,
  Phone,
  Clock,
  BadgeDollarSign,
  Briefcase,
  ShieldCheck,
  ArrowLeft,
  Pencil,
} from "lucide-react";

const StaffDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useStaffById(id);
  const { user, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="animate-pulse text-lg font-semibold">
          Loading staff details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-red-400">
        Error loading staff
      </div>
    );
  }

  const s = Array.isArray(data) ? data[0] : data?.staff || data;

  if (!s) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Staff not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Main Card */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl">

          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-900 relative">

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8">
              <img
                src={
                  s.profilePic ||
                  "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                }
                alt={s.name}
                className="w-32 h-32 rounded-2xl border-4 border-zinc-800 object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {s.name}
                </h1>

                <p className="text-zinc-400 mt-2 capitalize">
                  {s.role || "Staff Member"}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                    s.status === "active"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {s.status || "Unknown"}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">

              {/* Email */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                <Mail className="text-white mt-1" />

                <div>
                  <p className="text-zinc-400 text-sm">Email</p>

                  <p className="font-semibold">
                    {s.email || "-"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                <Phone className="text-white mt-1" />

                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>

                  <p className="font-semibold">
                    {hasRole(["admin", "superadmin", "staff"])
                      ? s.phone || "-"
                      : "Hidden"}
                  </p>
                </div>
              </div>

              {/* Timing */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                <Clock className="text-white mt-1" />

                <div>
                  <p className="text-zinc-400 text-sm">Timing</p>

                  <p className="font-semibold">
                    {s.timing || "-"}
                  </p>
                </div>
              </div>

              {/* Salary - Only Admin & Superadmin */}
              {hasRole(["admin", "superadmin"]) && (
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                  <BadgeDollarSign className="text-white mt-1" />

                  <div>
                    <p className="text-zinc-400 text-sm">Salary</p>

                    <p className="font-semibold">
                      ₹ {s.salary || "-"}
                    </p>
                  </div>
                </div>
              )}

              {/* Experience */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                <Briefcase className="text-white mt-1" />

                <div>
                  <p className="text-zinc-400 text-sm">Experience</p>

                  <p className="font-semibold">
                    {s.experience || "-"} years
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex gap-4 hover:border-white/20 transition-all duration-300">
                <ShieldCheck className="text-white mt-1" />

                <div>
                  <p className="text-zinc-400 text-sm">Role</p>

                  <p className="font-semibold capitalize">
                    {s.role || "staff"}
                  </p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              {/* Back Button */}
              <Link
                to="/staff"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-600 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Back
              </Link>

              {/* Edit Button */}
              {user &&
                (user.role === "admin" ||
                  user.role === "superadmin") && (
                  <Link
                    to={`/staff`}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all duration-300 shadow-lg"
                  >
                    <Pencil size={18} />
                    Edit Staff
                  </Link>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Trash2,
  CheckCircle,
  Plus,
} from "lucide-react";

import { toast } from "react-toastify";

import { useAppointments } from "../../services/appointments/useAppointmentQuery";

import {
  useUpdateAppointment,
  useDeleteAppointment,
  useCreateAppointment,
} from "../../services/appointments/useAppointmentMutation";

import { useServices } from "../../services/Services/useServiceQuery";

import { useStaff } from "../../services/staff/useStaffQuery";

import { useAuth } from "../../context/AuthProvider";

const AllAppointmentsPage = () => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [modeFilter, setModeFilter] =
    useState("all");

  const {
    data,
    isLoading,
  } = useAppointments(
    page,
    limit,
    modeFilter
  );

  const appointments =
    Array.isArray(data)
      ? data
      : data?.data || [];

  const meta = !Array.isArray(data)
    ? data
    : null;

  const updateMutation =
    useUpdateAppointment();

  const deleteMutation =
    useDeleteAppointment();

  const createMutation =
    useCreateAppointment();

  const { user } = useAuth();

  const servicesResp =
    useServices();

  const staffResp =
    useStaff();

  const services = Array.isArray(
    servicesResp.data
  )
    ? servicesResp.data
    : servicesResp.data
        ?.services || [];

  const staffs = Array.isArray(
    staffResp.data
  )
    ? staffResp.data
    : staffResp.data?.staffs ||
      staffResp.data ||
      [];

  const [createOpen, setCreateOpen] =
    useState(false);

  const [createMode, setCreateMode] =
    useState("offline");

  const [offlineForm, setOfflineForm] =
    useState({
      name: "",
      phone: "",
      service: "",
      staff: "",
      date: "",
      time: "",
    });

  const handleCreateAppointment =
    async (isOffline) => {
      try {
        const payload = {
          customer: {
            name: offlineForm.name,
            phone: offlineForm.phone,
          },

          service: offlineForm.service || undefined,
          staff: offlineForm.staff || undefined,
          date: offlineForm.date || undefined,
          time: offlineForm.time || undefined,

          isOffline: !!isOffline,
        };

        await createMutation.mutateAsync(payload);

        toast.success("Appointment created");

        setCreateOpen(false);

        setOfflineForm({
          name: "",
          phone: "",
          service: "",
          staff: "",
          date: "",
          time: "",
        });
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            "Failed to create appointment"
        );
      }
    };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f5]">
        <p className="text-[#D68B2A] font-medium tracking-wider animate-pulse">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] p-6 lg:p-10 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        
        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
            All Appointments
          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
            Manage your luxury salon appointments seamlessly.
          </p>
        </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {(user?.role === "admin" ||
              user?.role === "superadmin") && (
              <button
                onClick={() => {
                  setCreateMode("offline");
                  setCreateOpen(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#D68B2A]/20 text-sm font-medium tracking-wide"
              >
                <Plus size={18} />
                Create Offline
              </button>
            )}

            {user?.role === "customer" && (
              <button
                onClick={() => {
                  setCreateMode("online");
                  setOfflineForm((f) => ({
                    ...f,
                    name: user?.name || "",
                    phone: user?.mobile || user?.phone || "",
                  }));
                  setCreateOpen(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#D68B2A]/20 text-sm font-medium tracking-wide"
              >
                <Plus size={18} />
                Book Appointment
              </button>
            )}
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-8">
          
          {[
            "all",
            "online",
            "offline",
          ].map((mode) => (
            <button
              key={mode}
              onClick={() =>
                setModeFilter(mode)
              }
              className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300
                ${
                  modeFilter === mode
                    ? "bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white shadow-md shadow-[#D68B2A]/30 border border-transparent"
                    : "bg-white border border-[#D68B2A]/20 text-[#D68B2A] hover:border-[#D68B2A]/60 hover:bg-[#D68B2A]/5"
                }
              `}
            >
              {mode}
            </button>
          ))}
        </div>

      {/* APPOINTMENTS */}
      <div className="space-y-4">
        
        {appointments.map(
          (appointment) => {
            const dateStr =
              appointment.date
                ? typeof appointment.date ===
                  "string"
                  ? appointment.date.split(
                      "T"
                    )[0]
                  : new Date(
                      appointment.date
                    )
                      .toISOString()
                      .split("T")[0]
                : "";

            const isBooked =
              appointment.status ===
              "booked";

            const isCompleted =
              appointment.status ===
              "completed";

            return (
              <div
                key={
                  appointment._id
                }
                className="bg-white border border-[#D68B2A]/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative Side Strip */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D68B2A] to-[#b57321] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  
                  {/* LEFT */}
                  <div className="space-y-4 flex-1">
                    
                    <div className="flex flex-wrap items-center gap-3">
                      
                      <h2 className="text-xl font-semibold text-zinc-900 tracking-wide">
                        {appointment
                          .customer
                          ?.name ||
                          "Customer"}
                      </h2>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                          ${
                            isCompleted
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : isBooked
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }
                        `}
                      >
                        {
                          appointment.status
                        }
                      </span>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                          ${
                            appointment.isOffline
                              ? "bg-[#D68B2A]/10 text-[#D68B2A] border-[#D68B2A]/30"
                              : "bg-purple-50 text-purple-600 border-purple-200"
                          }
                        `}
                      >
                        {appointment.isOffline
                          ? "Offline"
                          : "Online"}
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      
                      <div className="bg-[#faf9f5] border border-[#D68B2A]/10 rounded-xl p-3">
                        <p className="text-[10px] uppercase text-[#D68B2A] font-semibold tracking-wider">
                          Service
                        </p>

                        <p className="font-medium text-zinc-800 mt-1 text-sm">
                          {appointment
                            .service
                            ?.name ||
                            "Salon Service"}
                        </p>
                      </div>

                      <div className="bg-[#faf9f5] border border-[#D68B2A]/10 rounded-xl p-3">
                        <p className="text-[10px] uppercase text-[#D68B2A] font-semibold tracking-wider">
                          Staff
                        </p>

                        <p className="font-medium text-zinc-800 mt-1 text-sm">
                          {appointment
                            .staff
                            ?.name ||
                            "Any Staff"}
                        </p>
                      </div>

                      <div className="bg-[#faf9f5] border border-[#D68B2A]/10 rounded-xl p-3 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-[#D68B2A]/10">
                          <Calendar
                            size={16}
                            className="text-[#D68B2A]"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase text-[#D68B2A] font-semibold tracking-wider">
                            Date
                          </p>

                          <p className="font-medium text-zinc-800 text-sm">
                            {dateStr}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#faf9f5] border border-[#D68B2A]/10 rounded-xl p-3 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-[#D68B2A]/10">
                          <Clock
                            size={16}
                            className="text-[#D68B2A]"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase text-[#D68B2A] font-semibold tracking-wider">
                            Time
                          </p>

                          <p className="font-medium text-zinc-800 text-sm">
                            {
                              appointment.time
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PHONE */}
                    {appointment
                      .customer
                      ?.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone
                          size={14}
                          className="text-[#D68B2A]"
                        />
                        {
                          appointment
                            .customer
                            .phone
                        }
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">
                    
                    {appointment.status ===
                      "unbooked" && (
                      <button
                        onClick={async () =>
                          await updateMutation.mutateAsync(
                            {
                              id: appointment._id,

                              data: {
                                status:
                                  "booked",
                              },
                            }
                          )
                        }
                        className="
                          flex items-center gap-2
                          bg-[#D68B2A]/10 text-[#D68B2A] border border-[#D68B2A]/30
                          hover:bg-[#D68B2A] hover:text-white transition-all
                          px-4 py-2
                          rounded-xl text-sm font-medium
                        "
                      >
                        <CheckCircle
                          size={16}
                        />
                        Mark Booked
                      </button>
                    )}

                    {appointment.status ===
                      "booked" && (
                      <button
                        onClick={async () =>
                          await updateMutation.mutateAsync(
                            {
                              id: appointment._id,

                              data: {
                                status:
                                  "completed",
                              },
                            }
                          )
                        }
                        className="
                          flex items-center gap-2
                          bg-emerald-50 text-emerald-600 border border-emerald-200
                          hover:bg-emerald-600 hover:text-white transition-all
                          px-4 py-2
                          rounded-xl text-sm font-medium
                        "
                      >
                        <CheckCircle
                          size={16}
                        />
                        Mark Complete
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteMutation.mutateAsync(
                          appointment._id
                        )
                      }
                      className="
                        flex items-center gap-2
                        border border-red-200
                        text-red-500
                        px-4 py-2
                        rounded-xl
                        hover:bg-red-500 hover:text-white transition-all text-sm font-medium
                      "
                    >
                      <Trash2
                        size={16}
                      />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* PAGINATION */}
      {meta && (
        <div className="flex items-center justify-between mt-8 bg-white border border-[#D68B2A]/10 rounded-2xl p-4 shadow-sm">
          
          <p className="text-gray-500 text-sm font-medium">
            Page {meta.page} of{" "}
            {meta.totalPages}
          </p>

          <div className="flex gap-3">
            
            <button
              disabled={page <= 1}
              onClick={() =>
                setPage((p) =>
                  Math.max(
                    1,
                    p - 1
                  )
                )
              }
              className="
                px-5 py-2
                rounded-xl
                border border-[#D68B2A]/20
                bg-white text-[#D68B2A] text-sm font-semibold
                disabled:opacity-50 hover:bg-[#D68B2A]/5 transition-all
              "
            >
              Prev
            </button>

            <button
              disabled={
                page >=
                meta.totalPages
              }
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    meta.totalPages,
                    p + 1
                  )
                )
              }
              className="
                px-5 py-2
                rounded-xl
                bg-gradient-to-b from-[#D68B2A] to-[#b57321]
                text-white text-sm font-semibold
                disabled:opacity-50 hover:scale-105 transition-all shadow-md
              "
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {createOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          
          <div className="bg-[#faf9f5] border border-[#D68B2A]/10 rounded-2xl p-6 w-full max-w-md shadow-xl">
            
            <h2 className="text-2xl font-light text-[#D68B2A] tracking-wide mb-5">
              {createMode === "offline"
                ? "Create Offline Appointment"
                : "Create Appointment"}
            </h2>

            <div className="space-y-4">
              
              <input
                placeholder="Customer Name"
                value={offlineForm.name}
                onChange={(e) =>
                  setOfflineForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
              />

              <input
                placeholder="Phone Number"
                value={offlineForm.phone}
                onChange={(e) =>
                  setOfflineForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
              />

              <select
                value={offlineForm.service}
                onChange={(e) =>
                  setOfflineForm((f) => ({ ...f, service: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
              >
                <option value="">
                  Select Service
                </option>

                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <select
                value={offlineForm.staff}
                onChange={(e) =>
                  setOfflineForm((f) => ({ ...f, staff: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
              >
                <option value="">
                  Select Staff
                </option>

                {staffs.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                
                <input
                  type="date"
                  value={offlineForm.date}
                  onChange={(e) =>
                    setOfflineForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
                />

                <input
                  type="time"
                  value={offlineForm.time}
                  onChange={(e) =>
                    setOfflineForm((f) => ({ ...f, time: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#D68B2A]/20 focus:outline-none focus:border-[#D68B2A] focus:ring-1 focus:ring-[#D68B2A]/30 transition-all text-sm text-zinc-800 bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              
              <button
                onClick={() => setCreateOpen(false)}
                className="px-5 py-2 text-sm rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={() => handleCreateAppointment(createMode === "offline")}
                disabled={createMutation.isPending}
                className="px-6 py-2 text-sm bg-gradient-to-b from-[#D68B2A] to-[#b57321] hover:scale-105 shadow-md text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {createMutation.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointmentsPage;
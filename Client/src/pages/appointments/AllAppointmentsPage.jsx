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
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <p className="text-zinc-600">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-6">
      
      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 mb-6">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              All Appointments
            </h1>

            <p className="text-zinc-500 mt-1">
              Manage salon appointments
            </p>
          </div>

          {(user?.role === "admin" ||
            user?.role === "superadmin") && (
            <button
              onClick={() => {
                setCreateMode("offline");
                setCreateOpen(true);
              }}
              className={`
                flex items-center gap-2
                bg-black
                text-white
                px-5 py-3
                rounded-2xl
                hover:bg-zinc-800
              `}
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
              className={`
                flex items-center gap-2
                bg-emerald-600
                text-white
                px-5 py-3
                rounded-2xl
                hover:bg-emerald-500
              `}
            >
              <Plus size={18} />
              Create Appointment
            </button>
          )}
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mt-6">
          
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
                px-4 py-2 rounded-xl text-sm font-medium capitalize transition
                ${
                  modeFilter === mode
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-700"
                }
              `}
            >
              {mode}
            </button>
          ))}
        </div>
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
                className="
                  bg-white
                  border border-zinc-200
                  rounded-3xl
                  p-5
                "
              >
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  
                  {/* LEFT */}
                  <div className="space-y-4 flex-1">
                    
                    <div className="flex flex-wrap items-center gap-3">
                      
                      <h2 className="text-xl font-semibold text-zinc-900">
                        {appointment
                          .customer
                          ?.name ||
                          "Customer"}
                      </h2>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium capitalize
                          ${
                            isCompleted
                              ? "bg-green-100 text-green-700"
                              : isBooked
                              ? "bg-blue-100 text-blue-700"
                              : "bg-zinc-100 text-zinc-700"
                          }
                        `}
                      >
                        {
                          appointment.status
                        }
                      </span>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${
                            appointment.isOffline
                              ? "bg-orange-100 text-orange-700"
                              : "bg-emerald-100 text-emerald-700"
                          }
                        `}
                      >
                        {appointment.isOffline
                          ? "Offline"
                          : "Online"}
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      
                      <div className="bg-zinc-100 rounded-2xl p-3">
                        <p className="text-xs text-zinc-500">
                          Service
                        </p>

                        <p className="font-medium text-zinc-900 mt-1">
                          {appointment
                            .service
                            ?.name ||
                            "Salon Service"}
                        </p>
                      </div>

                      <div className="bg-zinc-100 rounded-2xl p-3">
                        <p className="text-xs text-zinc-500">
                          Staff
                        </p>

                        <p className="font-medium text-zinc-900 mt-1">
                          {appointment
                            .staff
                            ?.name ||
                            "Any Staff"}
                        </p>
                      </div>

                      <div className="bg-zinc-100 rounded-2xl p-3 flex items-center gap-2">
                        <Calendar
                          size={16}
                          className="text-zinc-500"
                        />

                        <div>
                          <p className="text-xs text-zinc-500">
                            Date
                          </p>

                          <p className="font-medium text-zinc-900">
                            {dateStr}
                          </p>
                        </div>
                      </div>

                      <div className="bg-zinc-100 rounded-2xl p-3 flex items-center gap-2">
                        <Clock
                          size={16}
                          className="text-zinc-500"
                        />

                        <div>
                          <p className="text-xs text-zinc-500">
                            Time
                          </p>

                          <p className="font-medium text-zinc-900">
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
                      <div className="flex items-center gap-2 text-sm text-zinc-600">
                        <Phone
                          size={15}
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
                          bg-blue-600
                          text-white
                          px-4 py-2
                          rounded-xl
                        "
                      >
                        <CheckCircle
                          size={16}
                        />
                        Booked
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
                          bg-green-600
                          text-white
                          px-4 py-2
                          rounded-xl
                        "
                      >
                        <CheckCircle
                          size={16}
                        />
                        Complete
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
                        border border-red-300
                        text-red-600
                        px-4 py-2
                        rounded-xl
                        hover:bg-red-50
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
        <div className="flex items-center justify-between mt-6 bg-white border border-zinc-200 rounded-2xl p-4">
          
          <p className="text-zinc-600">
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
                px-4 py-2
                rounded-xl
                border
                bg-white
                disabled:opacity-50
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
                px-4 py-2
                rounded-xl
                bg-black
                text-white
                disabled:opacity-50
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
          
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            
            <h2 className="text-2xl font-bold text-zinc-900 mb-5">
              {createMode === "offline"
                ? "Create Offline Appointment"
                : "Create Appointment"}
            </h2>

            <div className="space-y-4">
              
              <input
                placeholder="Customer Name"
                value={
                  offlineForm.name
                }
                onChange={(e) =>
                  setOfflineForm(
                    (f) => ({
                      ...f,
                      name:
                        e.target.value,
                    })
                  )
                }
                className="
                  w-full
                  border border-zinc-300
                  rounded-2xl
                  px-4 py-3
                  outline-none
                "
              />

              <input
                placeholder="Phone Number"
                value={
                  offlineForm.phone
                }
                onChange={(e) =>
                  setOfflineForm(
                    (f) => ({
                      ...f,
                      phone:
                        e.target.value,
                    })
                  )
                }
                className="
                  w-full
                  border border-zinc-300
                  rounded-2xl
                  px-4 py-3
                  outline-none
                "
              />

              <select
                value={
                  offlineForm.service
                }
                onChange={(e) =>
                  setOfflineForm(
                    (f) => ({
                      ...f,
                      service:
                        e.target.value,
                    })
                  )
                }
                className="
                  w-full
                  border border-zinc-300
                  rounded-2xl
                  px-4 py-3
                "
              >
                <option value="">
                  Select Service
                </option>

                {services.map(
                  (s) => (
                    <option
                      key={s._id}
                      value={s._id}
                    >
                      {s.name}
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  offlineForm.staff
                }
                onChange={(e) =>
                  setOfflineForm(
                    (f) => ({
                      ...f,
                      staff:
                        e.target.value,
                    })
                  )
                }
                className="
                  w-full
                  border border-zinc-300
                  rounded-2xl
                  px-4 py-3
                "
              >
                <option value="">
                  Select Staff
                </option>

                {staffs.map((s) => (
                  <option
                    key={s._id}
                    value={s._id}
                  >
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                
                <input
                  type="date"
                  value={
                    offlineForm.date
                  }
                  onChange={(e) =>
                    setOfflineForm(
                      (f) => ({
                        ...f,
                        date:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="
                    border border-zinc-300
                    rounded-2xl
                    px-4 py-3
                  "
                />

                <input
                  type="time"
                  value={
                    offlineForm.time
                  }
                  onChange={(e) =>
                    setOfflineForm(
                      (f) => ({
                        ...f,
                        time:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="
                    border border-zinc-300
                    rounded-2xl
                    px-4 py-3
                  "
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              
              <button
                onClick={() => setCreateOpen(false)}
                className="
                  px-4 py-2
                  border
                  rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleCreateAppointment(
                    createMode === "offline"
                  )
                }
                className="
                  px-5 py-2
                  bg-black
                  text-white
                  rounded-xl
                "
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointmentsPage;
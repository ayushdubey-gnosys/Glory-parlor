import React, { useState } from "react";

import { useAppointments } from "../../services/appointments/useAppointmentQuery";
import {
  useCreateAppointment,
  useUpdateAppointment,
  useDeleteAppointment,
} from "../../services/appointments/useAppointmentMutation";

import { useServices } from "../../services/Services/useServiceQuery";


import { useStaff } from "../../services/staff/useStaffQuery";
import StaffCard from "../../components/staff/StaffCard";
import StaffDetailsModal from "../../components/staff/StaffDetailsModal";
import { useAuth } from "../../context/AuthProvider";

const AppointmentsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useAppointments(page, limit);
  const { user } = useAuth();

  // support both legacy array responses and new paginated responses { data, page, ... }
  const appointments = Array.isArray(data) ? data : data?.data || [];
  const meta = !Array.isArray(data) ? data : null;

  const { data: services } = useServices();
  const { data: staffList } = useStaff();

  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    service: "",
    staff: "",
    date: "",
    time: "",
  });

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffModalOpen, setStaffModalOpen] = useState(false);

  if (isLoading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const payload = {
      service: form.service,
      staff: form.staff,
      date: form.date,
      time: form.time,
    };

    await createMutation.mutateAsync(payload);
    setForm({ service: "", staff: "", date: "", time: "" });
    setShowForm(false);
  };

  const handleEdit = (appointment) => {
    setEditing(appointment._id);
    setForm({
      service: appointment.service?._id || appointment.service,
      staff: appointment.staff?._id || appointment.staff,
      date: appointment.date ? appointment.date.split("T")[0] : "",
      time: appointment.time || "",
    });
    setShowForm(true);
  };

  const handleUpdate = async () => {
    const dataToSend = {
      service: form.service,
      staff: form.staff,
      date: form.date,
      time: form.time,
    };

    await updateMutation.mutateAsync({ id: editing, data: dataToSend });
    setEditing(null);
    setShowForm(false);
    setForm({ service: "", staff: "", date: "", time: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    await deleteMutation.mutateAsync(id);
  };


  return (

  <div className="p-4 md:p-6 lg:p-8">
    
    {/* HEADER */}

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
      <div>
        <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
          Booking Management
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
          Appointments
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
          Manage and schedule client salon appointments.
        </p>
      </div>

      <button
        onClick={() => {
          setShowForm((s) => !s);
          setEditing(null);
        }}
        className="flex items-center gap-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#D68B2A]/20 text-sm font-medium tracking-wide"
      >
        {showForm ? "Close Form" : "Book Appointment"}
      </button>
    </div>

    {/* FORM */}

    {showForm && (
      <div
        className="
          bg-white
          border border-gray-200
          shadow-sm
          rounded-3xl
          p-6 md:p-8
          mb-10
        "
      >
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          {/* SERVICE */}

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="
              bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm
            "
          >
            <option value="">
              Select Service
            </option>

            {services?.map((s) => (
              <option
                key={s._id}
                value={s._id}
              >
                {s.name}
              </option>
            ))}
          </select>

          {/* STAFF */}

          <select
            name="staff"
            value={form.staff}
            onChange={handleChange}
            className="
              bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm
            "
          >
            <option value="">
              Select Staff
            </option>

            {staffList?.map((st) => (
              <option
                key={st._id}
                value={st._id}
              >
                {st.name}
              </option>
            ))}
          </select>

          {/* DATE */}

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="
              bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm
            "
          />

          {/* TIME */}

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="
              bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm
            "
          />
        </div>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          {editing ? (
            <button
              onClick={handleUpdate}
              className="bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-2.5 rounded-xl dm text-sm font-medium shadow-lg shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all w-full sm:w-auto"
            >
              Update Appointment
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-2.5 rounded-xl dm text-sm font-medium shadow-lg shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all w-full sm:w-auto"
            >
              Create Appointment
            </button>
          )}

          <button
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium dm shadow-sm w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* STAFF */}

    <div className="mb-10">
      
      <h2 className="text-2xl font-serif font-light text-gray-900 tracking-wide mb-6">
        Our Staff
      </h2>

      <div
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        "
      >
        {staffList?.map((st) => (
          <StaffCard
            key={st._id}
            staff={st}
            onClick={(s) => {
              setSelectedStaff(s);
              setStaffModalOpen(true);
            }}
          />
        ))}
      </div>
    </div>

    {/* STAFF MODAL */}

    <StaffDetailsModal
      staff={selectedStaff}
      open={staffModalOpen}
      onClose={() => {
        setStaffModalOpen(false);
        setSelectedStaff(null);
      }}
    />

    {/* APPOINTMENTS */}

    <div className="space-y-5">

        {appointments.map((appointment) => {

        const ownerId =
          appointment.customer?._id ||
          appointment.customer;

        // Customers should not see edit controls at all
        const canEdit = user?.role !== "customer";

        const dateStr = appointment.date
          ? typeof appointment.date ===
            "string"
            ? appointment.date.split("T")[0]
            : new Date(
                appointment.date
              )
                .toISOString()
                .split("T")[0]
          : "";

        return (
          <div
            key={appointment._id}
            className="
              bg-white
              border border-gray-200 hover:border-[#D68B2A]/30 hover:bg-gray-50 hover:shadow-md shadow-sm transition-all duration-300
              rounded-3xl
              p-5 md:p-6
            "
          >
            <div
              className="
                flex flex-col
                xl:flex-row
                xl:items-center
                xl:justify-between
                gap-6
              "
            >

              {/* LEFT */}

              <div className="space-y-4">

                {/* CUSTOMER */}

                <div>
                  <h3 className="text-xl font-serif font-light tracking-wide text-gray-900">
                    {appointment.customer?.name ||
                      appointment.customer}
                  </h3>

                  <p className="text-gray-500 mt-2 dm text-sm font-medium">
                    <span className="text-[#D68B2A]">Staff:</span>{" "}
                    {appointment.staff?.name ||
                      appointment.staff}
                  </p>
                </div>

                {/* DETAILS */}

                <div className="flex flex-wrap gap-3">

                  <span
                    className="
                      px-4 py-1.5
                      rounded-lg
                      bg-gray-50
                      border border-gray-100
                      text-sm font-medium dm text-gray-700
                    "
                  >
                    {dateStr}
                  </span>

                  <span
                    className="
                      px-4 py-1.5
                      rounded-lg
                      bg-gray-50
                      border border-gray-100
                      text-sm font-medium dm text-gray-700
                    "
                  >
                    {appointment.time}
                  </span>

                  <span
                    className="
                      px-4 py-1.5
                      rounded-lg
                      bg-[#D68B2A]/10
                      text-[#D68B2A]
                      border border-[#D68B2A]/20
                      text-sm
                      font-medium dm uppercase tracking-widest text-[10px]
                    "
                  >
                    {appointment.status}
                  </span>
                  {(user?.role === "admin" ||
                    user?.role === "staff" ||
                    user?.role === "superadmin") && (
                    <div className="flex gap-2 mt-2">
                      {appointment.status === "unbooked" && (
                        <button
                          onClick={async () => {
                            await updateMutation.mutateAsync({ id: appointment._id, data: { status: "booked" } });
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          Mark Booked
                        </button>
                      )}

                      {appointment.status === "booked" && (
                        <button
                          onClick={async () => {
                            await updateMutation.mutateAsync({ id: appointment._id, data: { status: "Booked" } });
                          }}
                          className="px-3 py-1 bg-indigo-600 text-white rounded"
                        >
                          Mark Booked 
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* CUSTOMER INFO */}

                {(user?.role === "admin" ||
                  user?.role === "staff" ||
                  user?.role ===
                    "superadmin") && (
                  <div className="text-sm text-gray-500 space-y-1">

                    {appointment.customer
                      ?.phone && (
                      <p>
                        {
                          appointment.customer
                            .phone
                        }
                      </p>
                    )}

                    {appointment.customer
                      ?.email && (
                      <p>
                        {
                          appointment.customer
                            .email
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ACTIONS */}

              {canEdit && (
                <div
                  className="
                    flex flex-col
                    sm:flex-row
                    gap-3
                    w-full xl:w-auto
                  "
                >

                  <button
                    onClick={() =>
                      handleEdit(
                        appointment
                      )
                    }
                    className="
                      bg-white border border-gray-200 text-gray-700 py-2.5 px-6 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium dm shadow-sm w-full xl:w-auto
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        appointment._id
                      )
                    }
                    className="
                      bg-red-50 text-red-600 py-2.5 px-6 rounded-xl hover:bg-red-100 transition-all text-sm font-medium dm w-full xl:w-auto
                    "
                  >
                    Delete
                  </button>

                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    {/* Pagination controls for admin/dashboard */}
    {meta && (
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 dm">
        <div className="text-gray-500 text-sm font-medium dm">Page <span className="text-gray-900">{meta.page}</span> of <span className="text-gray-900">{meta.totalPages}</span></div>
        <div className="flex gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium dm shadow-sm"
          >
            Prev
          </button>
          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium dm shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    )}
  </div>
);
  
};

export default AppointmentsPage;
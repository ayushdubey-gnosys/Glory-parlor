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

  <div className="min-h-screen bg-black text-white p-4 md:p-6">
    
    {/* HEADER */}

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Appointments
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage bookings and staff appointments
        </p>
      </div>

      <button
        onClick={() => {
          setShowForm((s) => !s);
          setEditing(null);
        }}
        className="
          bg-white
          text-black
          px-5 py-3
          rounded-2xl
          font-medium
          hover:bg-zinc-200
          transition
          w-full md:w-auto
        "
      >
        {showForm
          ? "Close Form"
          : "Book Appointment"}
      </button>
    </div>

    {/* FORM */}

    {showForm && (
      <div
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-3xl
          p-5 md:p-6
          mb-8
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
              bg-black
              border border-zinc-700
              rounded-2xl
              px-4 py-3
              text-white
              outline-none
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
              bg-black
              border border-zinc-700
              rounded-2xl
              px-4 py-3
              text-white
              outline-none
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
              bg-black
              border border-zinc-700
              rounded-2xl
              px-4 py-3
              text-white
              outline-none
            "
          />

          {/* TIME */}

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="
              bg-black
              border border-zinc-700
              rounded-2xl
              px-4 py-3
              text-white
              outline-none
            "
          />
        </div>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          {editing ? (
            <button
              onClick={handleUpdate}
              className="
                bg-white
                text-black
                px-5 py-3
                rounded-2xl
                font-medium
                w-full sm:w-auto
              "
            >
              Update Appointment
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="
                bg-white
                text-black
                px-5 py-3
                rounded-2xl
                font-medium
                w-full sm:w-auto
              "
            >
              Create Appointment
            </button>
          )}

          <button
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
            className="
              border border-zinc-700
              px-5 py-3
              rounded-2xl
              text-white
              w-full sm:w-auto
            "
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* STAFF */}

    <div className="mb-10">
      
      <h2 className="text-2xl font-semibold mb-5">
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
              bg-zinc-900
              border border-zinc-800
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
                  <h3 className="text-xl font-semibold">
                    {appointment.customer?.name ||
                      appointment.customer}
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    Staff:{" "}
                    {appointment.staff?.name ||
                      appointment.staff}
                  </p>
                </div>

                {/* DETAILS */}

                <div className="flex flex-wrap gap-3">

                  <span
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-black
                      border border-zinc-700
                      text-sm
                    "
                  >
                    {dateStr}
                  </span>

                  <span
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-black
                      border border-zinc-700
                      text-sm
                    "
                  >
                    {appointment.time}
                  </span>

                  <span
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-white
                      text-black
                      text-sm
                      font-medium
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
                  <div className="text-sm text-zinc-400 space-y-1">

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
                      bg-white
                      text-black
                      px-5 py-3
                      rounded-2xl
                      font-medium
                      w-full
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
                      bg-red-500
                      text-white
                      px-5 py-3
                      rounded-2xl
                      font-medium
                      w-full
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
      <div className="mt-6 flex items-center justify-between">
        <div className="text-zinc-400">Page {meta.page} of {meta.totalPages}</div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded border bg-zinc-900 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            className="px-4 py-2 rounded border bg-zinc-900 disabled:opacity-50"
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
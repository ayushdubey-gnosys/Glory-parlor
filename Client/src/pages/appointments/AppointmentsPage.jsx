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
  const { data, isLoading } = useAppointments();
  const { user } = useAuth();

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
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <button
          onClick={() => {
            setShowForm((s) => !s);
            setEditing(null);
          }}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          {showForm ? "Close" : "Book Appointment"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-5 rounded-xl shadow mb-5">
          <div className="grid grid-cols-4 gap-4">
            <select name="service" value={form.service} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select service</option>
              {services?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select name="staff" value={form.staff} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select staff</option>
              {staffList?.map((st) => (
                <option key={st._id} value={st._id}>
                  {st.name}
                </option>
              ))}
            </select>

            <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />

            <input type="time" name="time" value={form.time} onChange={handleChange} className="border p-2 rounded" />
          </div>

          <div className="mt-4">
            {editing ? (
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Update</button>
            ) : (
              <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Create</button>
            )}

            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 rounded border">Cancel</button>
          </div>
        </div>
      )}

      {/* Staff listing for customers as cards */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Our Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <StaffDetailsModal staff={selectedStaff} open={staffModalOpen} onClose={() => { setStaffModalOpen(false); setSelectedStaff(null); }} />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Staff</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((appointment) => {
              const ownerId = appointment.customer?._id || appointment.customer;

              // Allow customers to edit if their email/phone matches the appointment customer
              const customerMatchesUser =
                (appointment.customer?.email && appointment.customer.email === user?.email) ||
                (appointment.customer?.phone && appointment.customer.phone === user?.mobile) ||
                (ownerId && user?._id && ownerId.toString() === user._id.toString());

              const canEdit = user?.role !== "customer" || customerMatchesUser;

              const dateStr = appointment.date
                ? typeof appointment.date === "string"
                  ? appointment.date.split("T")[0]
                  : new Date(appointment.date).toISOString().split("T")[0]
                : "";

              const timeStr = (() => {
                if (!appointment.time) return "";
                // if time already contains AM/PM, return as-is
                if (/AM|PM|am|pm/.test(appointment.time)) return appointment.time;
                // if time is HH:MM (24h), convert to local 12h display
                const parts = appointment.time.split(":");
                if (parts.length >= 2) {
                  const hh = parseInt(parts[0], 10);
                  const mm = parts[1].slice(0,2);
                  const ampm = hh >= 12 ? "PM" : "AM";
                  const hh12 = ((hh + 11) % 12) + 1;
                  return `${String(hh12).padStart(2, "0")}:${mm} ${ampm}`;
                }
                return appointment.time;
              })();

              return (
                <tr key={appointment._id} className="border-t">
                  <td className="p-4">
                    <div className="font-medium">{appointment.customer?.name || appointment.customer}</div>
                    {(user?.role === "admin" || user?.role === "staff" || user?.role === "superadmin") && (
                      <div className="text-sm text-gray-500 mt-1">
                        {appointment.customer?.phone && <span>{appointment.customer.phone}</span>}
                        {appointment.customer?.email && <span className="ml-3">{appointment.customer.email}</span>}
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="font-medium">{appointment.staff?.name || appointment.staff}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {appointment.staff?.status ? (
                        <span className="mr-3">Status: {appointment.staff.status}</span>
                      ) : (
                        <span className="mr-3">Status: active</span>
                      )}

                      {appointment.staff?.experience ? (
                        <span>Experience: {appointment.staff.experience} yrs</span>
                      ) : (
                        <span>Level: {appointment.staff?.role || "--"}</span>
                      )}
                    </div>
                    {appointment.staff?.phone && <div className="text-sm text-gray-500 mt-1">{appointment.staff.phone}</div>}
                  </td>
                  <td className="p-4">{dateStr}</td>
                  <td className="p-4">{timeStr}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">{appointment.status}</span>
                  </td>
                  <td className="p-4">
                    {canEdit && (
                      <>
                        <button onClick={() => handleEdit(appointment)} className="mr-2 px-3 py-1 bg-yellow-400 rounded">Edit</button>
                        <button onClick={() => handleDelete(appointment._id)} className="px-3 py-1 bg-red-400 rounded">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
import React, { useState } from "react";
import { useAppointments } from "../../services/appointments/useAppointmentQuery";
import { useUpdateAppointment, useDeleteAppointment } from "../../services/appointments/useAppointmentMutation";
import { useAuth } from "../../context/AuthProvider";

const AllAppointmentsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useAppointments(page, limit);
  const appointments = Array.isArray(data) ? data : data?.data || [];
  const meta = !Array.isArray(data) ? data : null;

  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();
  const { user } = useAuth();

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-white  text-zinc-900 p-6">
      <h1 className="text-3xl font-bold mb-6">All Appointments</h1>

      <div className="space-y-5">
        {appointments.map((appointment) => {
          const ownerId = appointment.customer?._id || appointment.customer;
          const canEdit = user?.role !== "customer";

          const dateStr = appointment.date
            ? typeof appointment.date === "string"
              ? appointment.date.split("T")[0]
              : new Date(appointment.date).toISOString().split("T")[0]
            : "";

          return (
            <div key={appointment._id} className="bg-zinc-800 border border-zinc-800 text-white rounded-3xl p-5 md:p-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{appointment.customer?.name || appointment.customer}</h3>
                    <p className="text-zinc-400 mt-1">Staff: {appointment.staff?.name || appointment.staff}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="px-4 py-2 rounded-xl bg-black border border-zinc-700 text-sm">{dateStr}</span>
                    <span className="px-4 py-2 rounded-xl bg-black border border-zinc-700 text-sm">{appointment.time}</span>
                    <span className="px-4 py-2 rounded-xl bg-transparent text-zinc-200 border text-sm font-medium">{appointment.status}</span>

                    {(user?.role === "admin" || user?.role === "staff" || user?.role === "superadmin") && (
                      <div className="flex gap-2 mt-2">
                        {appointment.status === "unbooked" && (
                          <button onClick={async () => await updateMutation.mutateAsync({ id: appointment._id, data: { status: "booked" } })} className="px-3 py-1 bg-zinc-900 animate-pulse text-white border border-green-600 rounded">Mark Booked</button>
                        )}
                        {appointment.status === "booked" && (
                          <button onClick={async () => await updateMutation.mutateAsync({ id: appointment._id, data: { status: "completed" } })} className="px-3 py-1 bg-indigo-600 text-white rounded">Mark Completed</button>
                        )}
                      </div>
                    )}
                  </div>

                  {(user?.role === "admin" || user?.role === "staff" || user?.role === "superadmin") && (
                    <div className="text-sm text-zinc-400 mt-2">
                      {appointment.customer?.phone && <p>{appointment.customer.phone}</p>}
                      {appointment.customer?.email && <p>{appointment.customer.email}</p>}
                    </div>
                  )}
                </div>

                {canEdit && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                    <button onClick={() => { /* Edit handled on book page via query params or modal if needed */ }} className="bg-white text-black px-5 py-3 rounded-2xl font-medium w-full">Edit</button>
                    <button onClick={() => deleteMutation.mutateAsync(appointment._id)} className=" border-2 border-red-500 text-white px-5 py-3 rounded-2xl font-medium w-full">Delete</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {meta && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-zinc-900">Page {meta.page} of {meta.totalPages}</div>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-4 py-2 rounded border text-white bg-zinc-900 disabled:opacity-50">Prev</button>
            <button disabled={page >= meta.totalPages} onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))} className="px-4 py-2 rounded border bg-zinc-800 text-white   disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointmentsPage;

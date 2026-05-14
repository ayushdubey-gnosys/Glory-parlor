import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useServices } from "../../services/Services/useServiceQuery";
import { useStaff } from "../../services/staff/useStaffQuery";
import { useCreateAppointment } from "../../services/appointments/useAppointmentMutation";

const BookAppointmentPage = () => {
  const navigate = useNavigate();

  const { data: services } = useServices();
  const { data: staffList } = useStaff();

  const createMutation =
    useCreateAppointment();

  const [form, setForm] =
    useState({
      service: "",
      staff: "",
      date: "",
      time: "",
    });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  const handleCreate =
    async () => {
      try {
        const payload = {
          service: form.service,
          staff: form.staff,
          date: form.date,
          time: form.time,
        };

        await createMutation.mutateAsync(
          payload
        );

        setForm({
          service: "",
          staff: "",
          date: "",
          time: "",
        });

        // NAVIGATE AFTER SUCCESS
        navigate(
          "/appointments/all"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none"
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

          <select
            name="staff"
            value={form.staff}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none"
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

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none"
          />
        </div>

        <div className="flex gap-3 mt-6">
          
          <button
            onClick={handleCreate}
            disabled={
              createMutation.isPending
            }
            className="bg-white text-black px-5 py-3 rounded-2xl font-medium"
          >
            {createMutation.isPending
              ? "Creating..."
              : "Create Appointment"}
          </button>

          <button
            onClick={() =>
              setForm({
                service: "",
                staff: "",
                date: "",
                time: "",
              })
            }
            className="border border-zinc-200 text-white px-5 py-3 rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
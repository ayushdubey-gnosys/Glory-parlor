import React from "react";

import {
  useAppointments,
} from "../../services/appointments/useAppointmentQuery";

const AppointmentsPage = () => {
  const { data, isLoading } =
    useAppointments();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          Book Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Staff
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Time
              </th>

              <th className="text-left p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-t"
              >
                <td className="p-4">
                  {appointment.customer?.name}
                </td>

                <td className="p-4">
                  {appointment.staff?.name}
                </td>

                <td className="p-4">
                  {appointment.date}
                </td>

                <td className="p-4">
                  {appointment.time}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
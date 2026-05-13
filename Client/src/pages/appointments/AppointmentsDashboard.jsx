import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentsDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Book Appointment",
      desc: "Create new appointment",
      path: "/appointments/book",
    },
    {
      title: "All Appointments",
      desc: "View all appointments",
      path: "/appointments/all",
    },
    {
      title: "Staff Members",
      desc: "View staff members",
      path: "/appointments/staff",
    },
  ];

  return (
    <div className="min-h-screen  text-zinc-950 p-6">
      <h1 className="text-4xl font-bold mb-10">
        Appointment Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="
              bg-zinc-200
              border border-zinc-900
              rounded-3xl
              p-6
              cursor-pointer
              hover:shadow-2xl hover:shadow-zinc-800
              
              transition
            "
          >
            <h2 className="text-2xl font-semibold mb-3">
              {card.title}
            </h2>

            <p className="text-zinc-700">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
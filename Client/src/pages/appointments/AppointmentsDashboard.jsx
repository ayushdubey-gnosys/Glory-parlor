import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useStaff } from "../../services/staff/useStaffQuery";
import { useServices } from "../../services/Services/useServiceQuery";
import { useAppointments } from "../../services/appointments/useAppointmentQuery";
import BookStaffAppointmentModal from "../../components/appointments/BookStaffAppointmentModal";

const AppointmentsDashboard = () => {
  const navigate = useNavigate();
  const { hasRole, user } = useAuth();

  // Queries
  const { data: staffList, isLoading: loadingStaff } = useStaff();
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: apptData, isLoading: loadingAppts } = useAppointments(1, 10);

  // States
  const [openBookModal, setOpenBookModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const appointments = Array.isArray(apptData) ? apptData : apptData?.data || [];

  const handleOpenBooking = (staffMember) => {
    setSelectedStaff(staffMember);
    setOpenBookModal(true);
  };

  const isCustomer = hasRole("customer");

  // RENDER CUSTOMER-SPECIFIC PREMIUM DASHBOARD
  if (isCustomer) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6 md:p-10 text-zinc-900">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* WELCOME BANNER */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 p-8 md:p-12 text-white shadow-xl">
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-zinc-800 opacity-20 blur-3xl"></div>
            <div className="relative z-10 space-y-4 max-w-2xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 rounded-full border border-white/20">
                Premium Salon Experience
              </span>
              <h1 className="text-3xl md:text-5xl font-light leading-tight">
                Book an Appointment with <br />
                <span className="font-semibold text-zinc-200">Our Premium Staff</span>
              </h1>
              <p className="text-zinc-400 text-sm md:text-base font-light">
                Choose from our handpicked junior, senior, and expert stylists. Fix your slot instantly and experience luxury grooming tailored just for you.
              </p>
            </div>
          </div>

          {/* STAFF SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Meet Our Professional Staff</h2>
                <p className="text-zinc-500 text-sm mt-1">Book directly with your preferred artist</p>
              </div>
            </div>

            {loadingStaff ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-72 bg-zinc-100 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : !staffList || staffList.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-zinc-200 text-zinc-500">
                No staff members are currently available for booking.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {staffList.map((staffMember) => {
                  const isExpert = staffMember.role === "expert";
                  const isSenior = staffMember.role === "senior";

                  return (
                    <div
                      key={staffMember._id}
                      className="group bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      {/* PROFILE PIC CONTAINER */}
                      <div className="h-48 w-full overflow-hidden bg-zinc-100 relative">
                        <img
                          src={
                            staffMember.profilePic ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                          }
                          alt={staffMember.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* ROLE BADGE ON PHOTO */}
                        <span
                          className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${isExpert
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : isSenior
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-zinc-100 text-zinc-800 border border-zinc-200"
                            }`}
                        >
                          {staffMember.role || "Stylist"}
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-zinc-700 transition">
                            {staffMember.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 mt-2 font-light">
                            {staffMember.experience > 0 && (
                              <span>{staffMember.experience} Years Exp.</span>
                            )}
                            {staffMember.timing && (
                              <span className="border-l border-zinc-200 pl-3">
                                {staffMember.timing}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenBooking(staffMember)}
                          className="w-full bg-zinc-950 hover:bg-zinc-800 text-white py-2.5 rounded-2xl text-sm font-medium transition duration-300"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* MY BOOKINGS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-t border-zinc-200/80 pt-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Your Appointments</h2>
                <p className="text-zinc-500 text-sm mt-1">Review and manage your scheduled sessions</p>
              </div>
            </div>

            {loadingAppts ? (
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-20 bg-zinc-100 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200/80">
                <p className="text-zinc-500 font-light">You don't have any booked appointments yet.</p>
                <p className="text-zinc-400 text-xs mt-1">Choose a stylist above to book your first slot!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appt) => {
                  const dateStr = appt.date
                    ? typeof appt.date === "string"
                      ? appt.date.split("T")[0]
                      : new Date(appt.date).toISOString().split("T")[0]
                    : "";

                  const isBooked = appt.status === "booked";
                  const isCompleted = appt.status === "completed";
                  const isCancelled = appt.status === "cancelled";

                  return (
                    <div
                      key={appt._id}
                      className="bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-zinc-900">
                            {appt.service?.name || "Salon Service"}
                          </h4>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${isCompleted
                                ? "bg-green-50 text-green-700"
                                : isBooked
                                  ? "bg-blue-50 text-blue-700"
                                  : isCancelled
                                    ? "bg-red-50 text-red-700"
                                    : "bg-zinc-50 text-zinc-700"
                              }`}
                          >
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 font-light">
                          Stylist: <span className="font-medium text-zinc-700">{appt.staff?.name || "Any Artist"}</span>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <span>{dateStr}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300"></span>
                          <span>{appt.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* BOOKING MODAL */}
        <BookStaffAppointmentModal
          staff={selectedStaff}
          services={services}
          open={openBookModal}
          onClose={() => setOpenBookModal(false)}
        />
      </div>
    );
  }

  // RENDER ORIGINAL ADMIN/STAFF DASHBOARD
  const cards = [
   
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
    <div className="min-h-screen text-zinc-950 p-6 bg-zinc-50">
      <h1 className="text-4xl font-bold mb-10">Appointment Dashboard</h1>

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
            <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>
            <p className="text-zinc-700">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
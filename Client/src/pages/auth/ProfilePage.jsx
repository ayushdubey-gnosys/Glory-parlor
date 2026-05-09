import React from "react";

import {
  Users,
  IndianRupee,
  CalendarDays,
  UserCheck,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Scissors,
  Clock3,
} from "lucide-react";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import { useAuth } from "../../context/AuthProvider";

const DashboardPage = () => {
  const { data: customers } =
    useCustomers();

  const { user } = useAuth();

  const stats = [
    {
      title: "Revenue",
      value: "₹2,40,000",
      icon: IndianRupee,
      growth: "+18%",
    },

    {
      title: "Customers",
      value:
        customers?.length || 0,
      icon: Users,
      growth: "+12%",
    },

    {
      title: "Appointments",
      value: 120,
      icon: CalendarDays,
      growth: "+9%",
    },

    {
      title: "Staff",
      value: 18,
      icon: UserCheck,
      growth: "+5%",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* HEADING */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          
          <div>
            <h1 className="text-4xl font-light text-white">
              Dashboard
            </h1>

            <p className="text-zinc-500 mt-2 text-sm">
              Manage salon analytics,
              customers, appointments
              and daily activities.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 flex items-center gap-4">
            
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
              <Sparkles className="text-black" />
            </div>

            <div>
              <h3 className="text-white font-medium">
                Glory PMS
              </h3>

              <p className="text-zinc-500 text-sm capitalize">
                {user?.role} Panel
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          
          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition"
              >
                
                <div className="flex items-center justify-between">
                  
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <Icon className="text-white" />
                  </div>

                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    {item.growth}

                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-6">
                  
                  <h2 className="text-3xl font-light text-white">
                    {item.value}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* CHART CARD */}
          <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            
            <div className="flex items-center justify-between mb-6">
              
              <div>
                <h2 className="text-2xl text-white font-light">
                  Performance
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Salon growth overview
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <TrendingUp className="text-white" />
              </div>
            </div>

            {/* PLACEHOLDER */}
            <div className="h-[320px] rounded-3xl bg-zinc-950 border border-dashed border-zinc-800 flex items-center justify-center">
              
              <div className="text-center">
                
                <TrendingUp
                  size={42}
                  className="mx-auto text-zinc-700"
                />

                <p className="text-zinc-500 mt-4">
                  Chart analytics will
                  appear here
                </p>
              </div>
            </div>
          </div>

          {/* SIDE CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            
            <div className="flex items-center justify-between mb-6">
              
              <div>
                <h2 className="text-2xl text-white font-light">
                  Top Services
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Most booked services
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <Scissors className="text-white" />
              </div>
            </div>

            <div className="space-y-4">
              
              {[
                {
                  name: "Hair Styling",
                  total: 40,
                },

                {
                  name: "Facial",
                  total: 32,
                },

                {
                  name: "Nail Art",
                  total: 25,
                },

                {
                  name: "Hair Spa",
                  total: 18,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                >
                  
                  <div className="flex items-center justify-between">
                    
                    <div>
                      <h3 className="text-white">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {
                          item.total
                        }{" "}
                        bookings
                      </p>
                    </div>

                    <div className="text-white font-semibold">
                      {90 - i * 10}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROLE CARDS */}
        {user?.role ===
          "superadmin" && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            
            <div className="flex items-center gap-4">
              
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <Sparkles className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl text-white font-light">
                  Super Admin Controls
                </h2>

                <p className="text-zinc-500 mt-1">
                  Manage global salon
                  analytics and system
                  settings.
                </p>
              </div>
            </div>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            
            <div className="flex items-center gap-4">
              
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <Users className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl text-white font-light">
                  Admin Panel
                </h2>

                <p className="text-zinc-500 mt-1">
                  Manage appointments,
                  staff and customers.
                </p>
              </div>
            </div>
          </div>
        )}

        {user?.role === "staff" && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            
            <div className="flex items-center gap-4">
              
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <Clock3 className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl text-white font-light">
                  Staff Activity
                </h2>

                <p className="text-zinc-500 mt-1">
                  View assigned bookings
                  and daily tasks.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
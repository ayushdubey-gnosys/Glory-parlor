import React from "react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Scissors,
  UserCog,
  Package,
  Receipt,
  MessageSquare,
  GraduationCap,
  Megaphone,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    roles: ["superadmin", "admin", "staff"],
  },

  {
    to: "/customers",
    label: "Customers",
    icon: <Users size={18} />,
    roles: ["superadmin", "admin"],
  },

  {
    to: "/appointments",
    label: "Appointments",
    icon: <CalendarDays size={18} />,
    roles: [
      "superadmin",
      "admin",
      "staff",
      "customer",
    ],
  },

  {
    to: "/services",
    label: "Services",
    icon: <Scissors size={18} />,
    roles: [
      "superadmin",
      "admin",
      "staff",
      "customer",
    ],
  },

  {
    to: "/staff",
    label: "Staff",
    icon: <UserCog size={18} />,
    roles: [
      "superadmin",
      "admin",
      "staff",
      "customer",
    ],
  },

  {
    to: "/inventory",
    label: "Inventory",
    icon: <Package size={18} />,
    roles: ["superadmin", "admin"],
  },

  {
    to: "/billing",
    label: "Billing",
    icon: <Receipt size={18} />,
    roles: ["superadmin", "admin"],
  },

  {
    to: "/inquiries",
    label: "Inquiries",
    icon: <MessageSquare size={18} />,
    roles: [
      "superadmin",
      "admin",
      "staff",
    ],
  },

  {
    to: "/inquiry",
    label: "My Inquiries",
    icon: <MessageSquare size={18} />,
    roles: ["customer"],
  },

  {
    to: "/academy",
    label: "Academy",
    icon: <GraduationCap size={18} />,
    roles: [
      "superadmin",
      "admin",
      "staff",
      "customer",
    ],
  },

  {
    to: "/marketing",
    label: "Marketing",
    icon: <Megaphone size={18} />,
    roles: ["superadmin", "admin"],
  },

  {
    to: "/admin/incentive",
    label: "Incentives",
    icon: <Receipt size={18} />,
    roles: ["superadmin", "admin"],
  },
];

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const { user, hasRole } =
    useAuth();

  const handleCloseSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* GOOGLE FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-left {
          animation: fadeLeft .4s ease;
        }

        .sidebar-scroll {
          scrollbar-width: none;
        }

        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        .sidebar-scroll:hover::-webkit-scrollbar {
          width: 8px;
        }

        .sidebar-scroll:hover::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 8px;
        }
      `}</style>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          flex flex-col
          w-[290px]
          h-screen
          border-r border-white/5
          backdrop-blur-2xl
          px-6 py-7
          sidebar-scroll
          z-50
          overflow-y-auto
          transition-transform duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
        style={{
          background:
            "rgba(10,10,10,0.95)",
        }}
      >
        {/* BACKGROUND EFFECT */}
        <div className="absolute top-[-120px] left-[-120px] w-[260px] h-[260px] bg-yellow-700/10 rounded-full blur-[120px]" />

        {/* LOGO */}
        <div className="relative z-10 flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg,#c9a96e,#8a6535)",
              }}
            >
              <Sparkles
                size={18}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-white text-xl uppercase tracking-[5px] font-light">
                Astha PMS
              </h1>

              <p className="dm text-[10px] uppercase tracking-[3px] text-zinc-600 mt-1">
                Luxury Salon Software
              </p>
            </div>
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="md:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center"
          >
            <X
              size={20}
              className="text-white"
            />
          </button>
        </div>

        {/* MENU TITLE */}
        <div className="relative z-10 mb-5 px-2">
          <p className="dm text-[11px] uppercase tracking-[3px] text-zinc-600">
            Main Navigation
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="relative z-10 flex flex-col gap-2">
          {links
            .filter((l) =>
              user
                ? hasRole(l.roles)
                : false
            )
            .map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={handleCloseSidebar}
                className={({
                  isActive,
                }) =>
                  `
                  fade-left
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  border
                  ${
                    isActive
                      ? "bg-white/[0.06] border-yellow-700/20"
                      : "border-transparent hover:bg-white/[0.03]"
                  }
                `
                }
                style={{
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {({
                  isActive,
                }) => (
                  <>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? ""
                            : "bg-white/[0.03] border border-white/5"
                        }`}
                        style={
                          isActive
                            ? {
                                background:
                                  "linear-gradient(135deg,#c9a96e,#a07840)",
                                color:
                                  "#000",
                              }
                            : {
                                color:
                                  "#c9a96e",
                              }
                        }
                      >
                        {l.icon}
                      </div>

                      <div>
                        <p
                          className={`dm text-sm transition-all ${
                            isActive
                              ? "text-white font-medium"
                              : "text-zinc-400 group-hover:text-white"
                          }`}
                        >
                          {l.label}
                        </p>

                        <p className="dm text-[11px] text-zinc-600 mt-1">
                          Manage{" "}
                          {l.label.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`transition-all ${
                        isActive
                          ? "text-yellow-500 translate-x-1"
                          : "text-zinc-700 group-hover:text-zinc-400"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
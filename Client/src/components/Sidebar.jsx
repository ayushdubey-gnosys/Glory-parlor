
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const links = [
  { to: "/", label: "Dashboard", roles: ["superadmin", "admin", "staff"] },
  { to: "/customers", label: "Customers", roles: ["superadmin", "admin"] },
  { to: "/appointments", label: "Appointments", roles: ["superadmin", "admin", "staff"] },
  { to: "/services", label: "Services", roles: ["superadmin", "admin"] },
  { to: "/staff", label: "Staff", roles: ["superadmin", "admin"] },
  { to: "/inventory", label: "Inventory", roles: ["superadmin", "admin"] },
  { to: "/billing", label: "Billing", roles: ["superadmin", "admin"] },
  { to: "/inquiries", label: "Inquiries", roles: ["superadmin", "admin", "staff"] },
  { to: "/academy", label: "Academy", roles: ["superadmin", "admin"] },
  { to: "/marketing", label: "Marketing", roles: ["superadmin", "admin"] },
];

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
      <div className="text-2xl font-bold mb-8">Glory PMS</div>
      <nav className="flex flex-col gap-3">
        {links
          .filter((l) => (user ? hasRole(l.roles) : false))
          .map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

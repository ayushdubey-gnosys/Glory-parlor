import React from "react";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-xl font-semibold">Glory's Parlor</div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-sm text-gray-600">{user?.name || "Guest"}</div>
        {user ? (
          <button
            onClick={() => logout()}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;

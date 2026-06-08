import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen">
        <Navbar mobileOpen={mobileSidebarOpen} onMobileToggle={() => setMobileSidebarOpen((s) => !s)} />

        <main className={`${isHomePage ? '' : 'p-6'} flex-1 overflow-auto`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
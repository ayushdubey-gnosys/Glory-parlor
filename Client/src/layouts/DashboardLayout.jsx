import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const removePadding = ['/', '/inquiries/create'].includes(location.pathname) || location.pathname.startsWith('/services/');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf9f5] dm">
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar mobileOpen={mobileSidebarOpen} onMobileToggle={() => setMobileSidebarOpen((s) => !s)} />

        <main className={`${removePadding ? '' : 'p-6'} flex-1 overflow-y-auto`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
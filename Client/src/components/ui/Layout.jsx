import React, { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="flex">
      <Sidebar
        mobileOpen={mobileOpen}
      />

      <div className="flex-1">
        <Navbar
          mobileOpen={mobileOpen}
          setMobileOpen={
            setMobileOpen
          }
        />

        {children}
      </div>
    </div>
  );
};

export default Layout;
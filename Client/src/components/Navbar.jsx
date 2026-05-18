import React, { useState } from "react";

import { useAuth } from "../context/AuthProvider";

import { Link } from "react-router-dom";

import {
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  Menu,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

import { useNotifications } from "../services/notifiucation/useNotificationQuery";

const Navbar = ({ onMobileToggle }) => {
  const { user } = useAuth();

  const { data: notifications = [] } =
    useNotifications();

  const [open, setOpen] =
    useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <>
      {/* GOOGLE FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-animation {
          animation: fadeIn .25s ease;
        }
      `}</style>

      <header
        className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/5"
        style={{
          background:
            "rgba(10,10,10,0.75)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[82px] flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-12">
            {/* MOBILE HAMBURGER -> toggles sidebar on mobile */}
            <button onClick={onMobileToggle} className="md:hidden mr-2 rounded-lg p-2 bg-white/[0.03] border border-white/5">
              <Menu size={18} className="text-white" />
            </button>
            
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg,#c9a96e,#8a6535)",
                }}
              >
                <Sparkles
                  size={16}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-xl text-white tracking-[5px] uppercase font-light">
                  Astha  PMS
                </h1>

                <p className="dm text-[10px] text-zinc-500 tracking-[3px] uppercase">
                  Luxury Salon Software
                </p>
              </div>
            </Link>

            {/* SEARCH */}
          
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            {/* NOTIFICATION */}
            <div className="relative">
              
              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="relative w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/[0.06] transition-all duration-300"
              >
                <Bell
                  size={20}
                  className="text-zinc-300"
                />

                {notifications.length >
                  0 && (
                  <div
                    className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center text-[11px] text-black font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg,#c9a96e,#a07840)",
                    }}
                  >
                    {
                      notifications.length
                    }
                  </div>
                )}
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  className="dropdown-animation absolute right-0 mt-4 w-[420px] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl"
                  style={{
                    background:
                      "rgba(15,15,15,0.96)",
                    backdropFilter:
                      "blur(30px)",
                  }}
                >
                  
                  {/* TOP */}
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    
                    <div>
                      <h2 className="text-xl font-light text-white">
                        Notifications
                      </h2>

                      <p className="dm text-sm text-zinc-500 mt-1">
                        Latest salon updates
                      </p>
                    </div>

                    <div
                      className="px-3 py-1 rounded-full text-xs dm"
                      style={{
                        background:
                          "rgba(201,169,110,0.12)",
                        color: "#c9a96e",
                      }}
                    >
                      {
                        notifications.length
                      }{" "}
                      New
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="max-h-[500px] overflow-y-auto">
                    
                    {notifications.length ===
                    0 ? (
                      <div className="p-10 text-center">
                        
                        <Bell
                          size={40}
                          className="mx-auto text-zinc-700 mb-4"
                        />

                        <h3 className="text-lg text-white font-light">
                          No Notifications
                        </h3>

                        <p className="dm text-zinc-500 text-sm mt-2">
                          Everything looks
                          clean right now.
                        </p>
                      </div>
                    ) : (
                      notifications.map(
                        item => (
                          <div
                            key={item._id}
                            className="p-5 border-b border-white/5 hover:bg-white/[0.03] transition-all duration-300"
                          >
                            
                            <div className="flex gap-4">
                              
                              <img
                                src={
                                  item
                                    ?.customer
                                    ?.profilePic ||
                                  "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                                }
                                alt="customer"
                                className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                              />

                              <div className="flex-1">
                                
                                <div className="flex items-center justify-between">
                                  
                                  <h3 className="text-white font-medium dm">
                                    {
                                      item
                                        ?.customer
                                        ?.name
                                    }
                                  </h3>

                                  <span className="dm text-xs text-zinc-600">
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                <p className="dm text-sm text-zinc-400 leading-6 mt-2">
                                  {
                                    item.message
                                  }
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                  
                                  <span
                                    className="inline-flex px-3 py-1 rounded-full text-xs capitalize dm"
                                    style={{
                                      background:
                                        "rgba(201,169,110,0.12)",
                                      color:
                                        "#c9a96e",
                                    }}
                                  >
                                    {
                                      item.type
                                    }
                                  </span>

                                  <button className="dm text-xs text-zinc-500 hover:text-white transition">
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="p-4 border-t border-white/5">
                    
                    <button className="w-full h-[48px] rounded-2xl text-sm dm text-black font-medium transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background:
                          "linear-gradient(135deg,#c9a96e,#a07840)",
                      }}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* USER */}
            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen((s) => !s)} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-2 hover:bg-white/[0.05] transition-all duration-300">
                
                <img
                  src={
                    user.profilePic ||
                    "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                  }
                  alt="avatar"
                  className="w-12 h-12 rounded-2xl object-cover border border-white/10"
                />

                <div className="hidden md:block">
                  
                  <p className="dm text-sm text-white font-medium">
                    {user.name}
                  </p>

                  <p className="dm text-xs text-zinc-500 capitalize mt-1">
                    {user.role}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className="text-zinc-600"
                />
                </button>

                {profileOpen && (
                  <ProfileDropdown open={profileOpen} onClose={() => setProfileOpen(false)} />
                )}
              </div>
            ) : (
              <div className="dm text-zinc-500 text-sm">
                Guest
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { useNotifications } from "../services/notifiucation/useNotificationQuery";

const Navbar = () => {
  const { user } = useAuth();

  const { data: notifications = [] } =
    useNotifications();

  const [open, setOpen] =
    useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow relative">
      
      {/* LOGO */}
      <div className="text-xl font-bold text-indigo-600">
        Glory's Parlor
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
        
        {/* NOTIFICATION */}
        <div className="relative">
          
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-700" />

            {notifications.length >
              0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {
                  notifications.length
                }
              </span>
            )}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">
                  Notifications
                </h2>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                
                {notifications.length ===
                0 ? (
                  <div className="p-5 text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="p-4 border-b hover:bg-gray-50 transition"
                      >
                        
                        <div className="flex items-start gap-3">
                          
                          <img
                            src={
                              item
                                ?.customer
                                ?.profilePic ||
                              "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                            }
                            alt="customer"
                            className="w-10 h-10 rounded-full object-cover"
                          />

                          <div className="flex-1">
                            
                            <div className="flex items-center justify-between">
                              
                              <h3 className="font-semibold text-sm">
                                {
                                  item
                                    ?.customer
                                    ?.name
                                }
                              </h3>

                              <span className="text-xs text-gray-400">
                                {new Date(
                                  item.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                              {
                                item.message
                              }
                            </p>

                            <div className="mt-2">
                              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full capitalize">
                                {
                                  item.type
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* USER */}
        {user ? (
          <Link
            to="/profile"
            className="flex items-center gap-3"
          >
            <img
              src={
                user.profilePic ||
                "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div className="hidden md:block">
              
              <p className="text-sm font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block text-sm text-gray-600">
            Guest
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
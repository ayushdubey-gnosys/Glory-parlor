import React from "react";

import {
  Mail,
  Phone,
  Star,
  Briefcase,
} from "lucide-react";

const StaffCard = ({ staff, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(staff)}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-zinc-800
        bg-zinc-900
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-zinc-600
        hover:shadow-2xl
        cursor-pointer
      "
    >
      {/* TOP */}

      <div className="flex items-start gap-4">
        
        {/* IMAGE */}

        <div className="relative">
          <img
            src={
              staff?.profilePic ||
              "https://via.placeholder.com/80"
            }
            alt={staff?.name}
            className="
              w-16 h-16
              rounded-2xl
              object-cover
              border border-zinc-700
            "
          />

          {/* STATUS */}

          <div
            className={`
              absolute
              -bottom-1
              -right-1
              w-4 h-4
              rounded-full
              border-2 border-zinc-900
              ${
                staff?.status === "inactive"
                  ? "bg-red-500"
                  : "bg-green-500"
              }
            `}
          />
        </div>

        {/* INFO */}

        <div className="flex-1 min-w-0">
          
          <h2
            className="
              text-lg
              sm:text-xl
              font-bold
              truncate
            "
          >
            {staff?.name}
          </h2>

          <div
            className="
              flex items-center
              gap-2
              text-zinc-400
              text-sm
              mt-1
            "
          >
            <Briefcase size={14} />

            <span className="capitalize">
              {staff?.role || "Staff"}
            </span>
          </div>

          {/* EXPERIENCE */}

          <div
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-zinc-800
              px-3 py-1
              text-xs
              text-zinc-300
            "
          >
            <Star
              size={12}
              fill="currentColor"
            />

            {staff?.experience || 0}+ Years
          </div>
        </div>
      </div>

      {/* CONTACT */}

      <div className="mt-6 space-y-3">
        
        {staff?.email && (
          <div
            className="
              flex items-center
              gap-3
              text-sm
              text-zinc-400
            "
          >
            <Mail size={15} />

            <span className="truncate">
              {staff.email}
            </span>
          </div>
        )}

        {staff?.phone && (
          <div
            className="
              flex items-center
              gap-3
              text-sm
              text-zinc-400
            "
          >
            <Phone size={15} />

            <span>{staff.phone}</span>
          </div>
        )}
      </div>

      {/* BUTTON */}

      <button
        className="
          mt-6
          w-full
          rounded-2xl
          bg-white
          text-black
          py-3
          font-medium
          transition
          hover:bg-zinc-200
        "
      >
        View Details
      </button>
    </div>
  );
};

export default StaffCard;
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
        text-gray-900
        rounded-3xl
        border border-gray-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#D68B2A]/30
        hover:shadow-md
        cursor-pointer
        shadow-sm
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
              border border-gray-100
              shadow-sm
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
              border-2 border-white
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
              font-medium
              truncate
            "
          >
            {staff?.name}
          </h2>

          <div
            className="
              flex items-center
              gap-2
              text-gray-500
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
              bg-[#D68B2A]/10
              px-3 py-1
              text-xs
              text-[#D68B2A]
              font-medium
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
              text-gray-500
            "
          >
            <Mail size={15} />

            <span className="truncate">
             Email : {staff.email}
            </span>
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
          border border-gray-200
          text-gray-700
          py-3
          font-medium
          transition
          hover:bg-gray-50
          shadow-sm
        "
      >
        View Details
      </button>
    </div>
  );
};

export default StaffCard;
import React from "react";
import FormModal from "../Modal/FormModal";

import {
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

const StaffDetailsModal = ({
  staff,
  open,
  onClose,
}) => {
  if (!staff) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title=""
    >
      <div
        className="
          w-full
          bg-zinc-950
          rounded-3xl
          overflow-hidden
          border border-zinc-800
          shadow-2xl
        "
      >
        {/* TOP SECTION */}

        <div
          className="
            px-6 md:px-8
            py-8
            border-b border-zinc-800
          "
        >
          <div
            className="
              flex flex-col md:flex-row
              items-center md:items-center
              gap-6
            "
          >
            {/* IMAGE */}

            <img
              src={
                staff.profilePic ||
                "https://via.placeholder.com/150"
              }
              alt={staff.name}
              className="
                w-28 h-28
                rounded-2xl
                object-cover
                border border-zinc-700
              "
            />

            {/* INFO */}

            <div className="flex-1 text-center md:text-left">
              
              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {staff.name}
              </h2>

              <p
                className="
                  text-zinc-400
                  mt-2
                  capitalize
                "
              >
                {staff.role || "Beauty Specialist"}
              </p>

              <div
                className="
                  flex flex-wrap gap-3
                  mt-5
                  justify-center md:justify-start
                "
              >
                <span
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-zinc-900
                    border border-zinc-800
                    text-zinc-300
                    text-sm
                  "
                >
                  {staff.experience || 0}+ Years Experience
                </span>

                <span
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    ${
                      staff.status === "inactive"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }
                  `}
                >
                  {staff.status || "active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="p-6 md:p-8 space-y-8">

          {/* ABOUT */}

          <div>
            <h3
              className="
                text-xl
                font-semibold
                text-white
                mb-3
              "
            >
              About
            </h3>

            <p
              className="
                text-zinc-400
                leading-7
              "
            >
              {staff.bio ||
                "Experienced beauty professional dedicated to delivering quality salon services and customer satisfaction."}
            </p>
          </div>

          {/* CONTACT */}

          <div
            className="
              grid grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >
            {/* EMAIL */}

            <div
              className="
                bg-zinc-900
                border border-zinc-800
                rounded-2xl
                p-5
              "
            >
              <Mail
                size={20}
                className="text-white mb-3"
              />

              <h4 className="text-white font-medium">
                Email
              </h4>

              <p className="text-zinc-400 text-sm mt-2 break-all">
                {staff.email || "--"}
              </p>
            </div>

            {/* PHONE */}

            <div
              className="
                bg-zinc-900
                border border-zinc-800
                rounded-2xl
                p-5
              "
            >
              <Phone
                size={20}
                className="text-white mb-3"
              />

              <h4 className="text-white font-medium">
                Phone
              </h4>

              <p className="text-zinc-400 text-sm mt-2">
                {staff.phone || "--"}
              </p>
            </div>

            {/* TIMING */}

            <div
              className="
                bg-zinc-900
                border border-zinc-800
                rounded-2xl
                p-5
              "
            >
              <Clock3
                size={20}
                className="text-white mb-3"
              />

              <h4 className="text-white font-medium">
                Timing
              </h4>

              <p className="text-zinc-400 text-sm mt-2">
                {staff.timing || "--"}
              </p>
            </div>
          </div>

          {/* SKILLS */}

          {staff.skills?.length > 0 && (
            <div>
              <h3
                className="
                  text-xl
                  font-semibold
                  text-white
                  mb-4
                "
              >
                Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {staff.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-white
                      text-black
                      text-sm
                      font-medium
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BUTTON */}

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="
                px-6 py-3
                rounded-2xl
                bg-white
                text-black
                font-medium
                hover:bg-zinc-200
                transition
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default StaffDetailsModal;
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
          bg-white
          rounded-3xl
          overflow-hidden
          border border-gray-200
          shadow-xl
        "
      >
        {/* TOP SECTION */}

        <div
          className="
            px-6 md:px-8
            py-8
            border-b border-gray-100
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
                border border-gray-100
                shadow-sm
              "
            />

            {/* INFO */}

            <div className="flex-1 text-center md:text-left">
              
              <h2
                className="
                  text-3xl
                  font-bold
                  text-gray-900
                "
              >
                {staff.name}
              </h2>

              <p
                className="
                  text-gray-500
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
                    bg-gray-50
                    border border-gray-100
                    text-gray-700
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
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-green-50 text-green-600 border border-green-100"
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
                text-gray-900
                mb-3
              "
            >
              About
            </h3>

            <p
              className="
                text-gray-600
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
                bg-gray-50
                border border-gray-100
                rounded-2xl
                p-5
              "
            >
              <Mail
                size={20}
                className="text-[#D68B2A] mb-3"
              />

              <h4 className="text-gray-900 font-medium">
                Email
              </h4>

              <p className="text-gray-500 text-sm mt-2 break-all">
                {staff.email || "--"}
              </p>
            </div>

            {/* PHONE */}

            {/* TIMING */}

            <div
              className="
                bg-gray-50
                border border-gray-100
                rounded-2xl
                p-5
              "
            >
              <Clock3
                size={20}
                className="text-[#D68B2A] mb-3"
              />

              <h4 className="text-gray-900 font-medium">
                Timing
              </h4>

              <p className="text-gray-500 text-sm mt-2">
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
                  text-gray-900
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
                      bg-gray-100
                      text-gray-800
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
                border border-gray-200
                text-gray-700
                font-medium
                hover:bg-gray-50
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
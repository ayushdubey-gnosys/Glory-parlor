import React from "react";
import FormModal from "../Modal/FormModal";

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
      <div className="bg-white rounded-3xl overflow-hidden">
        
        {/* TOP SECTION */}

        <div className="bg-gradient-to-r from-black to-gray-800 p-8 text-white">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            <img
              src={
                staff.profilePic ||
                "https://via.placeholder.com/150"
              }
              alt={staff.name}
              className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">
                {staff.name}
              </h2>

              <p className="text-gray-200 mt-2 capitalize">
                {staff.role || "Staff Member"}
              </p>

              <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
                
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  {staff.experience || 0} Years Experience
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    staff.status ===
                    "inactive"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {staff.status ||
                    "active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="p-8 space-y-6">
          
          {/* ABOUT */}

          <div>
            <h3 className="text-xl font-semibold mb-3">
              About
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {staff.bio ||
                "Experienced beauty professional dedicated to delivering high-quality salon services and customer satisfaction."}
            </p>
          </div>

          {/* CONTACT INFO */}

          <div className="grid grid-cols-1 gap-5">
            
            <div className="bg-gray-50 rounded-2xl p-5 border">
              <h4 className="font-semibold mb-3 text-lg">
                Contact Information
              </h4>

              <div className="space-y-3 text-gray-700">
                
                <p>
                  <span className="font-medium">
                    Email:
                  </span>{" "}
                  {staff.email || "--"}
                </p>

                <p>
                  <span className="font-medium">
                    Phone:
                  </span>{" "}
                  {staff.phone || "--"}
                </p>

                <p>
                  <span className="font-medium">
                    Timing:
                  </span>{" "}
                  {staff.timing || "--"}
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}

          {staff.skills &&
            Array.isArray(
              staff.skills
            ) &&
            staff.skills.length >
              0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {staff.skills.map(
                    (
                      skill,
                      index
                    ) => (
                      <span
                        key={index}
                        className="bg-black text-white px-4 py-2 rounded-full text-sm shadow"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* BUTTON */}

          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300"
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
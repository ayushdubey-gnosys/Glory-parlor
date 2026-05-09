import React from "react";

const StaffCard = ({ staff, onClick }) => {
  return (
    <div
      onClick={(e) => {
        // prevent the click from bubbling to parent elements
        e.stopPropagation();
        onClick && onClick(staff);
      }}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <img
          src={staff.profilePic || "https://via.placeholder.com/48"}
          alt={staff.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-bold text-lg">{staff.name}</div>
          <div className="text-sm text-gray-600">Experience: {staff.experience || "--"} yrs</div>
          <div className={`mt-1 text-sm ${staff.status === "inactive" ? "text-red-600" : "text-green-600"}`}>
            Status: {staff.status || "active"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;

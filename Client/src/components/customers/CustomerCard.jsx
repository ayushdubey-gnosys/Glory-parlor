import React from "react";

const CustomerCard = ({ customer, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(customer)}
      className="bg-white border border-gray-200 p-6 rounded-3xl cursor-pointer hover:border-[#D68B2A]/30 hover:bg-gray-50 hover:shadow-md flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 relative overflow-hidden group shadow-sm"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D68B2A]/5 rounded-full blur-3xl group-hover:bg-[#D68B2A]/10 transition-all duration-500"></div>
      
      <img
        src={customer.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
        alt={customer.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm relative z-10 mb-4"
      />

      <div className="relative z-10 w-full px-2">
        <div className="font-medium text-lg text-gray-900 dm tracking-wide mb-1 truncate">{customer.name}</div>
        <div className="text-sm text-gray-500 dm truncate">
          {customer.email || "-"}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;

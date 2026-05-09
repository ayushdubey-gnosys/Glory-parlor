import React from "react";

const CustomerCard = ({ customer, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(customer)}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md flex items-center gap-4"
    >
      <img
        src={customer.profilePic || "https://via.placeholder.com/80"}
        alt={customer.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="font-semibold text-lg">{customer.name}</div>
        <div className="text-sm text-gray-600">{customer.email || "-"}</div>
      </div>

      <div className="text-sm text-gray-500">{customer.category || "--"}</div>
    </div>
  );
};

export default CustomerCard;

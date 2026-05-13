import React from "react";

const CustomerCard = ({ customer, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(customer)}
      className="bg-zinc-200 border border-zinc-800 p-4 rounded-2xl cursor-pointer hover:shadow-lg flex items-center gap-4"
    >
      <img
        src={customer.profilePic || "https://via.placeholder.com/80"}
        alt={customer.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="font-semibold text-lg text-zinc-900">{customer.name}</div>
        <div className="text-sm text-zinc-800">{customer.email || "-"} • {customer.phone || "-"}</div>
        <div className="text-xs text-zinc-800 mt-1">Status: {customer.status || "active"} • Created: {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : "-"}</div>
      </div>

      <div className="text-sm text-zinc-700">{customer.category || "--"}</div>
    </div>
  );
};

export default CustomerCard;

import React from "react";

const DashboardCard = ({ title, value, children, className = "" }) => {
  return (
    <div className={`bg-white p-4 rounded shadow ${className}`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {children}
    </div>
  );
};

export default DashboardCard;

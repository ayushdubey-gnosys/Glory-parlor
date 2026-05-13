import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-yellow-50  shadow shadow-yellow-800 p-4 rounded-lg">
      <p className="text-sm text-zinc-800 text-zinc-400">{title}</p>
      <p className="text-xl font-semibold text-zinc-700 mt-2">{value}</p>
    </div>
  );
};

export default StatCard;

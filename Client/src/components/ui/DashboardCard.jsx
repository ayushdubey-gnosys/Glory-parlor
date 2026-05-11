import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, description, icon, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-6 text-left w-full flex flex-col gap-3"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-black rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default DashboardCard;

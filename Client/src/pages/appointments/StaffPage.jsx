import React, { useState } from "react";
import { Users } from "lucide-react";

import { useStaff } from "../../services/staff/useStaffQuery";

import StaffCard from "../../components/staff/StaffCard";
import StaffDetailsModal from "../../components/staff/StaffDetailsModal";

const StaffPage = () => {
  const { data: staffList, isLoading } =
    useStaff();

  const [selectedStaff, setSelectedStaff] =
    useState(null);

  const [staffModalOpen, setStaffModalOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc px-4 py-8 sm:px-6 lg:px-10">
      
      {/* HEADER */}

      <div
        className="
          flex flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-10
        "
      >
        <div>
          <div className="flex items-center gap-3 mb-3 text-zinc-400">
            <Users size={18} />

            <span className="uppercase tracking-[3px] text-xs">
              Team Members
            </span>
          </div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
              tracking-tight
            "
          >
            Staff Members
          </h1>
        </div>

        <div
          className="
            
            border-2 border-green-600
            rounded-2xl
           
            px-5 py-4
            w-fit
          "
        >
          <p className="text-2xl  text-zinc-800 font-bold">
            {staffList?.length || 0}
          </p>

          <p className="text-zinc-400 text-sm">
            Active Staff
          </p>
        </div>
      </div>

      {/* LOADING */}

      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <div
            className="
              w-10 h-10
              border-4
              border-white
              border-t-transparent
              rounded-full
              animate-spin
            "
          />
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          {staffList?.map((st) => (
            <StaffCard
              key={st._id}
              staff={st}
              onClick={(s) => {
                setSelectedStaff(s);
                setStaffModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* MODAL */}

      <StaffDetailsModal
        staff={selectedStaff}
        open={staffModalOpen}
        onClose={() => {
          setStaffModalOpen(false);
          setSelectedStaff(null);
        }}
      />
    </div>
  );
};

export default StaffPage;
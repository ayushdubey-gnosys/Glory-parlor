import React, { useState } from 'react';

const LoyaltyPage = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Client Management
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
            Loyalty & VIP Management
          </h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
            Track and reward VIP members with points, tiers, and exclusive privileges.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg opacity-90">Total Points Issued</h3>
          <p className="text-3xl font-bold mt-2">124,500</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg opacity-90">Active VIP Members</h3>
          <p className="text-3xl font-bold mt-2">48</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg opacity-90">Points Redeemed (This Month)</h3>
          <p className="text-3xl font-bold mt-2">12,400</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Customer Wallet Balances</h2>
        {/* Table Placeholder */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Customer Name</th>
              <th className="p-3 border-b">Tier</th>
              <th className="p-3 border-b">Points Balance</th>
              <th className="p-3 border-b">Wallet Balance (₹)</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No loyalty profiles found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoyaltyPage;

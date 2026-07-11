import React, { useState, useEffect } from 'react';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // In a real app, fetch from /api/vendors
    // axios.get('/api/vendors').then(res => setVendors(res.data.data));
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Product Management
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
            Vendor Management
          </h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
            Manage your salon suppliers, GST details, and payment terms seamlessly.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#D68B2A]/20 text-sm font-medium tracking-wide">
          + Add New Vendor
        </button>
      </div>
        {/* Table Placeholder */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Vendor Name</th>
              <th className="p-3 border-b">Contact</th>
              <th className="p-3 border-b">GST</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No vendors found. Add a vendor to get started.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorPage;

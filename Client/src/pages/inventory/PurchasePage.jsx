import React from 'react';

const PurchasePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase & Inventory Intake</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">Record new inventory purchases from vendors.</p>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
            + New Purchase Entry
          </button>
        </div>
        
        {/* Table Placeholder */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Vendor</th>
              <th className="p-3 border-b">Invoice No.</th>
              <th className="p-3 border-b">Total Cost (₹)</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">No purchase records found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasePage;

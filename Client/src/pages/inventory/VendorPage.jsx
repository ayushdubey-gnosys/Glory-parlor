import React, { useState, useEffect } from 'react';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // In a real app, fetch from /api/vendors
    // axios.get('/api/vendors').then(res => setVendors(res.data.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 mb-4">Manage your salon's suppliers, GST details, and payment terms here.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
          + Add New Vendor
        </button>
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

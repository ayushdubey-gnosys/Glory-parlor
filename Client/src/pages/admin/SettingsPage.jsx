import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Branch Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Branch Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parlor Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" defaultValue="Glory Parlor Main" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GST Number</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Notifications & Automation</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded text-blue-600 w-5 h-5" defaultChecked />
              <span>Enable WhatsApp Reminders (Upcoming Appointments)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded text-blue-600 w-5 h-5" defaultChecked />
              <span>Enable Birthday & Anniversary SMS</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded text-blue-600 w-5 h-5" />
              <span>Send PDF Invoices via Email</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;

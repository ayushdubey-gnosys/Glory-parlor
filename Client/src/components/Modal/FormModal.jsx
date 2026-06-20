import React from "react";

const FormModal = ({ title, open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm dm p-4">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D68B2A]/0 via-[#D68B2A]/30 to-[#D68B2A]/0"></div>
        <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-[#D68B2A]/10 rounded-full blur-[80px]"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-2xl font-serif text-gray-900 tracking-wide">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="relative z-10 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default FormModal;

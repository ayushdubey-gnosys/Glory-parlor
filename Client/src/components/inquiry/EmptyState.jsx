import React from "react";

const EmptyState = ({
  title = "Nothing here",
  subtitle = "No items available",
}) => {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
      
      <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-5">
        
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 7H21"
            stroke="#4f46e5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <path
            d="M8 7V17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17V7"
            stroke="#4f46e5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default EmptyState;
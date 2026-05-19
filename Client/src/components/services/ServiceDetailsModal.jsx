import React from "react";
import FormModal from "../Modal/FormModal";
import { useAuth } from "../../context/AuthProvider";

const ServiceDetailsModal = ({ service, open, onClose, onInquiry }) => {
  const { hasRole } = useAuth();

  if (!service) return null;

  return (
    <FormModal open={open} onClose={onClose} title={service.name + " — Details"}>
      <div className="flex gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          <img src={service.image || "https://via.placeholder.com/192"} alt={service.name} className="w-full h-full object-cover rounded" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <div className="text-sm text-gray-600 mt-1">Category: {service.category}</div>
          <div className="text-sm text-gray-600 mt-1">Price: ₹{service.price}</div>
          <div className="text-sm text-gray-600 mt-1">Duration: {service.duration} mins</div>

          <p className="mt-3 text-gray-700">{service.description}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {hasRole("customer") && (
          <button
            onClick={() => {
              onClose();
              if (onInquiry) onInquiry(service);
            }}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
          >
            Inquire Now
          </button>
        )}
        <button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
      </div>
    </FormModal>
  );
};

export default ServiceDetailsModal;

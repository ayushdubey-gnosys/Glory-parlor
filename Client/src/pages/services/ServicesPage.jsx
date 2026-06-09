import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useServices } from "../../services/Services/useServiceQuery";
import { useDeleteService } from "../../services/Services/useServiceMutation";

import { useAuth } from "../../context/AuthProvider";

import ServiceFormModal from "../../components/services/ServiceFormModal";
import ServiceDetailsModal from "../../components/services/ServiceDetailsModal";
import ServiceInquiryModal from "../../components/services/ServiceInquiryModal";

const ServicesPage = () => {
  const { data, isLoading } =
    useServices();

  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteMutation =
    useDeleteService();

  const [openForm, setOpenForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [openDetail, setOpenDetail] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  const [openInquiry, setOpenInquiry] =
    useState(false);

  const [selectedForInquiry, setSelectedForInquiry] =
    useState(null);

  useEffect(() => {
    if (data && user) {
      const serviceId = searchParams.get("serviceId");
      if (serviceId) {
        const srv = data.find(s => s._id === serviceId);
        if (srv) {
          setSelectedForInquiry(srv);
          setOpenInquiry(true);
        }
        // clear search param
        setSearchParams({});
      }
    }
  }, [data, user, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#faf9f5] min-h-screen">
      
      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">
        
        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Premium Offerings
          </p>

          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A]">
            Our Luxury Services
          </h1>

          <p className="max-w-2xl text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
            Indulge in our curated selection of premium beauty treatments. From rejuvenating facials to advanced hair therapies, every service is designed to elevate your style and provide an unparalleled pampering experience.
          </p>
        </div>

        {hasRole([
          "admin",
          "superadmin",
        ]) && (
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-5 py-3 rounded-xl hover:scale-105 transition-all"
          >
            Add Service
          </button>
        )}
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {data?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 flex flex-col h-[520px] max-w-sm mx-auto w-full"
          >
            
            {/* IMAGE */}

            <div className="h-[60%] overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition duration-500">
              <img
                src={
                  service.image ||
                  service.serviceImage ||
                  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
                }
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}

            <div className="p-4 flex-1 flex flex-col">
              
              <div className="flex items-center justify-between">
                
                <h2 className="text-xl font-semibold text-zinc-900 line-clamp-1">
                  {service.name}
                </h2>

                <span className="bg-[#D68B2A]/10 border border-[#D68B2A]/30 text-[#D68B2A] text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                  {service.category}
                </span>
              </div>

              <p className="text-gray-500 mt-2 text-xs leading-5 line-clamp-2">
                {service.description}
              </p>

              {/* PRICE + DURATION */}

              <div className="flex items-center justify-between mt-auto pt-3">
                
                <div>
                  <p className="text-gray-400 text-[10px] uppercase">
                    Price
                  </p>

                  <h3 className="text-lg font-bold">
                    ₹{service.price}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 text-[10px] uppercase">
                    Duration
                  </p>

                  <h3 className="text-sm font-semibold">
                    {service.duration} min
                  </h3>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex gap-2 mt-4">
                
                <button
                  onClick={() => {
                    setSelected(service);
                    setOpenDetail(true);
                  }}
                  className="flex-1 border border-[#D68B2A] text-[#D68B2A] py-2 rounded-xl hover:bg-gradient-to-b hover:from-[#D68B2A] hover:to-[#b57321] hover:text-white transition-all text-sm font-medium"
                >
                  Details
                </button>

                {(!user || hasRole("customer")) && (
                  <button
                    onClick={() => {
                      if (!user) {
                        navigate(`/register?redirect=/services?serviceId=${service._id}`);
                        return;
                      }
                      setSelectedForInquiry(service);
                      setOpenInquiry(true);
                    }}
                    className="flex-1 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white py-2 rounded-xl hover:scale-105 transition-all shadow-md text-sm font-medium"
                  >
                    Inquire
                  </button>
                )}

                {hasRole([
                  "admin",
                  "superadmin",
                ]) && (
                  <button
                    onClick={() => {
                      setEditing(service);
                      setOpenForm(true);
                    }}
                    className="flex-1 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* DELETE */}

              {hasRole(
                "superadmin"
              ) && (
                <button
                  onClick={() =>
                    deleteMutation.mutate(
                      service._id
                    )
                  }
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Delete Service
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}

      <ServiceFormModal
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        initial={editing}
      />

      <ServiceDetailsModal
        service={selected}
        open={openDetail}
        onClose={() =>
          setOpenDetail(false)
        }
        onInquiry={(service) => {
          setSelectedForInquiry(service);
          setOpenInquiry(true);
        }}
      />

      <ServiceInquiryModal
        service={selectedForInquiry}
        open={openInquiry}
        onClose={() =>
          setOpenInquiry(false)
        }
      />
    </div>
  );
};

export default ServicesPage;
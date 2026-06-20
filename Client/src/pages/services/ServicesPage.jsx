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
    <div className="p-4 md:p-6 lg:p-8">
      
      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">
        
        <div>
          <p className="text-[#D68B2A] dm uppercase tracking-[3px] text-[11px] mb-1 font-medium">
            Premium Offerings
          </p>

          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 tracking-wide">
            Our Luxury Services
          </h1>

          <p className="max-w-2xl text-gray-600 mt-4 text-sm md:text-base leading-relaxed dm font-light">
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
            className="bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white px-6 py-2.5 rounded-xl dm text-sm font-medium shadow-lg shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all"
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
            className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#D68B2A]/30 hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex flex-col h-[520px] max-w-sm mx-auto w-full relative shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D68B2A]/5 rounded-full blur-3xl group-hover:bg-[#D68B2A]/10 transition-all duration-500 z-0 pointer-events-none"></div>
            
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
              
              <div className="flex items-center justify-between relative z-10">
                
                <h2 className="text-xl font-serif font-light text-gray-900 tracking-wide line-clamp-1">
                  {service.name}
                </h2>

                <span className="bg-[#D68B2A]/10 border border-[#D68B2A]/20 text-[#D68B2A] text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-widest dm">
                  {service.category}
                </span>
              </div>

              <p className="text-gray-500 mt-3 text-xs leading-5 line-clamp-2 dm font-light relative z-10">
                {service.description}
              </p>

              {/* PRICE + DURATION */}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 relative z-10">
                
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest dm font-medium">
                    Price
                  </p>

                  <h3 className="text-lg font-medium text-gray-900 mt-1">
                    ₹{service.price}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest dm font-medium">
                    Duration
                  </p>

                  <h3 className="text-sm font-medium text-gray-900 mt-1">
                    {service.duration} min
                  </h3>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex gap-2 mt-5 relative z-10">
                
                <button
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all text-xs font-medium dm shadow-sm"
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
                    className="flex-1 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white py-2.5 rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-[#D68B2A]/20 text-xs font-medium dm"
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
                    className="flex-1 bg-[#D68B2A]/10 text-[#D68B2A] py-2.5 rounded-xl hover:bg-[#D68B2A]/20 transition-all text-xs font-medium dm"
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
                  className="w-full mt-3 bg-red-50 text-red-600 py-2.5 rounded-xl hover:bg-red-100 transition-all text-xs font-medium dm relative z-10"
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
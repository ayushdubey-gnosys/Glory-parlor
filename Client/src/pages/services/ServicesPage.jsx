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
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">
        
        <div>
          <h1 className="text-4xl font-bold text-black">
            Salon Services
          </h1>

          <p className="text-gray-500 mt-1">
            Explore all salon services
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
            className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Add Service
          </button>
        )}
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {data?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
          >
            
            {/* IMAGE */}

            <div className="h-52 overflow-hidden">
              <img
                src={
                  service.image ||
                  service.serviceImage ||
                  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
                }
                alt={service.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}

            <div className="p-5">
              
              <div className="flex items-center justify-between">
                
                <h2 className="text-2xl font-bold text-black">
                  {service.name}
                </h2>

                <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>

              <p className="text-gray-500 mt-3 text-sm leading-6 line-clamp-3">
                {service.description}
              </p>

              {/* PRICE + DURATION */}

              <div className="flex items-center justify-between mt-5">
                
                <div>
                  <p className="text-gray-400 text-sm">
                    Price
                  </p>

                  <h3 className="text-xl font-bold">
                    ₹{service.price}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    Duration
                  </p>

                  <h3 className="text-lg font-semibold">
                    {service.duration} min
                  </h3>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 mt-6">
                
                <button
                  onClick={() => {
                    setSelected(service);
                    setOpenDetail(true);
                  }}
                  className="flex-1 border border-black text-black py-2 rounded-xl hover:bg-black hover:text-white transition"
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
                    className="flex-1 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
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
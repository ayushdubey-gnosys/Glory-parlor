import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useService } from "../../services/Services/useServiceQuery";
import { useAuth } from "../../context/AuthProvider";
import { ArrowLeft, Clock, Info, CheckCircle, Tag } from "lucide-react";
import ServiceInquiryModal from "../../components/services/ServiceInquiryModal";
import { useState } from "react";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useService(id);
  const { user, hasRole } = useAuth();
  const [openInquiry, setOpenInquiry] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <div className="animate-pulse text-[#D68B2A] text-lg font-light tracking-wider">
          Loading Luxury Service...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <div className="text-zinc-600 text-lg font-light tracking-wide">
          Service not found
        </div>
      </div>
    );
  }

  // Handle single service object or array wrapping
  const service = Array.isArray(data) ? data[0] : data?.service || data;

  return (
    <div className="min-h-screen bg-[#faf9f5] text-zinc-900 font-sans">
      {/* Header Banner */}
      <div className={`relative w-full overflow-hidden ${service.video ? 'h-[60vh] md:h-[75vh]' : 'h-[50vh] md:h-[60vh]'}`}>
        {service.video ? (
          <video
            src={service.video}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={
              service.image ||
              service.serviceImage ||
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
            }
            alt={service.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-5xl mx-auto pointer-events-none">
          <Link
            to="/services"
            className="w-fit mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-light uppercase tracking-wider pointer-events-auto"
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="bg-[#D68B2A]/20 border border-[#D68B2A]/50 backdrop-blur-md text-white text-[10px] uppercase tracking-[2px] font-semibold px-3 py-1 rounded-full w-fit mb-3">
            {service.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-wide [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
            {service.name}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 mt-2 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D68B2A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <h2 className="text-3xl font-serif text-gray-900 mb-6 relative z-10">About the Service</h2>
            <p className="text-gray-600 leading-relaxed dm font-light relative z-10 text-lg">
              {service.description}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-serif text-gray-900 mb-8">Service Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-sm">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[2px] font-medium dm mb-1">Price</p>
                  <p className="text-2xl font-serif text-gray-900">₹{service.price}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-sm">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[2px] font-medium dm mb-1">Duration</p>
                  <p className="text-2xl font-serif text-gray-900">{service.duration} <span className="text-sm text-gray-500 font-sans">mins</span></p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-[#D68B2A]/5 border border-[#D68B2A]/10">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-sm">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-[#D68B2A]/60 uppercase tracking-[2px] font-medium dm mb-1">Category</p>
                  <p className="text-xl font-serif text-gray-900 capitalize mt-1">{service.category}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 shadow-xl sticky top-8 text-white overflow-hidden relative">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#D68B2A]/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <h3 className="text-2xl font-serif mb-3 relative z-10">Experience Luxury</h3>
            <p className="text-sm text-gray-300 mb-8 dm font-light leading-relaxed relative z-10">
              Transform your look with our premium {service.category} service. Book an appointment today.
            </p>

            <div className="space-y-4 relative z-10">
              {(!user || hasRole("customer")) && (
                <button
                  onClick={() => {
                    if (!user) {
                      navigate(`/register?redirect=/services/${service._id}`);
                      return;
                    }
                    setOpenInquiry(true);
                  }}
                  className="w-full bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white py-4 rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-[#D68B2A]/20 font-medium text-sm dm tracking-wide"
                >
                  Inquire Now
                </button>
              )}

              {user && hasRole("customer") && (
                <Link
                  to={`/appointments/all?action=book&serviceId=${service._id}`}
                  className="w-full flex items-center justify-center border border-white/20 text-white hover:bg-white/10 py-4 rounded-xl transition-all font-medium text-sm dm tracking-wide backdrop-blur-sm"
                >
                  Book Appointment
                </Link>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex items-start gap-3 relative z-10">
              <Info size={18} className="text-[#D68B2A] mt-0.5 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed dm font-light">
                Prices and durations are indicative. A detailed consultation will determine the final plan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ServiceInquiryModal
        service={service}
        open={openInquiry}
        onClose={() => setOpenInquiry(false)}
      />
    </div>
  );
};

export default ServiceDetailPage;

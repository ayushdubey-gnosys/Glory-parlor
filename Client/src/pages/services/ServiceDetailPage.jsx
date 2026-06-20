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
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={
            service.image ||
            service.serviceImage ||
            "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
          }
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-5xl mx-auto">
          <Link
            to="/services"
            className="w-fit mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-light uppercase tracking-wider"
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

      <div className="max-w-5xl mx-auto p-6 md:p-8 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white border border-[#D68B2A]/10 rounded-3xl p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-light text-[#D68B2A] tracking-wide mb-4">About the Service</h2>
            <p className="text-zinc-600 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          <div className="bg-white border border-[#D68B2A]/10 rounded-3xl p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-light text-[#D68B2A] tracking-wide mb-6">Service Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf9f5] border border-[#D68B2A]/5">
                <div className="w-12 h-12 rounded-full bg-[#D68B2A]/10 flex items-center justify-center text-[#D68B2A]">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Price</p>
                  <p className="text-lg font-light text-zinc-900">₹{service.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf9f5] border border-[#D68B2A]/5">
                <div className="w-12 h-12 rounded-full bg-[#D68B2A]/10 flex items-center justify-center text-[#D68B2A]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Duration</p>
                  <p className="text-lg font-light text-zinc-900">{service.duration} mins</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf9f5] border border-[#D68B2A]/5">
                <div className="w-12 h-12 rounded-full bg-[#D68B2A]/10 flex items-center justify-center text-[#D68B2A]">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Category</p>
                  <p className="text-lg font-light text-zinc-900 capitalize">{service.category}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-[#D68B2A]/10 rounded-3xl p-6 shadow-sm sticky top-6">
            <h3 className="text-lg font-light text-zinc-900 mb-2">Interested in this service?</h3>
            <p className="text-sm text-zinc-500 mb-6 font-light">Book an appointment or submit an inquiry to learn more.</p>

            <div className="space-y-3">
              {(!user || hasRole("customer")) && (
                <button
                  onClick={() => {
                    if (!user) {
                      navigate(`/register?redirect=/services/${service._id}`);
                      return;
                    }
                    setOpenInquiry(true);
                  }}
                  className="w-full bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white py-3.5 rounded-xl hover:scale-[1.02] transition-all shadow-md font-medium text-sm"
                >
                  Inquire Now
                </button>
              )}

              {user && hasRole("customer") && (
                <Link
                  to="/appointments/book"
                  className="w-full flex items-center justify-center border border-[#D68B2A] text-[#D68B2A] hover:bg-[#D68B2A]/5 py-3.5 rounded-xl transition-all font-medium text-sm"
                >
                  Book Appointment
                </Link>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-zinc-100 flex items-start gap-3">
              <Info size={16} className="text-zinc-400 mt-0.5 shrink-0" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Prices and durations are indicative and may vary based on your specific requirements and consultations.
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

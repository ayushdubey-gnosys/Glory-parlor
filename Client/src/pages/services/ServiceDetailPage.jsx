import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useService } from "../../services/Services/useServiceQuery";
import { useAuth } from "../../context/AuthProvider";
import {
  ArrowLeft,
  Clock,
  Info,
  CheckCircle,
  Tag,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  Star,
  Calendar,
  Settings,
} from "lucide-react";
import ServiceInquiryModal from "../../components/services/ServiceInquiryModal";

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
    <div className="min-h-screen bg-[#faf9f5] text-zinc-900 font-sans pb-20">
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
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto pointer-events-none">
          <Link
            to="/services"
            className="w-fit mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium uppercase tracking-widest pointer-events-auto bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="bg-[#D68B2A] text-white text-[10px] uppercase tracking-[2px] font-bold px-3.5 py-1.5 rounded-full w-fit mb-3 shadow-md">
            {service.category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide [text-shadow:0_2px_15px_rgba(0,0,0,0.4)]">
            {service.name}
          </h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Service Overview & Specifications (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#D68B2A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <h2 className="text-2xl sm:text-3xl font-serif font-light text-gray-900 mb-4 relative z-10">
              About the Service
            </h2>
            <p className="text-gray-600 leading-relaxed font-light text-base sm:text-lg mb-8 relative z-10">
              {service.description || "Indulge in our curated salon therapy designed to enhance your natural elegance and leave you feeling completely refreshed and revitalized."}
            </p>

            <div className="border-t border-gray-100 my-8"></div>

            <h3 className="text-xs font-semibold uppercase tracking-[3px] text-[#D68B2A] mb-5 relative z-10 flex items-center gap-2">
              <Sparkles size={14} /> Service Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
              <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#faf9f5] border border-[#D68B2A]/20 hover:border-[#D68B2A]/50 transition-all shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-[2px] font-bold">Price Fee</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-xs border border-gray-100">
                    <IndianRupee size={15} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold text-gray-900">₹{service.price}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Inclusive of salon taxes</p>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#faf9f5] border border-gray-200/80 hover:border-[#D68B2A]/40 transition-all shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-[2px] font-bold">Session Time</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-xs border border-gray-100">
                    <Clock size={15} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold text-gray-900">{service.duration} <span className="text-sm font-sans font-normal text-gray-500">mins</span></p>
                  <p className="text-[11px] text-gray-500 mt-1">Estimated duration</p>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#faf9f5] border border-gray-200/80 hover:border-[#D68B2A]/40 transition-all shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-[#D68B2A] uppercase tracking-[2px] font-bold">Category</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D68B2A] shadow-xs border border-gray-100">
                    <Tag size={15} />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-serif font-semibold text-gray-900 capitalize">{service.category}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Luxury salon tier</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-8"></div>

            <h3 className="text-xs font-semibold uppercase tracking-[3px] text-[#D68B2A] mb-5 relative z-10 flex items-center gap-2">
              <ShieldCheck size={14} /> The Luxury Salon Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                "Done by Certified Specialists & Stylists",
                "Deep nourishment with instant visible results",
                "100% Premium imported salon formulations",
                "Personalized pre-treatment hair consultation"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100/80">
                  <CheckCircle size={16} className="text-[#D68B2A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reservation & Action Console (4 Cols) */}
        <div className="lg:col-span-4 sticky top-8 space-y-6">
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#D68B2A]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D68B2A]/10 text-[#D68B2A] border border-[#D68B2A]/20 mb-4">
              <Star size={12} className="fill-[#D68B2A]" /> Premium Reservation
            </div>

            <h3 className="text-2xl font-serif font-light text-gray-900 mb-2">
              Reserve Your Session
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 font-light">
              Experience the finest in luxury grooming. Secure your appointment with our senior salon therapists.
            </p>

            <div className="bg-[#faf9f5] rounded-2xl p-4 border border-gray-200/70 mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Investment</p>
                <p className="text-2xl font-serif font-bold text-[#D68B2A] mt-0.5">₹{service.price}</p>
              </div>
              <div className="text-right border-l border-gray-200/60 pl-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Time Req.</p>
                <p className="text-sm font-semibold text-gray-800 mt-1 flex items-center gap-1 justify-end">
                  <Clock size={13} className="text-[#D68B2A]" /> {service.duration} min
                </p>
              </div>
            </div>

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
                  className="w-full bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#D68B2A]/25 font-semibold text-xs uppercase tracking-[1.5px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} /> Inquire About Treatment
                </button>
              )}

              {user && hasRole("customer") && (
                <Link
                  to={`/appointments/all?action=book&serviceId=${service._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 py-3.5 rounded-xl transition-all font-semibold text-xs uppercase tracking-[1.5px] shadow-md"
                >
                  <Calendar size={16} className="text-[#D68B2A]" /> Book Appointment Now
                </Link>
              )}

              {hasRole(["admin", "superadmin", "staff"]) && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-[#D68B2A]/30 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D68B2A] uppercase tracking-wider">
                    <Settings size={14} /> Admin & Staff Portal
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    You are viewing this service card as an administrator or salon staff member.
                  </p>
                  <Link
                    to="/services"
                    className="w-full flex items-center justify-center gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800 py-2.5 rounded-xl transition font-medium text-xs shadow-sm"
                  >
                    Manage All Services
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                <span>Instant confirmation & schedule sync</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                <span>Certified hygienic salon standards</span>
              </div>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-2.5 text-[11px] text-gray-500 leading-relaxed">
              <Info size={16} className="text-[#D68B2A] shrink-0 mt-0.5" />
              <span>Prices and session durations are indicative. A detailed pre-service consultation will finalize your exact salon requirements.</span>
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

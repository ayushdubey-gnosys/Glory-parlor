import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import InquiryForm from "../../components/inquiry/InquiryForm";
import { useServices } from "../../services/Services/useServiceQuery";
import { useCourses } from "../../services/academy/useAuthQuery";
import { useProducts } from "../../services/inventory/useInventoryQuery";
import { useCreateInquiry } from "../../services/inquiries/useInquiryMutation";
import bgVideo from "../../assets/inquery.mp4";

const CreateInquiryPage = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const prefilledData = location.state || {};

  const { data: servicesData } = useServices();
  const services = Array.isArray(servicesData) ? servicesData : servicesData?.services || [];

  const { data: coursesData } = useCourses();
  const courses = Array.isArray(coursesData) ? coursesData : coursesData?.courses || [];

  const { data: productsData } = useProducts();
  const products = Array.isArray(productsData) ? productsData : productsData || [];

  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const handleCreate = (form) => {
    createInquiry(form, {
      onSuccess: () => {
        toast.success("Inquiry created");
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to create inquiry");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf9f5] font-sans">
      
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-lg mx-auto w-full">
          <div className="mb-8 text-center md:text-left">
            <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
              Support
            </p>
            <h1 className="text-4xl font-light text-[#D68B2A] tracking-wide">Create Inquiry</h1>
            <p className="text-gray-500 mt-2 text-sm">Add a new customer inquiry and our experts will reach out to you.</p>
          </div>

          <div className="bg-white border border-[#D68B2A]/10 rounded-2xl p-6 md:p-8 shadow-sm">
            <InquiryForm
              services={services}
              courses={courses}
              products={products}
              onSubmit={handleCreate}
              loading={isPending}
              prefilledData={prefilledData}
            />
          </div>
        </div>
      </div>

      {/* Right Side: Video */}
      <div className="relative w-full md:w-1/2 hidden md:block min-h-[40vh] md:min-h-screen overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability and premium look */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        
        {/* Decorative elements over video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-10 pointer-events-none">
          <h2 className="text-3xl lg:text-5xl font-light text-white tracking-wide mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
            Experience Premium Beauty
          </h2>
          <p className="text-white/90 text-sm lg:text-base max-w-md font-light tracking-wide leading-relaxed">
            Our experts are here to assist you with personalized recommendations and top-tier support for all your luxury salon needs.
          </p>
        </div>
      </div>

    </div>
  );
};

export default CreateInquiryPage;
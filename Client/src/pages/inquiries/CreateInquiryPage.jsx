import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import InquiryForm from "../../components/inquiry/InquiryForm";
import { useServices } from "../../services/Services/useServiceQuery";
import { useCreateInquiry } from "../../services/inquiries/useInquiryMutation";

const CreateInquiryPage = () => {
  const queryClient = useQueryClient();

  const { data: servicesData } = useServices();
  const services = Array.isArray(servicesData) ? servicesData : servicesData?.services || [];

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
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <div className="max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900">Create Inquiry</h1>
          <p className="text-sm text-zinc-500 mt-2">Add a new customer inquiry</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow">
          <InquiryForm services={services} onSubmit={handleCreate} loading={isPending} />
        </div>
      </div>
    </div>
  );
};

export default CreateInquiryPage;
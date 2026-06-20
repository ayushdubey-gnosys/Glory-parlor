import React, {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import FormModal from "../Modal/FormModal";

import {
  useCreateService,
  useUpdateService,
} from "../../services/Services/useServiceMutation";

const ServiceFormModal = ({
  open,
  onClose,
  initial = null,
}) => {
  const createMutation =
    useCreateService();

  const updateMutation =
    useUpdateService();

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      image: null,
    });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        category:
          initial.category || "",
        price: initial.price || "",
        duration:
          initial.duration || "",
        description:
          initial.description || "",
        image: null,
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: "",
        image: null,
      });
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    if (files) {
      return setForm((s) => ({
        ...s,
        [name]: files[0],
      }));
    }

    setForm((s) => ({
      ...s,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append(
      "category",
      form.category
    );
    fd.append(
      "price",
      form.price
    );
    fd.append(
      "duration",
      form.duration
    );
    fd.append(
      "description",
      form.description
    );

    if (form.image) {
      fd.append(
        "image",
        form.image
      );
    }

    try {
      if (
        initial &&
        initial._id
      ) {
        await updateMutation.mutateAsync(
          {
            id: initial._id,
            data: fd,
          }
        );

        toast.success(
          "Service updated"
        );
      } else {
        await createMutation.mutateAsync(
          fd
        );

        toast.success(
          "Service created"
        );
      }

      onClose();
    } catch (err) {
      console.error(
        "ServiceForm error:",
        err
      );

      const message =
        err?.response?.data
          ?.error ||
        err?.response?.data
          ?.message ||
        err.message ||
        "Failed to save service";

      toast.error(message);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={
        initial
          ? "Edit Service"
          : "Add Service"
      }
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        {/* SERVICE NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Service name"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
        />

        {/* CATEGORY SELECT */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
        >
          <option value="">
            Select Category
          </option>

          <option value="premium">
            Premium
          </option>

          <option value="middle">
            Middle
          </option>

          <option value="economy">
            Economy
          </option>

          <option value="other">
            Other
          </option>
        </select>

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
        />

        {/* DURATION */}
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          type="number"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm"
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D68B2A]/50 focus:border-[#D68B2A] text-gray-900 transition-all dm text-sm shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-[#D68B2A]/10 file:text-[#D68B2A] hover:file:bg-[#D68B2A]/20"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium dm shadow-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white shadow-lg shadow-[#D68B2A]/20 hover:scale-[1.02] transition-all text-sm font-medium dm"
          >
            {initial
              ? "Update Service"
              : "Create Service"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default ServiceFormModal;
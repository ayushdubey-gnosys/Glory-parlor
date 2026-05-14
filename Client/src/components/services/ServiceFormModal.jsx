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
          className="border p-2 rounded"
        />

        {/* CATEGORY SELECT */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        />

        {/* DURATION */}
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          type="number"
          className="border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            {initial
              ? "Update"
              : "Create"}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default ServiceFormModal;
// ProductFormModal.jsx

import React, {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import FormModal from "../Modal/FormModal";

import {
  useAddProduct,
  useUpdateProduct,
} from "../../services/inventory/useInventoryMutation";

const ProductFormModal = ({
  open,
  onClose,
  initial = null,
}) => {
  const addMutation =
    useAddProduct();

  const updateMutation =
    useUpdateProduct();

  const [form, setForm] =
    useState({
      name: "",
      brand: "",
      costPrice: "",
      sellingPrice: "",
      stock: "",
      type: "",
      expiryDate: "",
      image: null,
    });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        brand:
          initial.brand || "",
        costPrice:
          initial.costPrice ||
          "",
        sellingPrice:
          initial.sellingPrice ||
          "",
        stock:
          initial.stock || "",
        type:
          initial.type || "",
        expiryDate:
          initial.expiryDate
            ? initial.expiryDate.split(
                "T"
              )[0]
            : "",
        image: null,
      });
    } else {
      setForm({
        name: "",
        brand: "",
        costPrice: "",
        sellingPrice: "",
        stock: "",
        type: "",
        expiryDate: "",
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
      setForm((s) => ({
        ...s,
        [name]: files[0],
      }));

      return;
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

    try {
      const fd =
        new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          if (
            value !== "" &&
            value !== null
          ) {
            fd.append(
              key,
              value
            );
          }
        }
      );

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
          "Product updated"
        );
      } else {
        await addMutation.mutateAsync(
          fd
        );

        toast.success(
          "Product created"
        );
      }

      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data
          ?.message ||
          "Failed to save product"
      );
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={
        initial
          ? "Edit Product"
          : "Add Product"
      }
    >
      <div
        className="
          w-full
          max-w-2xl
          mx-auto
        "
      >
        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >
          {/* NAME */}

          <input
            name="name"
            value={form.name}
            onChange={
              handleChange
            }
            placeholder="Product Name"
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* BRAND */}

          <input
            name="brand"
            value={form.brand}
            onChange={
              handleChange
            }
            placeholder="Brand"
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* COST */}

          <input
            name="costPrice"
            value={
              form.costPrice
            }
            onChange={
              handleChange
            }
            placeholder="Cost Price"
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* SELLING */}

          <input
            name="sellingPrice"
            value={
              form.sellingPrice
            }
            onChange={
              handleChange
            }
            placeholder="Selling Price"
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* STOCK */}

          <input
            name="stock"
            value={form.stock}
            onChange={
              handleChange
            }
            placeholder="Stock"
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* TYPE */}

          <select
            name="type"
            value={form.type}
            onChange={
              handleChange
            }
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          >
            <option value="">
              Select Type
            </option>

            <option value="salon-use">
              Salon Use
            </option>

            <option value="sale-only">
              Sale Only
            </option>

            <option value="dual-use">
              Dual Use
            </option>
          </select>

          {/* DATE */}

          <input
            type="date"
            name="expiryDate"
            value={
              form.expiryDate
            }
            onChange={
              handleChange
            }
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* FILE */}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={
              handleChange
            }
            className="
              bg-white
              border border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              text-gray-900
              transition-all
              shadow-sm
            "
          />

          {/* BUTTONS */}

          <div
            className="
              md:col-span-2
              flex
              gap-3
              mt-4
              pt-4
              border-t
              border-gray-100
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                text-gray-700
                text-sm
                font-medium
                border border-gray-200
                bg-white
                py-3
                rounded-xl
                hover:bg-gray-50
                transition-all
                shadow-sm
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                addMutation.isPending ||
                updateMutation.isPending
              }
              className="
                flex-1
                bg-gradient-to-b from-[#D68B2A] to-[#b57321]
                text-white
                py-3
                rounded-xl
                text-sm
                font-medium
                shadow-lg
                shadow-[#D68B2A]/20
                hover:scale-[1.02]
                disabled:opacity-70
                transition-all
              "
            >
              {initial
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </FormModal>
  );
};

export default ProductFormModal;
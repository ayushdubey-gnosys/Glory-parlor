import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../Modal/FormModal";
import { useAddProduct, useUpdateProduct } from "../../services/inventory/useInventoryMutation";

const ProductFormModal = ({ open, onClose, initial = null }) => {
  const addMutation = useAddProduct();
  const updateMutation = useUpdateProduct();

  const [form, setForm] = useState({
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
        brand: initial.brand || "",
        costPrice: initial.costPrice || "",
        sellingPrice: initial.sellingPrice || "",
        stock: initial.stock || "",
        type: initial.type || "",
        expiryDate: initial.expiryDate ? initial.expiryDate.split("T")[0] : "",
        image: null,
      });
    } else {
      setForm({ name: "", brand: "", costPrice: "", sellingPrice: "", stock: "", type: "", expiryDate: "", image: null });
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) return setForm((s) => ({ ...s, [name]: files[0] }));
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("brand", form.brand);
    fd.append("costPrice", form.costPrice);
    fd.append("sellingPrice", form.sellingPrice);
    fd.append("stock", form.stock);
    fd.append("type", form.type);
    if (form.expiryDate) fd.append("expiryDate", form.expiryDate);
    if (form.image) fd.append("image", form.image);

    try {
      if (initial && initial._id) {
        await updateMutation.mutateAsync({ id: initial._id, data: fd });
        toast.success("Product updated");
      } else {
        await addMutation.mutateAsync(fd);
        toast.success("Product created");
      }

      onClose();
    } catch (err) {
      console.error("ProductForm error:", err);
      const message = err?.response?.data?.error || err?.response?.data?.message || err.message || "Failed to save product";
      toast.error(message);
    }
  };

  return (
    <FormModal open={open} onClose={onClose} title={initial ? "Edit Product" : "Add Product"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" className="border p-2 rounded" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border p-2 rounded" />
        <input name="costPrice" value={form.costPrice} onChange={handleChange} placeholder="Cost price" className="border p-2 rounded" />
        <input name="sellingPrice" value={form.sellingPrice} onChange={handleChange} placeholder="Selling price" className="border p-2 rounded" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select type</option>
          <option value="salon-use">Salon Use</option>
          <option value="sale-only">Sale Only</option>
          <option value="dual-use">Dual Use</option>
        </select>
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">{initial ? "Update" : "Create"}</button>
        </div>
      </form>
    </FormModal>
  );
};

export default ProductFormModal;

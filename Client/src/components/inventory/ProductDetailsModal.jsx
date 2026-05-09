import React from "react";
import FormModal from "../Modal/FormModal";

const ProductDetailsModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <FormModal open={open} onClose={onClose} title={product.name + " — Details"}>
      <div className="flex gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          <img src={product.image || "https://via.placeholder.com/192"} alt={product.name} className="w-full h-full object-cover rounded" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <div className="text-sm text-gray-600 mt-1">Brand: {product.brand}</div>
          <div className="text-sm text-gray-600 mt-1">Price: ₹{product.sellingPrice}</div>
          <div className="text-sm text-gray-600 mt-1">Stock: {product.stock}</div>
          <div className="text-sm text-gray-600 mt-1">Type: {product.type}</div>

          {product.expiryDate && <p className="mt-3 text-gray-700">Expiry: {new Date(product.expiryDate).toLocaleDateString()}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
      </div>
    </FormModal>
  );
};

export default ProductDetailsModal;

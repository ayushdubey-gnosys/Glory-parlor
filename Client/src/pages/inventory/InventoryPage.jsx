import React, { useState } from "react";
import { useProducts } from "../../services/inventory/useInventoryQuery";
import { useAuth } from "../../context/AuthProvider";
import ProductFormModal from "../../components/inventory/ProductFormModal";
import ProductDetailsModal from "../../components/inventory/ProductDetailsModal";
import { useDeleteProduct } from "../../services/inventory/useInventoryMutation";

const InventoryPage = () => {
  const { data, isLoading } = useProducts();
  const { hasRole } = useAuth();
  const deleteMutation = useDeleteProduct();

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selected, setSelected] = useState(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        {hasRole(["admin", "superadmin"]) ? (
          <button onClick={() => { setEditing(null); setOpenForm(true); }} className="bg-black text-white px-5 py-2 rounded-lg">Add Product</button>
        ) : null}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Product
              </th>

              <th className="text-left p-4">
                Brand
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Stock
              </th>

              <th className="text-left p-4">
                Status
              </th>
              {hasRole(["admin", "superadmin"]) && <th className="text-left p-4">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data?.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image || "https://via.placeholder.com/48"} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <button onClick={() => { setSelected(product); setOpenDetail(true); }} className="text-sm text-blue-600 underline">View</button>
                    </div>
                  </div>
                </td>

                <td className="p-4">{product.brand}</td>

                <td className="p-4">₹{product.sellingPrice}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  {product.stock < 5 ? (<span className="text-red-500 font-semibold">Low Stock</span>) : (<span className="text-green-600 font-semibold">In Stock</span>)}
                </td>
                {hasRole(["admin", "superadmin"]) && (
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(product); setOpenForm(true); }} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                      {hasRole("superadmin") && (
                        <button onClick={() => deleteMutation.mutate(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal open={openForm} onClose={() => setOpenForm(false)} initial={editing} />
      <ProductDetailsModal product={selected} open={openDetail} onClose={() => setOpenDetail(false)} />
    </div>
  );
};

export default InventoryPage;
import React from "react";

import {
  useProducts,
} from "../../services/inventory/useInventoryQuery";

const InventoryPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          Add Product
        </button>
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
            </tr>
          </thead>

          <tbody>
            {data?.map((product) => (
              <tr
                key={product._id}
                className="border-t"
              >
                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.brand}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  {product.stock < 5 ? (
                    <span className="text-red-500 font-semibold">
                      Low Stock
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      In Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
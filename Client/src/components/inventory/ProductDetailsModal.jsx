// ProductDetailsModal.jsx

import React from "react";
import FormModal from "../Modal/FormModal";

const ProductDetailsModal = ({
  product,
  open,
  onClose,
}) => {
  if (!product) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Product Details"
    >
      <div
        className="
          w-full
          max-w-3xl
          mx-auto
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
            items-center
          "
        >
          {/* IMAGE */}

          <div
            className="
              bg-zinc-900
              rounded-3xl
              p-5
              border border-zinc-800
            "
          >
            <img
              src={
                product.image ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="
                w-full
                h-72
                object-cover
                rounded-2xl
              "
            />
          </div>

          {/* CONTENT */}

          <div>
            <div
              className="
                flex
                items-center
                justify-between
                mb-6
              "
            >
              <div>
                <h2
                  className="
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  {product.name}
                </h2>

                <p
                  className="
                    text-zinc-400
                    mt-2
                  "
                >
                  {product.brand}
                </p>
              </div>

              <div
                className="
                  bg-yellow-500
                  text-black
                  px-4
                  py-2
                  rounded-2xl
                  font-bold
                "
              >
                ₹
                {
                  product.sellingPrice
                }
              </div>
            </div>

            {/* INFO */}

            <div className="space-y-4">
              
              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  px-4
                  py-3
                "
              >
                <span className="text-zinc-400">
                  Cost Price
                </span>

                <span className="font-semibold">
                  ₹
                  {
                    product.costPrice
                  }
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  px-4
                  py-3
                "
              >
                <span className="text-zinc-400">
                  Stock
                </span>

                <span
                  className={`
                    font-semibold
                    ${
                      product.stock <
                      5
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  `}
                >
                  {product.stock}
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  px-4
                  py-3
                "
              >
                <span className="text-zinc-400">
                  Product Type
                </span>

                <span className="capitalize">
                  {product.type}
                </span>
              </div>

              {product.expiryDate && (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    bg-zinc-900
                    border border-zinc-800
                    rounded-2xl
                    px-4
                    py-3
                  "
                >
                  <span className="text-zinc-400">
                    Expiry Date
                  </span>

                  <span>
                    {new Date(
                      product.expiryDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* BUTTON */}

            <button
              onClick={onClose}
              className="
                w-full
                mt-8
                bg-white
                text-black
                py-3
                rounded-2xl
                font-semibold
                hover:bg-zinc-200
                transition
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default ProductDetailsModal;
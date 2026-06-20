import React, { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
} from "lucide-react";

import { useProducts } from "../../services/inventory/useInventoryQuery";

import { useAuth } from "../../context/AuthProvider";

import ProductFormModal from "../../components/inventory/ProductFormModal";

import ProductDetailsModal from "../../components/inventory/ProductDetailsModal";

import { useDeleteProduct } from "../../services/inventory/useInventoryMutation";

const InventoryPage = () => {
  const { data, isLoading } =
    useProducts();

  const { hasRole } =
    useAuth();

  const deleteMutation =
    useDeleteProduct();

  const [openForm, setOpenForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [openDetail, setOpenDetail] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  // SEARCH

  const [search, setSearch] =
    useState("");

  // PAGINATION

  const [page, setPage] =
    useState(1);

  const limit = 6;

  // FILTER PRODUCTS

  const filteredProducts =
    data?.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    ) || [];

  // PAGINATION

  const totalPages = Math.ceil(
    filteredProducts.length /
      limit
  );

  const paginatedProducts =
    filteredProducts.slice(
      (page - 1) * limit,
      page * limit
    );

  if (isLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#faf9f5]
          text-gray-900
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
        p-4 md:p-6 lg:p-8
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >
        <div>
          <p
            className="
              dm
              text-[11px]
              uppercase
              tracking-[3px]
              text-[#c9a96e]
              mb-1
            "
          >
            Product Management
          </p>

          <h1
            className="
              text-3xl
              lg:text-4xl
              font-serif
              text-gray-900
              tracking-wide
            "
          >
            Inventory
          </h1>
        </div>

        {hasRole([
          "admin",
          "superadmin",
        ]) && (
          <button
            onClick={() => {
              setEditing(null);

              setOpenForm(true);
            }}
            className="
              flex
              items-center
              gap-2
              bg-gradient-to-b from-yellow-500/80 to-yellow-800
              text-white
              px-6
              py-2.5
              rounded-xl
              text-sm
              font-light
              dm
              shadow-lg
              shadow-yellow-500/20
              hover:scale-[1.02]
              transition-all
            "
          >
            <Plus size={18} />

            Add Product
          </button>
        )}
      </div>

      {/* SEARCH BAR */}

      <div className="mb-8">
        <div
          className="
            relative
            w-full
            md:w-96
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setPage(1);
            }}
            className="
              w-full
              bg-white
              border border-gray-200
              rounded-xl
              pl-12
              pr-4
              py-2.5
              text-sm
              dm
              text-gray-900
              outline-none
              focus:ring-2
              focus:ring-[#D68B2A]/50
              focus:border-[#D68B2A]
              transition-all
              shadow-sm
            "
          />
        </div>
      </div>

      {/* PRODUCT GRID */}

      {paginatedProducts.length ===
      0 ? (
        <div
          className="
            border border-gray-200
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-serif
              text-gray-900
            "
          >
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3 dm">
            Try another search.
          </p>
        </div>
      ) : (
        <>
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >
            {paginatedProducts.map(
              (product) => (
                <div
                  key={product._id}
                  className="
                    group
                    relative
                    rounded-3xl
                    border border-gray-200
                    bg-white
                    overflow-hidden
                    transition-all
                    text-gray-900
                    duration-300
                    hover:border-[#D68B2A]/30
                    hover:bg-gray-50
                    hover:shadow-md
                    hover:-translate-y-1
                    shadow-sm
                  "
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D68B2A]/5 rounded-full blur-3xl group-hover:bg-[#D68B2A]/10 transition-all duration-500 z-0"></div>
                  {/* IMAGE */}

                  <div className="relative">
                    
                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={
                        product.name
                      }
                      className="
                        w-full
                        h-40
                        object-cover
                      "
                    />

                    {/* STOCK */}

                    <div
                      className={`
                        absolute
                        top-3
                        right-3
                        px-2 py-1
                        rounded-full
                        text-[10px]
                        font-medium
                        ${
                          product.stock <
                          5
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }
                      `}
                    >
                      {product.stock <
                      5
                        ? "Low"
                        : "Stock"}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    
                    <div
                      className="
                        flex
                        flex-col
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <div>
                        <h2
                          className="
                            text-lg
                            font-serif
                            font-light
                            tracking-wide
                            truncate
                          "
                        >
                          {
                            product.name
                          }
                        </h2>

                        <p
                          className="
                            text-zinc-500
                            dm
                            text-xs
                            mt-1
                          "
                        >
                          {
                            product.brand
                          }
                        </p>
                      </div>

                      <div
                        className="
                          bg-[#D68B2A]/10
                          px-2 py-1
                          rounded-md
                          text-xs
                          font-medium
                          text-[#D68B2A]
                          dm
                        "
                      >
                        ₹
                        {
                          product.sellingPrice
                        }
                      </div>
                      
                    </div>

                    {/* DETAILS */}

                    <div
                      className="
                        mt-4
                        space-y-2
                        text-sm
                      "
                    >
                      <div
                        className="
                          flex
                          justify-between
                        "
                      >
                        <span className="text-zinc-500">
                          Stock
                        </span>

                        <span>
                          {
                            product.stock
                          }
                        </span>
                      </div>

                      <div
                        className="
                          flex
                          justify-between
                        "
                      >
                        <span className="text-zinc-500">
                          Type
                        </span>

                        <span className="capitalize">
                          {
                            product.type
                          }
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        flex
                        gap-2
                        mt-5
                      "
                    >
                      <button
                        onClick={() => {
                          setSelected(
                            product
                          );

                          setOpenDetail(
                            true
                          );
                        }}
                        className="
                          flex-1
                          flex
                          items-center
                          justify-center
                          gap-2
                          bg-white
                          border border-gray-200
                          py-2
                          rounded-xl
                          text-xs
                          font-medium
                          text-gray-700
                          dm
                          hover:bg-gray-50
                          transition-all
                          shadow-sm
                        "
                      >
                        <Eye
                          size={15}
                        />

                        View
                      </button>

                      {hasRole([
                        "admin",
                        "superadmin",
                      ]) && (
                        <button
                          onClick={() => {
                            setEditing(
                              product
                            );

                            setOpenForm(
                              true
                            );
                          }}
                          className="
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-[#D68B2A]/10
                            text-[#D68B2A]
                            py-2
                            rounded-xl
                            text-xs
                            font-medium
                            dm
                            hover:bg-[#D68B2A]/20
                            transition-all
                          "
                        >
                          <Pencil
                            size={15}
                          />

                          Edit
                        </button>
                      )}

                      {hasRole(
                        "superadmin"
                      ) && (
                        <button
                          onClick={() =>
                            deleteMutation.mutate(
                              product._id
                            )
                          }
                          className="
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-red-50
                            text-red-600
                            py-2
                            rounded-xl
                            text-xs
                            font-medium
                            dm
                            hover:bg-red-100
                            transition-all
                          "
                        >
                          <Trash2
                            size={15}
                          />

                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* PAGINATION */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-10
            "
          >
            <button
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (p) => p - 1
                )
              }
              className="
                px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium dm shadow-sm
              "
            >
              Prev
            </button>

            <div
              className="
                text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 dm shadow-sm
              "
            >
              Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{totalPages || 1}</span>
            </div>

            <button
              disabled={
                page ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setPage(
                  (p) => p + 1
                )
              }
              className="
                px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-sm font-medium dm shadow-sm
              "
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* MODALS */}

      <ProductFormModal
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        initial={editing}
      />

      <ProductDetailsModal
        product={selected}
        open={openDetail}
        onClose={() =>
          setOpenDetail(false)
        }
      />
    </div>
  );
};

export default InventoryPage;
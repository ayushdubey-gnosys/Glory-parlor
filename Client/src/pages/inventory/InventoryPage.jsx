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
          bg-black
          text-white
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
        min-h-screen
        bg-black
        text-white
        p-5
        md:p-8
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
              text-zinc-500
              uppercase
              tracking-[3px]
              text-xs
              mb-3
            "
          >
            Product Management
          </p>

          <h1
            className="
              text-4xl
              font-bold
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
              bg-white
              text-black
              px-5
              py-3
              rounded-2xl
              font-semibold
              hover:bg-zinc-200
              transition
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
              bg-zinc-900
              border border-zinc-800
              rounded-2xl
              pl-12
              pr-4
              py-3
              outline-none
              focus:border-zinc-600
              transition
            "
          />
        </div>
      </div>

      {/* PRODUCT GRID */}

      {paginatedProducts.length ===
      0 ? (
        <div
          className="
            border border-zinc-800
            bg-zinc-900
            rounded-3xl
            p-10
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            No Products Found
          </h2>

          <p className="text-zinc-500 mt-3">
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
                    rounded-2xl
                    border border-zinc-800
                    bg-zinc-900
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:border-zinc-700
                    hover:-translate-y-1
                  "
                >
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
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <div>
                        <h2
                          className="
                            text-lg
                            font-bold
                            truncate
                          "
                        >
                          {
                            product.name
                          }
                        </h2>

                        <p
                          className="
                            text-zinc-400
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
                          bg-zinc-800
                          px-2 py-1
                          rounded-xl
                          text-xs
                          font-medium
                          text-yellow-400
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
                          bg-zinc-800
                          py-2
                          rounded-xl
                          text-sm
                          hover:bg-zinc-700
                          transition
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
                            bg-blue-500
                            py-2
                            rounded-xl
                            text-sm
                            hover:bg-blue-400
                            transition
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
                            bg-red-500
                            py-2
                            rounded-xl
                            text-sm
                            hover:bg-red-400
                            transition
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
                px-4 py-2
                rounded-xl
                bg-zinc-800
                disabled:opacity-40
              "
            >
              Prev
            </button>

            <div
              className="
                px-4 py-2
                rounded-xl
                bg-zinc-900
                border border-zinc-800
              "
            >
              {page} /{" "}
              {totalPages || 1}
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
                px-4 py-2
                rounded-xl
                bg-zinc-800
                disabled:opacity-40
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
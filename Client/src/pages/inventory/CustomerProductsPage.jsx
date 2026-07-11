import React, { useState, useEffect } from "react";
import { useProducts } from "../../services/inventory/useInventoryQuery";
import FormModal from "../../components/Modal/FormModal";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerProductsPage = () => {
  const { data: productsData, isLoading } = useProducts();
  const products = Array.isArray(productsData) ? productsData : productsData || [];

  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (products.length > 0 && user) {
      const productId = searchParams.get("productId");
      if (productId) {
        const prod = products.find(p => p._id === productId);
        if (prod) {
          setSelectedProduct(prod);
          setOpenModal(true);
        }
        setSearchParams({});
      }
    }
  }, [products, user, searchParams, setSearchParams]);

  const handleOpenDetails = (prod) => {
    setSelectedProduct(prod);
    setOpenModal(true);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate(`/register?redirect=/parlor-products?productId=${selectedProduct._id}`);
      return;
    }
    // Logic to add to cart or inquire about the product
    toast.success(`${selectedProduct.name} added to your cart/inquiry!`);
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] p-6 md:p-10 text-zinc-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div>
          <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
            Exclusive Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
            Our Luxury Products
          </h1>

          <p className="max-w-2xl text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
            Elevate your daily routine with our exclusive range of salon-grade products. Carefully selected by our experts, these premium formulations ensure that you can maintain that flawless, straight-out-of-the-salon look every single day.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-zinc-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200 text-zinc-500">
            No products are currently available in the parlor inventory.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="group bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden bg-zinc-50 relative border-b border-zinc-100">
                  <img
                    src={
                      p.image ||
                      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300&auto=format&fit=crop"
                    }
                    alt={p.name}
                    className="w-full h-full object-contain p-2 bg-white group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.brand && (
                    <span className="absolute top-4 left-4 bg-[#D68B2A]/10 border border-[#D68B2A]/30 text-[#D68B2A] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      {p.brand}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#D68B2A] transition">
                      {p.name}
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1 capitalize font-light">
                      Type: {p.type || "Parlor Use"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-[#D68B2A]">
                      ₹{p.sellingPrice || 0}
                    </span>
                    <button
                      onClick={() => handleOpenDetails(p)}
                      className="px-4 py-2 bg-gradient-to-b from-[#D68B2A] to-[#b57321] text-white hover:scale-105 rounded-xl text-xs font-medium transition-all shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <FormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Product Details"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* LEFT SIDE: PRODUCT IMAGE */}
            <div className="w-full h-[300px] md:h-[450px] max-h-[600px] rounded-2xl overflow-hidden bg-white border border-zinc-100 flex items-center justify-center">
              <img
                src={
                  selectedProduct.image ||
                  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=400&auto=format&fit=crop"
                }
                alt={selectedProduct.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* RIGHT SIDE: PRODUCT DETAILS */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                    {selectedProduct.brand || "Exclusive Brand"}
                  </span>
                  <h2 className="text-2xl font-extrabold text-zinc-900 mt-3 leading-tight">
                    {selectedProduct.name}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Brand</span>
                    <span className="font-semibold text-zinc-800 text-sm">{selectedProduct.brand || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Selling Price</span>
                    <span className="font-extrabold text-zinc-950 text-xl">₹{selectedProduct.sellingPrice || 0}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Usage Type</span>
                    <span className="font-semibold text-zinc-800 text-sm capitalize">{selectedProduct.type || "Dual Use"}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Status</span>
                    <span className="font-semibold text-emerald-600 text-sm">Available</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={handleBuyNow}
                  className="w-full md:w-auto px-6 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold rounded-xl transition shadow-md"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="w-full md:w-auto px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-zinc-950/10"
                >
                  Close View
                </button>
              </div>
            </div>

          </div>
        </FormModal>
      )}
    </div>
  );
};

export default CustomerProductsPage;

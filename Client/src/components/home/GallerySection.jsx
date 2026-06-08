import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const products = [
  {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    category: "Hair Care",
    title: "Professional Hair Collection",
    desc: "Premium shampoos, conditioners and hair treatments from world-renowned brands.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    category: "Skin Care",
    title: "Advanced Skin Essentials",
    desc: "Luxury skincare products designed for healthy and radiant skin.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop",
    category: "Men's Grooming",
    title: "Modern Grooming Range",
    desc: "Professional grooming products for beard care, styling and skincare.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
    category: "Beauty & Makeup",
    title: "Bridal Beauty Collection",
    desc: "Premium makeup and beauty products trusted by professional artists.",
  },
];

const ProductShowcaseSection = () => {
  return (
    <section className="relative py-32 bg-[#faf9f5] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#D68B2A]/5 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex px-5 py-2 rounded-full bg-[#D68B2A]/10 text-[#D68B2A] text-xs uppercase tracking-[0.3em] font-bold">
            Premium Products
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-light text-neutral-900 leading-none">
            Trusted Global Brands
          </h2>

          <h2 className="text-5xl md:text-7xl font-light  italic font-serif text-[#D68B2A] mt-2">
            For Men & Women
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-neutral-500 text-lg leading-relaxed">
            We use only salon-grade branded products trusted by beauty
            professionals worldwide. Every product is carefully selected
            to deliver exceptional results for hair, skin and grooming.
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[40px] h-[600px] shadow-[0_25px_80px_rgba(0,0,0,0.12)] mb-10">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop"
            alt="Premium Products"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em]">
              <ShieldCheck size={14} />
              Authentic Products
            </span>

            <h3 className="mt-6 text-5xl md:text-6xl font-light leading-tight">
              Professional Beauty
              <br />
              Products You Can Trust
            </h3>

            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              From luxury haircare and skincare to premium grooming
              essentials, we bring the world's most trusted beauty brands
              under one roof.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-white text-neutral-900 font-light hover:bg-[#D68B2A] hover:text-white transition-all duration-300"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Product Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/15 backdrop-blur-xl border border-white/20 text-white text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-light text-neutral-900">
                  {item.title}
                </h4>

                <p className="mt-3 text-neutral-500 leading-relaxed text-sm">
                  {item.desc}
                </p>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 mt-5 text-[#D68B2A] font-light hover:gap-3 transition-all"
                >
                  View Products
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className="mt-20 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-400 mb-8">
            Brands We Use
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              "L'Oréal Professionnel",
              "Wella",
              "Matrix",
              "Schwarzkopf",
              "O3+",
              "Rica",
              "Dermalogica",
              "Lotus Professional",
            ].map((brand) => (
              <div
                key={brand}
                className="px-6 py-3 rounded-2xl bg-white shadow-md text-neutral-700 font-light"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-light shadow-xl hover:scale-105 transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, #D68B2A, #B8791F)",
            }}
          >
            Browse All Premium Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
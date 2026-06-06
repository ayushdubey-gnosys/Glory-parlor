import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GenderSection = () => {
  return (
    <section
      id="gender"
      className="bg-[#F8F6EF] py-24 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[4px] text-xs font-semibold text-[#D68B2A] mb-4">
            Tailored Beauty Experiences
          </p>

          <h2 className="text-5xl md:text-6xl font-light text-slate-900">
            Beauty & Grooming
          </h2>

          <h2 className="text-5xl md:text-6xl italic font-light text-[#D68B2A] mt-2">
            For Everyone
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-500 leading-relaxed">
            Whether you're preparing for a wedding, a special occasion,
            or simply investing in self-care, our expert professionals
            provide personalized beauty and grooming experiences
            tailored to your unique style.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Women Card */}
          <div className="group bg-white rounded-[35px] overflow-hidden border border-[#EAE7DC] shadow-sm hover:shadow-xl transition-all duration-500">

            <div className="relative overflow-hidden h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop"
                alt="Women's Beauty Services"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  ✦ For Her
                </span>

                <h3 className="mt-4 text-5xl font-light">
                  Women's
                  <br />
                  Luxury Care
                </h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-slate-500 leading-relaxed">
                Discover premium beauty treatments designed to enhance
                your confidence and elegance. From bridal makeovers to
                advanced skincare therapies, we create unforgettable
                beauty experiences.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Bridal Makeup",
                  "Facials",
                  "Hair Color",
                  "Nail Art",
                  "Spa Therapy",
                  "Mehendi",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-[#FDF4E7] text-[#D68B2A] px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    5000+
                  </h4>
                  <p className="text-xs text-slate-500">
                    Happy Clients
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    20+
                  </h4>
                  <p className="text-xs text-slate-500">
                    Services
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    4.9★
                  </h4>
                  <p className="text-xs text-slate-500">
                    Rating
                  </p>
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 px-7 py-4 rounded-xl text-white font-medium"
                style={{
                  background:
                    "linear-gradient(135deg,#D68B2A,#B8791F)",
                }}
              >
                Explore Women's Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Men Card */}
          <div className="group bg-white rounded-[35px] overflow-hidden border border-[#EAE7DC] shadow-sm hover:shadow-xl transition-all duration-500">

            <div className="relative overflow-hidden h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop"
                alt="Men's Grooming"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  ✦ For Him
                </span>

                <h3 className="mt-4 text-5xl font-light">
                  Men's
                  <br />
                  Grooming Studio
                </h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-slate-500 leading-relaxed">
                Modern grooming solutions crafted for today's gentleman.
                Experience precision haircuts, beard styling, skin
                treatments, and premium relaxation services.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Hair Styling",
                  "Beard Sculpting",
                  "Skin Cleanup",
                  "Hair Color",
                  "Facials",
                  "Head Massage",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-[#FDF4E7] text-[#D68B2A] px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    4000+
                  </h4>
                  <p className="text-xs text-slate-500">
                    Happy Clients
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    15+
                  </h4>
                  <p className="text-xs text-slate-500">
                    Services
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-slate-900">
                    4.8★
                  </h4>
                  <p className="text-xs text-slate-500">
                    Rating
                  </p>
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 px-7 py-4 rounded-xl text-white font-medium"
                style={{
                  background:
                    "linear-gradient(135deg,#D68B2A,#B8791F)",
                }}
              >
                Explore Men's Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderSection;
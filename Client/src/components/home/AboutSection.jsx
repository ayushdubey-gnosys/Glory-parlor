import React from "react";
import { CheckCircle2, Play } from "lucide-react";

const features = [
  "Certified professional hair stylists and makeup artists",
  "100% safe, organic, and premium global beauty products",
  "Personalised bridal consultation and pre-grooming packages",
  "Advanced skin treatments and medical-grade facials",
  "Men's grooming studio with expert barber services",
  "Strict sterilisation and high hygiene standards",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden scroll-mt-24"
    >
      {/* Background Glow */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-amber-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-100/40 blur-[100px] rounded-full"></div>

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div>
          <p className="uppercase tracking-[4px] text-xs font-semibold text-amber-600 mb-4">
            About Astha PMS Parlor
          </p>

          <h2 className="text-4xl md:text-6xl font-light leading-tight text-slate-900 mb-6">
            Your Sanctuary For
            <br />
            <span className="italic text-amber-600">
              Luxury & Pampering
            </span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed mb-10">
            At Astha PMS, we believe beauty care is self-love. Our parlor serves
            both men and women in a peaceful and luxurious environment where
            expert stylists offer customised hair, skin, makeup, and grooming
            services using premium international beauty products.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <CheckCircle2
                      size={18}
                      className="text-amber-600"
                    />
                  </div>

                  <span className="text-sm text-slate-700 font-medium">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Gallery */}
        <div className="grid grid-cols-3 gap-4 h-[650px]">
          {/* Main Large Image */}
          <div className="col-span-2 overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
              alt="Luxury Salon"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Side Gallery */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl shadow-lg flex-1">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
                alt="Hair Styling"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg flex-1">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop"
                alt="Makeup Artist"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* Video Card */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg flex-1 group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-woman-having-a-haircut-at-the-beauty-salon-39889-large.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Play
                    size={20}
                    className="text-amber-600 fill-amber-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
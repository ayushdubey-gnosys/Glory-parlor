import React from "react";
import { CheckCircle2, Play } from "lucide-react";
import AboutVideo from "../../assets/aboutPage.mp4";

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
    <section id="about" className="relative py-24 bg-white scroll-mt-24">
      {/* Subtle Background Art */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-50/50 via-white to-white" />

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-center">

          {/* Left: Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D68B2A] bg-[#D68B2A]/10 px-4 py-1.5 rounded-full">
                The Astha Experience
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-light leading-[1.1] text-neutral-900 tracking-tight">
              A Sanctuary Crafted for <br />
              <span className="italic font-serif text-[#D68B2A]">Luxury & Pampering</span>
            </h2>

            <p className="text-neutral-500 text-lg leading-relaxed font-light">
              At Astha PMS, we define beauty as an extension of self-love. Our space is meticulously curated to provide
              a serene, high-end environment where expert stylists and therapists deliver personalized care.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {features.map((item, i) => (
                <div key={i} className="group flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 transition-all duration-300 hover:bg-white hover:border-[#D68B2A]/20 hover:shadow-[0_10px_30px_rgba(214,139,42,0.05)]">
                  <CheckCircle2 size={16} className="text-[#D68B2A] mt-1 shrink-0" />
                  <span className="text-sm text-neutral-600 font-light leading-snug group-hover:text-neutral-900 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <div className="grid lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.2fr_1fr] gap-6 h-[700px]">

            {/* Large Video */}
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              >
                <source
                  src={AboutVideo}
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-[#D68B2A]">
                  Premium Experience
                </p>

                <h3 className="text-4xl font-light mt-2">
                  Luxury Beauty Studio
                </h3>
              </div>
            </div>

            {/* Right Images Cards */}
            <div className="flex flex-col gap-6">
              <div className="h-1/2 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[6px] border-white bg-white group cursor-pointer relative">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                  <p className="text-sm font-light text-slate-800">Relaxation</p>
                </div>
              </div>

              <div className="h-1/2 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[6px] border-white bg-white group cursor-pointer relative">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                  <p className="text-sm font-light text-slate-800">Makeovers</p>
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
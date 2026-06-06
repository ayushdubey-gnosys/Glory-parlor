import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, Star } from "lucide-react";

const CTASection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-[40px] min-h-[500px]">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Salon"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Gradient Glow */}
        <div className="absolute top-0 right-0 h-80 w-80 bg-amber-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 bg-yellow-300/10 blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-20">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-6">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs uppercase tracking-[3px] text-amber-300 font-medium">
              Book Your Beauty Session
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight max-w-4xl">
            Ready To Experience
            <br />
            <span className="italic text-amber-400">
              Premium Beauty & Wellness?
            </span>
          </h2>

          <p className="max-w-2xl mt-6 text-slate-300 text-base md:text-lg leading-relaxed">
            Whether it's a bridal makeover, luxury facial, hair transformation,
            or professional grooming, our experts are ready to create your
            perfect look.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium bg-gradient-to-r from-amber-600 to-yellow-700 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Calendar size={18} />
              Book Appointment
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <a
              href="tel:+919999999999"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 w-full max-w-4xl">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="text-slate-300 mt-2">
                Happy Clients
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">15+</h3>
              <p className="text-slate-300 mt-2">
                Years Experience
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="text-slate-300 mt-2">
                Premium Services
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
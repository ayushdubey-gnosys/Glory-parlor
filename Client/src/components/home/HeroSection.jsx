import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import bgVideo from "../../assets/home.mp4";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../common/Loader";

const HeroSection = () => {
  const { user } = useAuth();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#292B2B]">
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-[#292B2B]">
          <Loader />
        </div>
      )}

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Replace with your own video */}
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />

      {/* Decorative Glow */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-7xl text-center">
          {/* Badge */}
          <div className="mb-6 mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-light uppercase tracking-[3px] text-white ">
              Luxury Beauty & Wellness
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-light leading-none text-white/70 md:text-7xl lg:text-[110px]">
            Reveal Your
          </h1>

          <h1 className="mt-2 text-5xl text-white [text-shadow:0_0_10px_rgb(250_200_255)] font-light italic leading-none text-yellow-400/90 md:text-7xl lg:text-[110px]">
            Natural Beauty
          </h1>

          <h1 className="mt-2 text-5xl font-light leading-none text-white/50 md:text-7xl lg:text-[110px]">
            Flawlessly
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">
            Welcome to Astha PMS Parlor — where beauty meets elegance.
            Experience luxury hair styling, flawless bridal makeup,
            advanced skincare treatments, and premium grooming services
            tailored exclusively for you.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to={user ? "/appointments/book" : "/register?redirect=/appointments/book"}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-b from-yellow-600 to-yellow-800 px-8 py-4 font-light text-white transition-all duration-300 hover:scale-105"
            >
              Book Appointment
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#services"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-light text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              View Services
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="mt-2 text-sm text-slate-300">
                Happy Clients
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">15+</h3>
              <p className="mt-2 text-sm text-slate-300">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="mt-2 text-sm text-slate-300">
                Premium Services
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex h-14 w-8 justify-center rounded-full border border-white/30">
              <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
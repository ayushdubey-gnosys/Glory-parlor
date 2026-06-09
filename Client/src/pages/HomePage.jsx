import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Sparkles, Scissors, Info, Calendar } from "lucide-react";

import HeroSection from "../components/home/HeroSection";
import GenderSection from "../components/home/GenderSection";
import ServicesSection from "../components/home/ServicesSection";
import StatsSection from "../components/home/StatsSection";
import AboutSection from "../components/home/AboutSection";
import ProductShowcaseSection from "../components/home/GallerySection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import AcademySection from "../components/home/CTASection";
import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";


const HomePage = () => {
  const { user } = useAuth();

  return (
    <div
      className="relative overflow-clip min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-100"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .gold-text { color: #b58d4a; }

        .gender-card { position: relative; border-radius: 16px; overflow: hidden; height: 380px; cursor: pointer; }
        .gender-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gender-card:hover img { transform: scale(1.05); }
        .gender-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%);
        }
        .gender-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px; }
        .gender-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: #f0d99a; margin-bottom: 6px;
        }
        .gender-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px; font-weight: 300;
          color: #fff; line-height: 1.1;
        }
        .gender-services {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.7);
          margin-top: 8px; line-height: 1.6;
        }
        .gender-cta {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 14px;
          background: rgba(181,141,74,0.2);
          border: 1px solid rgba(181,141,74,0.5);
          color: #f0d99a;
          padding: 8px 16px; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          transition: background 0.2s;
        }
        .gender-cta:hover { background: rgba(181,141,74,0.35); }

        .gallery-img-wrap { overflow: hidden; border-radius: 16px; border: 1px solid rgba(203,213,225,0.6); }
        .gallery-img-wrap img { width: 100%; height: 300px; object-fit: cover; transition: transform 0.7s ease; display: block; }
        .gallery-img-wrap:hover img { transform: scale(1.06); }
      `}</style>

      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-[130px] pointer-events-none" />

      {/* ── NAVBAR ── */}
      {!user && (
        <Navbar />
      )}

      {/* ── COMPONENTS ── */}
      <HeroSection />
      <GenderSection />
      <ServicesSection />
      <ProductShowcaseSection />
      <AcademySection />
      <StatsSection />
      <AboutSection />

      <TestimonialsSection />

      <Footer />


    </div>
  );
};

export default HomePage;
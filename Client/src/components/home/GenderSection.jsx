import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GenderSection = () => {
  return (
    <section id="gender" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-14">
        <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Tailored For You</p>
        <h2 className="text-5xl font-light text-slate-900">Beauty For Everyone</h2>
        <p className="dm max-w-lg mx-auto mt-4 text-slate-500 text-sm leading-relaxed">
          We proudly serve both men and women with curated treatments designed for each unique need.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FOR HER */}
        <div id="for-her" className="gender-card scroll-mt-24">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=900&auto=format&fit=crop"
            alt="Women's beauty services"
          />
          <div className="gender-overlay" />
          <div className="gender-content">
            <div className="gender-label">✦ For Her</div>
            <div className="gender-title">Women's<br />Luxury Care</div>
            <div className="gender-services">
              Bridal Makeup · Facials · Hair Colour · Nail Art · Waxing · Spa Rituals · Skin Therapy · Lash Extensions · Mehendi
            </div>
            <Link to="/register" className="gender-cta">
              Explore Women's Services <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* FOR HIM */}
        <div id="for-him" className="gender-card scroll-mt-24">
          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=900&auto=format&fit=crop"
            alt="Men's grooming services"
          />
          <div className="gender-overlay" />
          <div className="gender-content">
            <div className="gender-label">✦ For Him</div>
            <div className="gender-title">Men's<br />Grooming Studio</div>
            <div className="gender-services">
              Classic Shaves · Hair Styling · Beard Sculpting · Skin Cleanup · Hair Colour · Head Massage · Anti-Tan · Facials
            </div>
            <Link to="/register" className="gender-cta">
              Explore Men's Services <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderSection;

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-2xl p-10 md:p-16 text-center border border-amber-200/60 bg-gradient-to-b from-amber-50/60 to-amber-50/10 shadow-sm">
        <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Book Your Slot</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-tight">
          Ready To Experience <br />Premium Pampering?
        </h2>
        <p className="dm max-w-lg mx-auto mt-4 text-slate-500 text-sm md:text-base">
          Book your appointment today and let our beauty experts design the look you deserve — for her and for him.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl text-white font-medium shadow-md shadow-amber-800/10 hover:shadow-lg transition dm"
          style={{ background: "linear-gradient(135deg, #b58d4a, #967133)" }}
        >
          Book An Appointment
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;

import React from "react";

const StatsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24 dm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { number: "50+",  label: "Luxury Treatments" },
          { number: "12+",  label: "Expert Stylists" },
          { number: "100%", label: "Hygiene Guaranteed" },
          { number: "4.9★", label: "Client Rating" },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-6 text-center shadow-sm hover:border-amber-200 transition-colors duration-300">
            <h3 className="text-4xl font-light gold-text tracking-tight">{item.number}</h3>
            <p className="text-slate-400 mt-2 text-xs font-semibold uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

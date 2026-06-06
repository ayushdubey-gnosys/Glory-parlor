import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Reviews</p>
        <h2 className="text-5xl font-light text-slate-900">What Our Clients Say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 dm">
        {[
          { review: "Their bridal makeup made my wedding day incredibly special. I received compliments all night long.", role: "Bridal Customer" },
          { review: "The beard sculpting and skin cleanup completely upgraded my look. Most professional grooming I've experienced!", role: "Male Customer" },
          { review: "Most hygienic parlor in town. Their hydra-facial gave my skin an instant glow that lasted for weeks!", role: "Regular Customer" },
        ].map(({ review, role }, i) => (
          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={15} fill="#b58d4a" color="#b58d4a" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"{review}"</p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-900">Happy Client</h4>
              <p className="text-slate-400 text-xs mt-0.5">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

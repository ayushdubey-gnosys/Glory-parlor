import React from "react";
import {
  Calendar,
  Scissors,
  Users,
  MessageSquare,
  ShoppingBag,
  GraduationCap
} from "lucide-react";

/* ── FEATURE CARD ── */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white border border-slate-200/80 rounded-xl p-8 hover:border-amber-200 shadow-sm transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 gold-text">
      {icon}
    </div>
    <h3 className="text-xl font-normal text-slate-900 mb-3 tracking-tight">{title}</h3>
    <p className="dm text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Explore Our Parlor</p>
        <h2 className="text-5xl font-light text-slate-900">What We Offer</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard icon={<Calendar size={22} />} title="Appointments"
          desc="Book your favourite treatments and stylists easily online. Manage visits and track history effortlessly." />
        <FeatureCard icon={<Scissors size={22} />} title="Premium Services"
          desc="Luxury treatments including hair styling, advanced skin care, and flawless bridal makeovers." />
        <FeatureCard icon={<Users size={22} />} title="Expert Staff"
          desc="Highly trained professionals and expert stylists dedicated to the ultimate pampering experience." />
        <FeatureCard icon={<MessageSquare size={22} />} title="My Inquiries"
          desc="Send inquiries directly to our team and get personalised consultations before booking." />
        <FeatureCard icon={<ShoppingBag size={22} />} title="Parlor Products"
          desc="Shop our exclusive range of 100% safe, organic, and premium global beauty products." />
        <FeatureCard icon={<GraduationCap size={22} />} title="Beauty Academy"
          desc="Learn professional makeup artistry, hair-styling, and earn certified beauty diplomas from our experts." />
      </div>
    </section>
  );
};

export default ServicesSection;

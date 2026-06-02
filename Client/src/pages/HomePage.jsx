import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle2,
  Info,
  Scissors,
  Heart,
  Flower2,
  Clock,
  Users,
} from "lucide-react";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-100"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Fonts & Styling Overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .gold-text {
          color: #b58d4a;
        }
      `}</style>

      {/* Decorative Soft Glowing Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-[130px] pointer-events-none" />

      {/* ================= PREMIUM STICKY NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm text-white transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight block leading-none">Astha PMS</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5 block dm">Premium Beauty Parlor</span>
            </div>
          </Link>

          {/* Core Navigation Links */}
          <div className="hidden md:flex items-center gap-8 dm">
            <a href="#services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition duration-200">
              <Scissors className="w-4 h-4 text-slate-400" />
              Our Services
            </a>
            <a href="#about" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition duration-200">
              <Info className="w-4 h-4 text-slate-400" />
              About Our Parlor
            </a>
          </div>

          {/* Authentication actions removed for customer view */}

        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 relative z-10">
        <div className="text-center fade-up">
          <p className="dm uppercase tracking-[4px] text-xs font-semibold gold-text mb-5">
            Luxury Beauty & Wellness Experience
          </p>

          <h1 className="text-6xl text-sha shadow-amber-800 md:text-8xl lg:text-9xl font-light tracking-tight text-slate-900 leading-none">
            Reveal Your
          </h1>

          <h1 className="text-6xl md:text-8xl lg:text-9xl italic font-light gold-text mt-2">
            Natural Beauty
          </h1>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-slate-300 mt-2">
            Flawlessly
          </h1>

          <p className="dm max-w-2xl mx-auto mt-8 text-slate-500 text-base md:text-lg leading-relaxed">
            Welcome to Astha PMS Parlor. Step into a world of ultimate relaxation and premium pampering. We specialize in luxury hair makeovers, flawless bridal makeups, soothing skin therapies, and personalized beauty transformations designed to make you glow.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10 dm">
            <Link
              to="/register"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg shadow-md shadow-amber-700/10 active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #b58d4a, #967133)",
              }}
            >
              Book Appointment Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#services"
              className="px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-all"
            >
              View Our Menu
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mt-20 max-w-5xl mx-auto fade-up">
          <div className="absolute inset-0 bg-amber-500/5 blur-[80px] rounded-3xl" />
          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1400&auto=format&fit=crop"
            alt="Luxury Parlor Interior Studio"
            className="rounded-2xl w-full h-[450px] md:h-[550px] object-cover border border-slate-200/60 shadow-md"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 shadow-lg dm">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Our Heritage</p>
            <h3 className="text-2xl font-normal text-slate-900 mt-0.5">10,000+ Happy Clients</h3>
          </div>
        </div>
      </section>

      {/* ================= PARLOR HIGHLIGHT STATS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24 dm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "50+", label: "Luxury Treatments" },
            { number: "12+", label: "Expert Stylists" },
            { number: "100%", label: "Hygiene Guaranteed" },
            { number: "4.9★", label: "Client Rating" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/80 rounded-xl p-6 text-center shadow-xs hover:border-amber-200 transition-colors duration-300"
            >
              <h3 className="text-4xl font-light gold-text tracking-tight">{item.number}</h3>
              <p className="text-slate-400 mt-2 text-xs font-semibold uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT THE PARLOR ================= */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">
              About Astha PMS Parlor
            </p>

            <h2 className="text-5xl md:text-6xl font-light leading-tight text-slate-900 mb-6">
              Your Sanctuary For <br />
              <span className="italic gold-text">Luxury & Pampering</span>
            </h2>

            <p className="dm text-slate-500 text-base leading-relaxed mb-8">
              At Astha PMS, we believe that beauty care is self-love. Our parlor features a peaceful, luxurious environment where highly trained beauty experts offer customized hair, skin, and makeup services using world-class premium products.
            </p>

            <div className="space-y-4 dm">
              {[
                "Certified professional hair stylists and makeup artists",
                "100% safe, organic, and premium global beauty products",
                "Personalized bridal consultation and pre-grooming packages",
                "Advanced skin treatments and medical-grade facials",
                "Relaxing spa rituals and deep-conditioning therapies",
                "Strict sterilization and high hygiene standards",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={15} className="gold-text" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
            alt="Esthetic salon treatment"
            className="rounded-2xl h-[450px] lg:h-[550px] w-full object-cover border border-slate-200 shadow-sm"
          />
        </div>
      </section>

      {/* ================= OUR CORE PARLOR SERVICES ================= */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
        <div className="text-center mb-16">
          <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">
            Indulge In Luxury
          </p>
          <h2 className="text-5xl font-light text-slate-900">Our Signature Services</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Scissors size={22} />}
            title="Hair Styling & Cut"
            desc="Transform your look with precision cuts, celebrity styling, global hair coloring, balayage, and luxury hair spa treatments."
          />
          <FeatureCard
            icon={<Sparkles size={22} />}
            title="Bridal & Event Makeup"
            desc="Stunning high-definition and airbrush makeup crafted flawlessly by artists for weddings, receptions, and parties."
          />
          <FeatureCard
            icon={<Flower2 size={22} />}
            title="Advanced Skin Care"
            desc="Rejuvenate your skin with premium global facials, anti-acne therapies, glow treatments, and custom skin detanning rituals."
          />
          <FeatureCard
            icon={<Heart size={22} />}
            title="Body Spa & Wellness"
            desc="Unwind with aromatic body massages, exfoliating body scrubs, and wellness rituals that melt your daily stress away."
          />
          <FeatureCard
            icon={<Clock size={22} />}
            title="Manicure & Nail Art"
            desc="Pamper your hands and feet with luxury gel manicures, relaxing pedicures, and artistic modern nail extensions."
          />
          <FeatureCard
            icon={<Users size={22} />}
            title="Beauty Academy"
            desc="Learn professional makeup artistry, master hair-styling layouts, and earn certified beauty diplomas from our salon experts."
          />
        </div>
      </section>

      {/* ================= BEAUTY VISUAL GALLERY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
          ].map((url, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-xs">
              <img
                src={url}
                alt="Parlor Ambience Detail"
                className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLIENT TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Reviews</p>
          <h2 className="text-5xl font-light text-slate-900">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 dm">
          {[
            "Astha PMS is my go-to place! Their bridal makeup made my wedding day incredibly special. I received compliments all night long.",
            "The global hair color and smoothing treatment they gave me completely changed my look. Absolutely love their hospitality!",
            "Most hygienic parlor in town. Their hydra-facial gave my skin an instant glow that lasted for weeks. Highly recommended!",
          ].map((review, i) => (
            <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-xs flex flex-col justify-between">
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
                <p className="text-slate-400 text-xs mt-0.5">Regular Customer</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-10 md:p-16 text-center border border-amber-200/60 bg-gradient-to-b from-amber-50/60 to-amber-50/10 shadow-xs">
          <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Book Your Slot</p>
          
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-tight">
            Ready To Experience <br />
            Premium Pampering?
          </h2>

          <p className="dm max-w-lg mx-auto mt-4 text-slate-500 text-sm md:text-base">
            Book your appointment today and let our beauty experts design the look you deserve.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl text-white font-medium shadow-md shadow-amber-800/10 hover:shadow-lg transition dm"
            style={{
              background: "linear-gradient(135deg, #b58d4a, #967133)",
            }}
          >
            Book An Appointment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

/* FEATURE CARD COMPONENT SPECIFICATION */
const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-8 hover:border-amber-200 shadow-xs transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 gold-text">
        {icon}
      </div>
      <h3 className="text-xl font-normal text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="dm text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default HomePage;
import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  BadgeDollarSign,
  Package,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
      style={{
        fontFamily:
          "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Fonts & Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 1s ease forwards;
        }

        .gold {
          color: #c9a96e;
        }
      `}</style>

      {/* Background */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-yellow-700/10 blur-[140px]" />

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[140px]" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">

        <div className="text-center fade-up">
          <p className="dm uppercase tracking-[5px] text-xs gold mb-6">
            Premium Salon Management Platform
          </p>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light leading-none">
            Manage Your
          </h1>

          <h1 className="text-7xl md:text-8xl lg:text-9xl italic font-light gold">
            Salon Business
          </h1>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-zinc-600">
            Beautifully
          </h1>

          <p className="dm max-w-2xl mx-auto mt-10 text-zinc-400 text-lg leading-8">
            Astha PMS helps salons manage
            appointments, billing,
            inventory, staff, academy,
            marketing and customer
            engagement in one elegant
            platform designed for luxury
            beauty businesses.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <Link
              to="/register"
              className="dm group flex items-center gap-2 px-8 py-4 rounded-full text-black font-medium transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg,#c9a96e,#a07840)",
              }}
            >
              Start Free Trial

              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition"
              />
            </Link>

            <Link
              to="/features"
              className="dm px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mt-24 fade-up">
          
          <div className="absolute inset-0 bg-yellow-500/10 blur-[120px]" />

          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1400&auto=format&fit=crop"
            alt="Salon"
            className="relative rounded-[40px] w-full h-[650px] object-cover border border-white/10"
          />

          <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <p className="dm text-zinc-400 text-sm">
              Trusted by
            </p>

            <h3 className="text-3xl font-light">
              500+ Premium Salons
            </h3>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          
          {[
            {
              number: "10K+",
              label: "Customers",
            },
            {
              number: "500+",
              label: "Salons",
            },
            {
              number: "99%",
              label: "Success Rate",
            },
            {
              number: "24/7",
              label: "Support",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/5 rounded-[28px] p-8 text-center hover:bg-white/[0.05] transition-all duration-300"
            >
              <h3 className="text-5xl font-light gold">
                {item.number}
              </h3>

              <p className="dm text-zinc-500 mt-3 text-sm uppercase tracking-widest">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <p className="dm uppercase tracking-[4px] text-xs gold mb-5">
              Why Choose Astha  PMS
            </p>

            <h2 className="text-6xl font-light leading-tight mb-8">
              Designed For
              <span className="italic gold">
                {" "}
                Modern Salons
              </span>
            </h2>

            <p className="dm text-zinc-400 leading-8 mb-10">
              Our salon management software
              is crafted to simplify every
              part of your business —
              customer handling,
              appointments, staff,
              inventory and financial
              reporting.
            </p>

            <div className="space-y-5">
              {[
                "Appointment scheduling with reminders",
                "Professional PDF invoices",
                "Inventory & stock management",
                "Customer loyalty system",
                "WhatsApp & SMS campaigns",
                "Staff attendance & salary tracking",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2
                    size={18}
                    className="gold"
                  />

                  <span className="dm text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
            className="rounded-[36px] h-[650px] object-cover border border-white/10"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">
          <p className="dm uppercase tracking-[4px] text-xs gold mb-5">
            Powerful Features
          </p>

          <h2 className="text-6xl font-light">
            Everything You Need
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <FeatureCard
            icon={<Users size={22} />}
            title="Customer Management"
            desc="Manage customer history, loyalty, birthdays, notes and preferences beautifully."
          />

          <FeatureCard
            icon={<Calendar size={22} />}
            title="Appointments"
            desc="Book appointments with reminders, slot management and smart scheduling."
          />

          <FeatureCard
            icon={<BadgeDollarSign size={22} />}
            title="Billing & Invoices"
            desc="Generate luxury GST invoices and download professional PDFs instantly."
          />

          <FeatureCard
            icon={<Package size={22} />}
            title="Inventory"
            desc="Track products, stock levels, expiry dates and vendor purchases."
          />

          <FeatureCard
            icon={<TrendingUp size={22} />}
            title="Reports & Analytics"
            desc="Visualize salon performance with revenue and customer insights."
          />

          <FeatureCard
            icon={<Sparkles size={22} />}
            title="Academy Module"
            desc="Manage salon courses, faculty, certificates and beauty training."
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">
          <p className="dm uppercase tracking-[4px] text-xs gold mb-5">
            Luxury Experience
          </p>

          <h2 className="text-6xl font-light">
            Crafted For Beauty
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop"
            className="rounded-[30px] h-[500px] object-cover hover:scale-[1.02] transition-all duration-700"
          />

          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
            className="rounded-[30px] h-[500px] object-cover hover:scale-[1.02] transition-all duration-700"
          />

          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
            className="rounded-[30px] h-[500px] object-cover hover:scale-[1.02] transition-all duration-700"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">
          <p className="dm uppercase tracking-[4px] text-xs gold mb-5">
            Testimonials
          </p>

          <h2 className="text-6xl font-light">
            Loved By Salon Owners
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Amazing appointment management and billing system.",
            "The interface looks very premium and modern.",
            "WhatsApp marketing helped us grow faster.",
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/5 rounded-[30px] p-8"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map(
                  star => (
                    <Star
                      key={star}
                      size={16}
                      fill="#c9a96e"
                      color="#c9a96e"
                    />
                  )
                )}
              </div>

              <p className="dm text-zinc-400 leading-8">
                {review}
              </p>

              <div className="mt-8">
                <h4 className="text-xl font-light">
                  Salon Owner
                </h4>

                <p className="dm text-zinc-600 text-sm">
                  Mumbai, India
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="rounded-[40px] p-16 text-center border border-yellow-700/20 bg-yellow-700/5">
          
          <p className="dm uppercase tracking-[4px] text-xs gold mb-5">
            Start Today
          </p>

          <h2 className="text-6xl font-light leading-tight">
            Ready To Grow
            <br />
            Your Salon?
          </h2>

          <p className="dm max-w-2xl mx-auto mt-8 text-zinc-400 leading-8">
            Join hundreds of premium salons
            using Astha  PMS to manage their
            beauty business professionally.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-12 px-8 py-4 rounded-full text-black font-medium"
            style={{
              background:
                "linear-gradient(135deg,#c9a96e,#a07840)",
            }}
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}) => {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-[30px] p-8 hover:bg-white/[0.05] transition-all duration-500">
      
      <div className="w-14 h-14 rounded-2xl bg-yellow-700/10 border border-yellow-700/20 flex items-center justify-center mb-6 gold">
        {icon}
      </div>

      <h3 className="text-2xl font-light mb-4">
        {title}
      </h3>

      <p className="dm text-zinc-500 leading-8">
        {desc}
      </p>
    </div>
  );
};

export default HomePage;
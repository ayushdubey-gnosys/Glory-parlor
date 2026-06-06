import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Scissors,
  Users,
  MessageSquare,
  ShoppingBag,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Calendar size={22} />,
    title: "Appointments",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1000&q=80",
    desc: "Book your favourite treatments and beauty sessions with ease.",
  },
  {
    icon: <Scissors size={22} />,
    title: "Premium Services",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&q=80",
    desc: "Luxury hair styling, bridal makeup, facials and skin treatments.",
  },
  {
    icon: <Users size={22} />,
    title: "Expert Staff",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000&q=80",
    desc: "Certified beauty experts dedicated to your perfect look.",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Consultations",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&q=80",
    desc: "Get personalized beauty consultations before your appointment.",
  },
  {
    icon: <ShoppingBag size={22} />,
    title: "Beauty Products",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&q=80",
    desc: "Premium skincare and beauty products trusted by professionals.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Beauty Academy",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80",
    desc: "Professional beauty courses and certification programs.",
  },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="bg-[#F8F6EF] py-32 scroll-mt-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-yellow-200/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <p className="uppercase tracking-[5px] text-xs font-semibold text-[#D68B2A] mb-5">
            Explore Our Services
          </p>

          <h2 className="text-5xl md:text-7xl font-light text-slate-900 leading-tight">
            Beauty & Wellness
          </h2>

          <h2 className="text-5xl md:text-7xl font-light italic text-[#D68B2A] mt-2">
            Crafted For You
          </h2>

          <p className="max-w-2xl mx-auto mt-8 text-slate-500 text-lg leading-relaxed">
            Discover luxury beauty treatments, expert grooming, bridal makeovers, skincare solutions, and professional beauty education under one roof.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[32px] overflow-hidden border border-[#EAE7DC]/60 shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="overflow-hidden h-64 relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 relative">
                {/* Floating Icon */}
                <div className="absolute -top-10 right-8 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#D68B2A] transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 border border-[#FDF4E7]">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-light text-slate-900 mb-4 pr-12">
                  {service.title}
                </h3>

                <p className="text-slate-500 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="h-[1px] w-full bg-slate-100 mb-6" />

                <button className="text-[#D68B2A] font-medium flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Learn More</span>
                    <span className="block absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-amber-600">Learn More</span>
                  </span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-28 bg-white border border-[#EAE7DC] rounded-[40px] p-12 md:p-16 text-center shadow-lg relative overflow-hidden"
        >
          {/* Subtle pattern / glow inside banner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-tight">
              Your Beauty Journey <br className="hidden md:block" /> Starts Here
            </h3>

            <p className="max-w-2xl mx-auto mt-6 text-slate-500 text-lg leading-relaxed">
              Whether you're preparing for a special occasion or simply treating yourself, our experts are here to deliver an unforgettable beauty experience.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 px-10 py-5 rounded-2xl text-white font-medium text-lg shadow-xl shadow-amber-900/20 flex items-center gap-3 mx-auto"
              style={{
                background: "linear-gradient(135deg, #D68B2A, #B8791F)",
              }}
            >
              Book Your Appointment
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
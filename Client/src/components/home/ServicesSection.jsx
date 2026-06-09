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
import appointmentVideo from "../../assets/appointment.mp4"

const services = [
  {
    icon: <Calendar size={22} />,
    title: "Appointments",
    image:
      "https://plus.unsplash.com/premium_vector-1731484096838-c84a0469206d?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Book your favourite treatments and beauty sessions with ease.",
  },
  {
    icon: <Scissors size={22} />,
    title: "Premium Services",
    image:
      "https://images.unsplash.com/photo-1713448721040-9921e982d672?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Luxury hair styling, bridal makeup, facials and skin treatments.",
  },
  {
    icon: <Users size={22} />,
    title: "Expert Staff",
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Certified beauty experts dedicated to your perfect look.",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Consultations",
    image:
      "https://plus.unsplash.com/premium_photo-1661339195305-798325862bc9?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Get personalized beauty consultations before your appointment.",
  },
  {
    icon: <ShoppingBag size={22} />,
    title: "Beauty Products",
    image:
      "https://images.unsplash.com/photo-1721403396830-d290f04c08a4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Premium skincare and beauty products trusted by professionals.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Beauty Academy",
    image:
      "https://i.pinimg.com/1200x/c1/a4/40/c1a440efd5bd250e64e930fb98a003d5.jpg",
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
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="bg-[#F8F6EF] pt-10 pb-20 scroll-mt-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-yellow-200/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
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
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="group relative h-[500px] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-900/20 transition-shadow duration-500"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient overlay for normal state readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-700 group-hover:opacity-0" />

              {/* Normal State: Just Heading */}
              <div className="absolute bottom-0 left-0 w-full p-8 transition-all duration-700 transform group-hover:translate-y-8 group-hover:opacity-0">
                <h3 className="text-3xl font-light text-white drop-shadow-lg">
                  {service.title}
                </h3>
              </div>

              {/* Hover State: Swiping up Content */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col justify-end p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                {/* Floating Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center text-[#D68B2A] mb-8 border border-white/20 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-light text-white mb-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-150">
                  {service.title}
                </h3>

                <p className="text-white/80 leading-relaxed mb-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                  {service.desc}
                </p>

                <button className="text-[#D68B2A] font-light flex items-center gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300 w-fit group/btn">
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-500 group-hover/btn:-translate-y-full">
                      Learn More
                    </span>
                    <span className="block absolute inset-0 transition-transform duration-500 translate-y-full group-hover/btn:translate-y-0 text-white">
                      Learn More
                    </span>
                  </span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
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
          className="mt-28 bg-yellow-50 border border-[#EAE7DC] rounded-[40px] shadow-lg relative overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Side: Video */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={appointmentVideo}
            ></video>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 p-12 md:p-16 relative flex flex-col justify-center text-left">
            {/* Subtle pattern / glow inside banner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C07900] rounded-full blur-[80px] -mr-32 -mt-32 z-0" />

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-700 leading-tight">
                Your Beauty Journey <br className="hidden xl:block" /> Starts Here
              </h3>

              <p className="max-w-xl mt-6 text-slate-500 text-lg leading-relaxed">
                Whether you're preparing for a special occasion or simply treating yourself, our experts are here to deliver an unforgettable beauty experience.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 bg-gradient-to-b from-yellow-600 to-yellow-800 px-10 py-5 rounded-2xl text-white font-light text-lg shadow-xl shadow-amber-900/20 flex items-center gap-3 w-fit"
              >
                Book Your Appointment
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
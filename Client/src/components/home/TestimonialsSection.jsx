import React from "react";
import {
  Star,
  Quote,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bridal Makeup Client",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    review:
      "The bridal makeup was absolutely stunning. The team understood exactly what I wanted and made me feel confident on my special day.",
  },
  {
    name: "Rahul Mehta",
    role: "Grooming Client",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    review:
      "Excellent service and professional staff. My haircut, beard styling and facial treatment exceeded my expectations.",
  },
  {
    name: "Neha Patel",
    role: "Regular Customer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    review:
      "The atmosphere is relaxing and luxurious. Their skincare treatments have completely transformed my skin.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Premium Services" },
];

const TestimonialsSection = () => {
  return (
    <section className="relative overflow-hidden py-32 bg-[#faf9f5]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#D68B2A]/5 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D68B2A]/10 text-[#D68B2A] text-xs font-bold uppercase tracking-[0.3em]">
            Client Testimonials
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-medium text-neutral-900 leading-none">
            Loved By
          </h2>

          <h2 className="text-5xl md:text-7xl font-serif italic text-[#D68B2A] mt-2">
            Thousands Of Clients
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-neutral-500 leading-relaxed">
            Discover why clients trust Astha PMS for luxury beauty,
            skincare, bridal makeovers, grooming and wellness services.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
              bg-white/70
              backdrop-blur-xl
              border
              border-white
              rounded-[30px]
              p-8
              text-center
              shadow-xl
              hover:-translate-y-2
              transition
              "
            >
              <h3 className="text-4xl font-medium text-neutral-900">
                {item.value}
              </h3>

              <p className="text-sm text-neutral-500 mt-3">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Marquee */}
        <div className="mt-20 relative w-full overflow-hidden pb-10 -mx-6 px-6">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-[#faf9f5] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-[#faf9f5] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex gap-8 w-max animate-marquee items-stretch">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="
                w-[350px] md:w-[450px]
                shrink-0
                relative
                bg-white/80
                backdrop-blur-xl
                border
                border-white
                rounded-[36px]
                p-8
                shadow-xl
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-500
                flex flex-col
                "
              >
                {/* Quote */}
                <div className="absolute top-6 right-6">
                  <Quote
                    size={40}
                    className="text-[#D68B2A]/20"
                  />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#D68B2A"
                      color="#D68B2A"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-neutral-600 leading-relaxed italic flex-grow">
                  "{item.review}"
                </p>

                {/* User */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                    w-16
                    h-16
                    rounded-full
                    object-cover
                    ring-4
                    ring-[#D68B2A]/10
                    "
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-900">
                        {item.name}
                      </h4>

                      <BadgeCheck
                        size={16}
                        className="text-[#D68B2A]"
                      />
                    </div>

                    <p className="text-sm text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

  

      </div>
    </section>
  );
};

export default TestimonialsSection;
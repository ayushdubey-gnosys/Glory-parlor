import React from "react";
import { Star, Quote } from "lucide-react";

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
      "Excellent service and professional staff. My haircut, beard styling, and facial treatment exceeded my expectations.",
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

const TestimonialsSection = () => {
  return (
    <section className="bg-[#F8F6EF] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-xs font-semibold text-[#D68B2A] mb-4">
            Client Reviews
          </p>

          <h2 className="text-5xl md:text-6xl font-light text-slate-900">
            What Our Clients
          </h2>

          <h2 className="text-5xl md:text-6xl font-light italic text-[#D68B2A] mt-2">
            Say About Us
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-slate-500 leading-relaxed">
            Thousands of clients trust Astha PMS for premium beauty,
            bridal makeup, luxury skincare, hair styling, and grooming services.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {[
            { value: "10K+", label: "Happy Clients" },
            { value: "4.9★", label: "Average Rating" },
            { value: "15+", label: "Years Experience" },
            { value: "50+", label: "Premium Services" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#EAE7DC] rounded-3xl p-6 text-center shadow-sm"
            >
              <h3 className="text-3xl font-light text-slate-900">
                {item.value}
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#EAE7DC] rounded-[30px] p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#D68B2A"
                      color="#D68B2A"
                    />
                  ))}
                </div>

                <Quote
                  size={28}
                  className="text-[#D68B2A]/40"
                />
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-relaxed italic">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#EAE7DC]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-medium text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 bg-white border border-[#EAE7DC] rounded-[40px] p-12 text-center shadow-sm">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill="#D68B2A"
                color="#D68B2A"
              />
            ))}
          </div>

          <h3 className="text-4xl font-light text-slate-900">
            Rated 4.9/5 By Thousands Of Happy Clients
          </h3>

          <p className="max-w-2xl mx-auto mt-4 text-slate-500">
            Trusted for bridal makeovers, luxury facials, hair styling,
            skincare treatments, and professional grooming services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
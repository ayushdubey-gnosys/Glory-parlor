import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import womenVideo from "../../assets/for-woman.mp4";
import menVideo from "../../assets/for-man.mp4";
import facialImg from "../../assets/facial.avif";
import hairWomanImg from "../../assets/hair-woman.avif";
import manSalonImg from "../../assets/man-salon.avif";
import hairManImg from "../../assets/hair-man.avif";

const GenderSection = () => {
  const { user } = useAuth();

  return (
    <section
      id="gender"
      className="bg-gradient-to-b from-[#F8F6EF] to-white py-14 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[4px] text-xs font-semibold text-[#D68B2A] mb-4">
            Tailored Beauty Experiences
          </p>

          <h2 className="text-5xl md:text-6xl font-light text-slate-900">
            Beauty & Grooming
          </h2>

          <h2 className="text-5xl md:text-6xl italic font-light text-[#D68B2A] mt-2">
            For Everyone
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-500 leading-relaxed text-lg">
            Whether you're preparing for a wedding, a special occasion, or
            simply investing in self-care, our expert professionals provide
            personalized beauty and grooming experiences tailored to your
            unique style.
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-[1500px] mx-auto px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 pb-8">
        {/* WOMEN CARD */}
        <div className="group bg-white/90 backdrop-blur-xl overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-700 border border-slate-100 flex flex-col">
          {/* Video Section */}
          <div className="relative aspect-video w-full overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              >
                <source src={womenVideo} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute top-6 right-6">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
                  <Sparkles size={14} />
                  Premium Care
                </div>
              </div>

              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  ✦ For Her
                </span>

                <h3 className="mt-4 text-5xl font-light leading-tight">
                  Women's
                  <br />
                  Luxury Care
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <p className="text-slate-500 leading-relaxed">
                Discover premium beauty treatments designed to enhance your
                confidence and elegance. From bridal makeovers to advanced
                skincare therapies, we create unforgettable beauty
                experiences.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Bridal Makeup",
                  "Facials",
                  "Hair Color",
                  "Nail Art",
                  "Spa Therapy",
                    "Spa Therapy",
                  "Mehendi",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-[#FDF4E7] text-[#D68B2A] px-4 py-2 rounded-full text-sm font-light"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 border-y border-slate-100 py-6">
                <div>
                  <h4 className="text-3xl font-light text-slate-900">
                    5000+
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Happy Clients
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl font-light text-slate-900">20+</h4>
                  <p className="text-xs text-slate-500 mt-1">Services</p>
                </div>

                <div>
                  <h4 className="text-3xl font-light text-slate-900">4.9★</h4>
                  <p className="text-xs text-slate-500 mt-1">Rating</p>
                </div>
              </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4 mt-8 mb-10">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={facialImg}
                  alt="Women's Service"
                  className="h-48 lg:h-64 w-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hairWomanImg}
                  alt="Women's Service"
                  className="h-48 lg:h-64 w-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>

              {/* Button */}
              <Link
                to={
                  user
                    ? "/appointments/book"
                    : "/register?redirect=/appointments/book"
                }
                className="inline-flex bg-gradient-to-b from-yellow-600 to-yellow-800  items-center justify-center w-fit self-start gap-2 mt-auto px-7 py-4 rounded-xl text-white font-light transition hover:scale-105"
               
              >
                Explore Women's Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        {/* MEN CARD */}
        <div className="group bg-white/90 backdrop-blur-xl overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-700 border border-slate-100 flex flex-col">
          {/* Video Section */}
          <div className="relative aspect-video w-full overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              >
                <source src={menVideo} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute top-6 right-6">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
                  <Sparkles size={14} />
                  Luxury Grooming
                </div>
              </div>

              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  ✦ For Him
                </span>

                <h3 className="mt-4 text-5xl font-light leading-tight">
                  Men's
                  <br />
                  Grooming Studio
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <p className="text-slate-500 leading-relaxed">
                Modern grooming solutions crafted for today's gentleman.
                Experience precision haircuts, beard styling, skin
                treatments, and premium relaxation services.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Hair Styling",
                  "Beard Sculpting",
                  "Skin Cleanup",
                  "Hair Color",
                  "Facials",
                  "Head Massage",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-[#FDF4E7] text-[#D68B2A] px-4 py-2 rounded-full text-sm font-light"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 border-y border-slate-100 py-6">
                <div>
                  <h4 className="text-3xl font-light text-slate-900">
                    4000+
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Happy Clients
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl font-light text-slate-900">15+</h4>
                  <p className="text-xs text-slate-500 mt-1">Services</p>
                </div>

                <div>
                  <h4 className="text-3xl font-light text-slate-900">4.8★</h4>
                  <p className="text-xs text-slate-500 mt-1">Rating</p>
                </div>
              </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4 mt-8 mb-10">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={manSalonImg}
                  alt="Men's Service"
                  className="h-48 lg:h-64 w-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hairManImg}
                  alt="Men's Service"
                  className="h-48 lg:h-64 w-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>

              {/* Button */}
              <Link
                to={
                  user
                    ? "/appointments/book"
                    : "/register?redirect=/appointments/book"
                }
                className="inline-flex bg-gradient-to-b from-yellow-600 to-yellow-800 items-center justify-center w-fit self-start gap-2 mt-auto px-7 py-4 rounded-xl text-white font-light transition hover:scale-105"
              
              >
                Explore Men's Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default GenderSection;
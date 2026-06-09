import React from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import accdemyVideo from "../../assets/accdemy.mp4"

const courses = [
  {
    duration: "1 Week",
    title: "Basic Grooming Course",
    description:
      "Learn essential beauty, grooming and salon fundamentals.",
  },
  {
    duration: "1 Month",
    title: "Professional Beauty Course",
    description:
      "Hands-on training in hair styling, facials and skincare.",
  },
  {
    duration: "3 Months",
    title: "Advanced Makeup & Salon Training",
    description:
      "Master bridal makeup, hair treatments and salon management.",
  },
  {
    duration: "6 Months",
    title: "Professional Beauty Academy Program",
    description:
      "Complete beauty, grooming, makeup and business certification.",
  },
];

const AcademySection = () => {
  return (
    <section className="relative pt-10 pb-32 bg-[#faf9f5] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#D68B2A]/5 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-flex px-5 py-2 rounded-full bg-[#D68B2A]/10 text-[#D68B2A] text-xs font-bold uppercase tracking-[0.3em]">
            Beauty Academy
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-light text-neutral-900">
            Professional Salon
          </h2>

          <h2 className="text-5xl md:text-7xl italic font-medium text-[#D68B2A] mt-2">
            Training Courses
          </h2>

          <p className="mt-8 text-lg text-neutral-500 leading-relaxed">
            Build your career in the beauty industry with our certified
            training programs designed for both men and women.
          </p>
        </div>

        {/* Hero Banner */}
        <div className="mt-20 relative overflow-hidden rounded-[40px] h-[550px]">
          <img
            src="https://images.unsplash.com/photo-1717381112342-bc9c43d2db93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

          <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xl text-white">
            <span className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em]">
              Certified Academy
            </span>

            <h3 className="mt-6 text-5xl font-light leading-tight">
              Learn. Practice.
              <br />
              Get Certified.
            </h3>

            <p className="mt-6 text-white/80 text-lg">
              Industry-recognized beauty training with professional
              certification, practical sessions and career guidance.
            </p>

            <Link
              to="/courses"
              className="inline-flex shadow-lg  shadow-yellow-800 items-center gap-3 mt-8 px-8 py-4 rounded-2xl border-2 border-yellow-600 bg-transparent text-yellow-500 font-light transition-all duration-300 hover:bg-gradient-to-b hover:from-yellow-600 hover:to-yellow-800 hover:text-white"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-[30px] p-8 shadow-xl">
            <Award className="text-[#D68B2A]" size={36} />
            <h3 className="mt-5 text-2xl font-light">
              Certification
            </h3>
            <p className="mt-3 text-neutral-500">
              Receive professional course completion certificates.
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl">
            <GraduationCap className="text-[#D68B2A]" size={36} />
            <h3 className="mt-5 text-2xl font-light">
              Practical Training
            </h3>
            <p className="mt-3 text-neutral-500">
              Hands-on learning with live salon practice sessions.
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl">
            <Briefcase className="text-[#D68B2A]" size={36} />
            <h3 className="mt-5 text-2xl font-light">
              Career Support
            </h3>
            <p className="mt-3 text-neutral-500">
              Job assistance and salon business guidance.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-white rounded-[30px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex items-center gap-2 text-[#D68B2A]">
                <Clock size={18} />
                <span className="font-light">
                  {course.duration}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-light text-neutral-900">
                {course.title}
              </h3>

              <p className="mt-4 text-neutral-500 leading-relaxed">
                {course.description}
              </p>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 mt-6 text-[#D68B2A] font-light"
              >
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 relative overflow-hidden rounded-[40px] text-white p-16 text-center shadow-2xl">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={accdemyVideo}
          ></video>

          {/* Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/20 z-0"></div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-5xl font-light">
              Start Your Beauty Career Today
            </h3>

            <p className="max-w-3xl mx-auto mt-6 text-white/80 text-lg">
              Join our academy and become a certified beauty professional.
              Courses available for both men and women with flexible
              durations from 1 week to 6 months.
            </p>

            <Link
              to="/courses"
              className="inline-flex  items-center gap-3 mt-8 px-10 py-5 rounded-2xl bg-gradient-to-b from-yellow-600  to-yellow-800  text-white font-light"
            >
              Enroll Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
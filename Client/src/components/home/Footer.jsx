import React from "react";
import {
    Phone,
    Mail,
    MapPin,
    ArrowRight,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-[#444445] text-white">
            {/* Luxury Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D68B2A]/10 blur-[180px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Top CTA */}
                <div className="py-16 border-b border-white/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-light leading-tight">
                                Ready To Transform
                                <span className="block text-[#D68B2A] italic font-serif">
                                    Your Beauty Journey?
                                </span>
                            </h2>

                            <p className="mt-4 text-white/70 max-w-xl">
                                Experience luxury beauty services, professional grooming
                                and certified beauty academy training under one roof.
                            </p>
                        </div>


                    </div>
                </div>

                {/* Main Footer */}
                <div className="grid lg:grid-cols-4 gap-12 py-20">
                    {/* Brand */}
                    <div>
                        <h3 className="text-4xl font-light">
                            Astha
                            <span className="text-[#D68B2A]"> PMS</span>
                        </h3>

                        <p className="mt-6 text-white/70 leading-relaxed">
                            Premium salon, luxury grooming studio and certified beauty
                            academy offering world-class services for men and women.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-8">
                            {[
                                <FaFacebook size={18} />,
                                <FaInstagram size={18} />,
                                <FaYoutube size={18} />,
                            ].map((icon, index) => (
                                <a
                                    key={index}
                                    href="/"
                                    className="
                  w-11 h-11
                  rounded-full
                  bg-white/10
                  hover:bg-[#D68B2A]
                  flex
                  items-center
                  justify-center
                  transition
                  "
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-light mb-6">
                            Quick Links
                        </h4>

                        <ul className="space-y-4 text-white/70">
                            <li>
                                <Link to="/" className="hover:text-[#D68B2A]">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className="hover:text-[#D68B2A]">
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/services" className="hover:text-[#D68B2A]">
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link to="/products" className="hover:text-[#D68B2A]">
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" className="hover:text-[#D68B2A]">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xl font-light mb-6">
                            Services
                        </h4>

                        <ul className="space-y-4 text-white/70">
                            <li>Bridal Makeup</li>
                            <li>Hair Styling</li>
                            <li>Luxury Facials</li>
                            <li>Skin Treatments</li>
                            <li>Men's Grooming</li>
                            <li>Spa & Wellness</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xl font-light mb-6">
                            Contact Us
                        </h4>

                        <div className="space-y-5 text-white/70">
                            <div className="flex gap-3">
                                <Phone
                                    size={18}
                                    className="text-[#D68B2A] shrink-0"
                                />
                                <span>+91 98765 43210</span>
                            </div>

                            <div className="flex gap-3">
                                <Mail
                                    size={18}
                                    className="text-[#D68B2A] shrink-0"
                                />
                                <span>info@asthapms.com</span>
                            </div>

                            <div className="flex gap-3">
                                <MapPin
                                    size={18}
                                    className="text-[#D68B2A] shrink-0"
                                />
                                <span>
                                    Astha PMS Beauty Salon,
                                    Rajkot, Gujarat, India
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academy Banner */}
                <div className="border-y border-white/10 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-2xl font-light">
                                Beauty Academy Courses
                            </h3>

                            <p className="text-white/60 mt-2">
                                1 Week • 1 Month • 3 Months • 6 Months
                                Professional Certification Programs
                            </p>
                        </div>

                        <Link
                            to="/courses"
                            className="
              px-7
              py-3
              rounded-xl
              border
              border-[#D68B2A]
              text-[#D68B2A]
              hover:bg-[#D68B2A]
              hover:text-white
              transition
              "
                        >
                            View Courses
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm">
                        © 2025 Astha PMS. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 text-white/50 text-sm">
                        <Link
                            to="/privacy-policy"
                            className="hover:text-[#D68B2A]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms"
                            className="hover:text-[#D68B2A]"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
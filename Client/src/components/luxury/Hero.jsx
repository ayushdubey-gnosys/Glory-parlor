import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  'https://images.unsplash.com/photo-1542317854-0b6fcb6f7a1b?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1400&auto=format&fit=crop'
];

const Hero = () => {
  return (
    <section className="relative h-screen max-h-[920px] flex items-center">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        effect={'fade'}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        className="absolute inset-0 z-0"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-screen max-h-[920px]">
              <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating golden particles */}
      <div className="particle-wrap">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              animationDuration: `${6 + Math.random() * 12}s`,
              opacity: 0.5 + Math.random() * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="uppercase text-sm tracking-widest text-white/90 font-semibold" style={{fontFamily: 'DM Sans'}}>Luxury Beauty & Wellness</p>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white" style={{fontFamily: 'Cormorant Garamond'}}>
              Astha PMS
              <span className="block text-4xl md:text-5xl font-normal mt-2" style={{color: 'rgba(255,255,255,0.9)'}}>Premium Management System</span>
            </h1>

            <p className="mt-6 text-white/90 max-w-2xl">Experience salon services crafted with artistry, premium products, and an unmatched level of care. Book a personalised appointment or explore our world-class treatments.</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium shadow-lg" style={{background: 'linear-gradient(135deg,#B58D4A,#967133)'}}>
                Book Appointment <ArrowRight size={16} />
              </Link>
              <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 text-dark-slate shadow-sm">View Services</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="hidden lg:block">
            <div className="glass-card rounded-2xl p-6 shadow-xl max-w-md ml-auto">
              <h4 className="text-sm uppercase tracking-widest text-slate-700">Exclusive Offer</h4>
              <p className="mt-3 text-slate-900 text-lg font-medium">Complimentary scalp massage with any premium hair treatment booked this month.</p>
              <div className="mt-5 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1533777324565-a040eb52fac2?q=80&w=200&auto=format&fit=crop" alt="therapist" className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-semibold">Book by Phone</div>
                  <div className="text-xs text-slate-500">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { title: 'Hair Styling', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
  { title: 'Bridal Makeup', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop' },
  { title: 'Skin Care', img: 'https://images.unsplash.com/photo-1542317854-0b6fcb6f7a1b?q=80&w=800&auto=format&fit=crop' },
  { title: 'Spa & Wellness', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop' },
  { title: 'Nail Art', img: 'https://images.unsplash.com/photo-1543168256-418811576e6f?q=80&w=800&auto=format&fit=crop' },
  { title: 'Beauty Academy', img: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?q=80&w=800&auto=format&fit=crop' },
];

const Services = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="uppercase text-sm tracking-widest text-amber-600 font-semibold">Our Services</p>
        <h3 className="text-3xl md:text-4xl font-semibold mt-4">Signature Treatments & Specialist Care</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div whileHover={{ y: -8, scale: 1.02 }} key={i} className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="relative h-52 overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold">{s.title}</h4>
              <p className="text-sm text-slate-500 mt-2">Luxury service tailored to your needs with certified professionals and premium products.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Services;

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.img initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" alt="luxury salon" className="rounded-2xl shadow-md w-full h-[520px] object-cover" />

        <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
          <p className="uppercase text-sm tracking-widest text-amber-600 font-semibold">About Astha PMS</p>
          <h2 className="text-4xl md:text-5xl font-semibold mt-4" style={{fontFamily: 'Cormorant Garamond'}}>A Sanctuary For Luxury & Pampering</h2>
          <p className="mt-6 text-slate-600">At Astha PMS we curate bespoke beauty journeys. From luxurious bridal transformations to restorative skin therapies, every service is delivered with artisanal attention to detail using premium formulations.</p>

          <ul className="mt-6 space-y-3 text-slate-600">
            <li>• Personalized consultations with certified experts</li>
            <li>• World-class, cruelty-free premium product lines</li>
            <li>• Hygiene-first procedures and single-use disposables</li>
          </ul>

          <div className="mt-8 flex gap-4">
            <a href="#services" className="px-6 py-3 rounded-xl bg-amber-600 text-white">Explore Services</a>
            <a href="#gallery" className="px-6 py-3 rounded-xl bg-white border">View Gallery</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-2xl p-12 text-center" style={{background: 'linear-gradient(135deg, rgba(181,141,74,0.12), rgba(255,255,255,0.06))'}}>
        <h3 className="text-3xl font-semibold">Ready for a Transformation?</h3>
        <p className="text-slate-600 mt-4">Book your appointment with our expert stylists and enjoy a complimentary consultation.</p>

        <motion.div whileHover={{ scale: 1.03 }} className="mt-8">
          <Link to="/register" className="inline-block px-8 py-4 rounded-full text-white font-semibold shadow-2xl" style={{background: 'linear-gradient(135deg,#B58D4A,#967133)'}}>
            Book Your Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA;

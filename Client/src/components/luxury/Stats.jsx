import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const items = [
  { value: 10000, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Treatments' },
  { value: 12, suffix: '+', label: 'Expert Stylists' },
  { value: 4.9, suffix: '/5', label: 'Rating' },
];

const Stats = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div key={i} whileHover={{ y: -6 }} className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-4xl font-semibold text-amber-600">
              <CountUp end={it.value} duration={2.5} decimals={it.value % 1 !== 0 ? 1 : 0} />{it.suffix}
            </div>
            <div className="text-xs text-slate-500 uppercase mt-2 tracking-wider">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Stats;

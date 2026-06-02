import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';

SwiperCore.use([Autoplay, Pagination]);

const items = [
  { text: 'The bridal makeup was beyond my expectations. Flawless and long-lasting!', author: 'R. Mehta' },
  { text: 'Professional and warm staff. My hair looked incredible after the treatment.', author: 'S. Kapoor' },
  { text: 'Pristine hygiene and premium products. Highly recommended!', author: 'N. Shah' },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="uppercase text-sm tracking-widest text-amber-600 font-semibold">Testimonials</p>
        <h3 className="text-3xl md:text-4xl font-semibold mt-4">What Clients Say</h3>
      </div>

      <Swiper slidesPerView={1} spaceBetween={20} autoplay={{delay:4000}} pagination={{ clickable: true }} className="max-w-4xl mx-auto">
        {items.map((it, idx) => (
          <SwiperSlide key={idx}>
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="text-amber-600" />)}
              </div>
              <p className="text-slate-700 italic">"{it.text}"</p>
              <div className="mt-6 text-sm font-semibold">{it.author}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials;

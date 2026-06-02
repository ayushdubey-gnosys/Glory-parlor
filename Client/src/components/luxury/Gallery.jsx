import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542317854-0b6fcb6f7a1b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505245208761-ba872912fac0?q=80&w=1200&auto=format&fit=crop'
];

const Gallery = () => {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="uppercase text-sm tracking-widest text-amber-600 font-semibold">Luxury Gallery</p>
        <h3 className="text-3xl md:text-4xl font-semibold mt-4">Moments of Beauty</h3>
      </div>

      <div className="masonry">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`gallery-${i}`} className="hover:scale-105 transition-transform duration-500 shadow-md" />
        ))}
      </div>
    </section>
  )
}

export default Gallery;

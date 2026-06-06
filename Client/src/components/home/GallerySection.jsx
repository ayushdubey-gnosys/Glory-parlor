import React from "react";

const GallerySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="dm uppercase tracking-[3px] text-xs font-semibold gold-text mb-4">Our Ambience</p>
        <h2 className="text-4xl font-light text-slate-900">Inside The Parlor</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
        ].map((url, i) => (
          <div key={i} className="gallery-img-wrap">
            <img src={url} alt="Parlor Ambience" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;

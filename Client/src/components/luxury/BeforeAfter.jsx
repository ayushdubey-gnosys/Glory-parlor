import React, { useState, useRef, useEffect } from 'react';

const BeforeAfter = ({ before, after }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef();

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      let p = ((x - rect.left) / rect.width) * 100;
      p = Math.max(5, Math.min(95, p));
      setPos(p);
    };
    const onUp = () => window.removeEventListener('mousemove', onMove);
    containerRef.current.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      if (containerRef.current) containerRef.current.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div className="ba-wrap" ref={containerRef} style={{height: 420}}>
      <img src={before} alt="before" className="w-full h-full object-cover ba-before rounded-2xl" />
      <div className="ba-after rounded-2xl" style={{width: `${pos}%`}}>
        <img src={after} alt="after" className="w-full h-full object-cover" />
      </div>
      <div className="ba-divider" style={{left: `${pos}%`}} />
    </div>
  )
}

export default BeforeAfter;

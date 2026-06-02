import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-white/60 backdrop-blur-md border-b border-slate-200/30 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[rgba(181,141,74,0.15)] to-[rgba(181,141,74,0.05)] flex items-center justify-center border border-white/30 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.5 8.5L21 10L16 14.5L17.5 21L12 17.5L6.5 21L8 14.5L3 10L9.5 8.5L12 2Z" fill="#B58D4A" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold" style={{fontFamily: 'Cormorant Garamond'}}>Astha PMS</div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Premium Management System</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="text-slate-700 hover:text-slate-900">Services</a>
          <a href="#about" className="text-slate-700 hover:text-slate-900">About</a>
          <a href="#gallery" className="text-slate-700 hover:text-slate-900">Gallery</a>
          <a href="#testimonials" className="text-slate-700 hover:text-slate-900">Reviews</a>
        </nav>

        {/* Authentication actions removed for customer-facing site */}

        <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-slate-200/30">
          <div className="px-6 py-6 space-y-3">
            <a href="#services" className="block py-2">Services</a>
            <a href="#about" className="block py-2">About</a>
            <a href="#gallery" className="block py-2">Gallery</a>
            <a href="#testimonials" className="block py-2">Reviews</a>
            {/* login/register removed for customer side */}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar;

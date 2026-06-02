import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-lg font-semibold" style={{fontFamily: 'Cormorant Garamond'}}>Astha PMS</div>
          <div className="text-sm text-slate-600 mt-2">Premium Beauty Salon</div>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <div className="flex items-center gap-2 mt-2 text-slate-600"><Phone />+91 98765 43210</div>
          <div className="flex items-center gap-2 mt-1 text-slate-600"><Mail />hello@astha-pms.com</div>
        </div>

        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex gap-3 mt-3">
            <a className="p-2 rounded-lg bg-white border"><Facebook /></a>
            <a className="p-2 rounded-lg bg-white border"><Instagram /></a>
            <a className="p-2 rounded-lg bg-white border"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-slate-500">© {new Date().getFullYear()} Astha PMS — All rights reserved</div>
    </footer>
  )
}

export default Footer;

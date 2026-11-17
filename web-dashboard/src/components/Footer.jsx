import React from 'react';
import { ExternalLink, Youtube, Instagram, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 lg:px-8 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Lab Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
            <img src="/logo_keren.png" alt="STAS-RG" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-slate-300">STAS-RG (Smart Transportation and Automation System)</span>
            <p className="text-[11px] text-slate-500">Telkom University • Precision Livestock IoT Project</p>
          </div>
        </div>

        {/* Social & Web Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a 
            href="https://tuvv.telkomuniversity.ac.id/stas-rg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-400 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website Lab</span>
          </a>
          <a 
            href="https://www.youtube.com/@stas_rg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-rose-400 transition"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </a>
          <a 
            href="https://www.instagram.com/stas.rg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-pink-400 transition"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </div>

      </div>
    </footer>
  );
}

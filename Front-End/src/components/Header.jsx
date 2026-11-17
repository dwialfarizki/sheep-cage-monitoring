import React, { useState, useEffect } from 'react';
import { Radio, Wifi, WifiOff, RefreshCw, ShieldAlert, Clock, Sparkles } from 'lucide-react';

export default function Header({ isDemoMode, setIsDemoMode, sheepCount, activeAlerts }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Lab Identity */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative w-11 h-11 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-lg border border-slate-700/50">
              <img src="/logo_keren.png" alt="STAS-RG Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-sans">
                STAS<span className="text-emerald-400 font-black">-</span>RG
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Precision IoT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Smart Sheep Cage Monitoring & Telemetry</p>
          </div>
        </div>

        {/* Real-time Status Badges & Mode Switcher */}
        <div className="flex items-center flex-wrap gap-2.5 md:gap-4 w-full md:w-auto justify-end">
          
          {/* Gateway Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-mono font-medium">ESP32 Gateway:</span>
            <span className="text-emerald-400 font-semibold font-mono">ONLINE (-62 dBm)</span>
          </div>

          {/* Clock Widget */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{formattedDate} • {formattedTime} WIB</span>
          </div>

          {/* Data Source Selector (Demo vs Live API) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isDemoMode
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Demo Data
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !isDemoMode
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Live API
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}

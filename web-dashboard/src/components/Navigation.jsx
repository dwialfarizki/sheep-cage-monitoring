import React from 'react';
import { LayoutDashboard, Activity, Tag, Cpu } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard, desc: 'Ringkasan Eksekutif & Kandang' },
    { id: 'telemetry', label: 'Telemetri Sensor', icon: Activity, desc: 'AHT, Loadcell, MPU-6050, Kamera' },
    { id: 'passport', label: 'Paspor Domba', icon: Tag, desc: 'Database RFID & Profil Ternak' },
    { id: 'hardware', label: 'Hardware & Gateway', icon: Cpu, desc: 'Diagnostik ESP32 & Payload' },
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex space-x-1 md:space-x-4 overflow-x-auto py-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700/80 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

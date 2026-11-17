import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Thermometer, Droplets, Scale, Wheat, Activity, Layers } from 'lucide-react';
import { telemetryTrend24h, weightGrowthData } from '../data/mockData';

export default function SensorTelemetry() {
  const [activeSubTab, setActiveSubTab] = useState('climate');

  return (
    <div className="space-y-6">
      
      {/* Sub-tab selection */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Telemetri Multi-Sensor Presisi</h2>
          <p className="text-xs text-slate-400 mt-0.5">Analisis instrumen sensor IoT kandang domba STAS-RG</p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('climate')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'climate' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Iklim Mikro (AHT)
          </button>
          <button
            onClick={() => setActiveSubTab('weight')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'weight' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Bobot (Loadcell)
          </button>
          <button
            onClick={() => setActiveSubTab('feed')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'feed' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            Pakan & Gerak MPU
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CLIMATE (AHT10 & THI INDEX) */}
      {activeSubTab === 'climate' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  Grafik Suhu & Kelembaban Relatif (24 Jam Terakhir)
                </h3>
                <p className="text-xs text-slate-400">Data telemetri dari sensor AHT10 di palang utama kandang</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Suhu (°C)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Kelembaban (% RH)
                </span>
              </div>
            </div>

            <div className="h-72 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryTrend24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="jam" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[15, 95]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="suhu" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#tempGradient)" name="Suhu (°C)" />
                  <Area type="monotone" dataKey="kelembaban" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#humGradient)" name="Kelembaban (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* THI Evaluation Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">SUHU MINIMUM (DINI HARI)</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">23.8 °C</div>
              <span className="text-xs text-slate-400 mt-1 block">Tercatat pukul 03:00 WIB</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">SUHU PUNCAK (SIANG)</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">30.2 °C</div>
              <span className="text-xs text-slate-400 mt-1 block">Tercatat pukul 12:00 WIB</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">RATA-RATA THI KANDANG</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">75.2 (Nyaman)</div>
              <span className="text-xs text-emerald-400/90 mt-1 block">Dalam batas toleransi fisiologis domba</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WEIGHT PROGRESSION (LOADCELL BADAN) */}
      {activeSubTab === 'weight' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Kurva Pertumbuhan Bobot Mingguan (ADG Tracker)
              </h3>
              <p className="text-xs text-slate-400">Pertambahan bobot 5 ekor domba dalam 5 minggu terakhir</p>
            </div>
          </div>

          <div className="h-80 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="minggu" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[30, 50]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Bima" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Dewi" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Gatotkaca" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Srikandi" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Antareja" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FEED & IMU ACTIVITY */}
      {activeSubTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Feed Intake Bar Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white tracking-tight mb-2 flex items-center gap-2">
              <Wheat className="w-4 h-4 text-amber-400" /> Konsumsi Pakan per Jam (KG)
            </h3>
            <p className="text-xs text-slate-400 mb-6">Diukur via Loadcell Palungan Pakan</p>
            <div className="h-64 font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={telemetryTrend24h}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="jam" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Bar dataKey="pakan_kg" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Pakan (KG)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MPU-6050 Motion Trend */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white tracking-tight mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> Tingkat Gerak Kawanan (MPU Vector)
            </h3>
            <p className="text-xs text-slate-400 mb-6">Rata-rata magnitudo pergerakan dari kalung accelerometer</p>
            <div className="h-64 font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryTrend24h}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="jam" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="gerak_xyz" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} name="Gerak (g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

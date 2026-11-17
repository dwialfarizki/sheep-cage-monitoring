import React, { useState } from 'react';
import { 
  Scale, 
  Thermometer, 
  Droplets, 
  Activity, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Layers, 
  Camera, 
  ArrowUpRight,
  TrendingUp,
  HeartPulse,
  Wheat
} from 'lucide-react';
import { calculateTHI, getTHIStatus, mpuActivityBreakdown, initialSheep } from '../data/mockData';

export default function CommandCenter({ sheepList, onSelectSheep }) {
  const [activeSheepOnScale, setActiveSheepOnScale] = useState(sheepList[0] || initialSheep[0]);
  
  // Current environmental readings from AHT
  const currentTemp = 28.4;
  const currentHum = 64.0;
  const thiValue = calculateTHI(currentTemp, currentHum);
  const thiStatus = getTHIStatus(thiValue);

  // Feed trough current loadcell
  const feedRemainingKg = 12.8;
  const feedCapacityKg = 25.0;
  const feedPercent = Math.round((feedRemainingKg / feedCapacityKg) * 100);

  return (
    <div className="space-y-6">

      {/* TOP ROW: Real-time Operational Critical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: THI Heat Stress Index */}
        <div className={`p-5 rounded-2xl bg-slate-900 border ${thiStatus.border} relative overflow-hidden flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cekaman Panas (THI)</span>
            <div className={`p-2 rounded-xl ${thiStatus.bg}`}>
              <Flame className={`w-4 h-4 ${thiStatus.color}`} />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">{thiValue}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${thiStatus.bg} ${thiStatus.color}`}>
                {thiStatus.level.split(' ')[0]}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{thiStatus.desc}</p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-amber-400" /> {currentTemp}°C</span>
            <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-cyan-400" /> {currentHum}% RH</span>
          </div>
        </div>

        {/* Metric 2: Live Active Scale Reading */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stasiun Timbang Aktif</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-3xl font-extrabold text-white">{activeSheepOnScale.berat}</span>
              <span className="text-slate-400 font-medium text-sm">KG</span>
              <span className="text-xs text-emerald-400 font-sans ml-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +0.8 kg/mgg
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1 truncate">
              {activeSheepOnScale.nama_domba} ({activeSheepOnScale.id})
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> RFID Terkunci
            </span>
            <span className="text-slate-500">{activeSheepOnScale.terakhir_timbang}</span>
          </div>
        </div>

        {/* Metric 3: Feed Trough Inventory (Loadcell Pakan) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Palungan Pakan</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Wheat className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-extrabold text-white">{feedRemainingKg}</span>
              <span className="text-slate-400 font-medium text-sm">/ {feedCapacityKg} KG</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  feedPercent > 30 ? 'bg-amber-400' : 'bg-rose-500'
                }`}
                style={{ width: `${feedPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Sisa kapasitas: {feedPercent}%</span>
            <span className="text-amber-400 font-medium">Konsumsi normal</span>
          </div>
        </div>

        {/* Metric 4: Herd Health Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status Populasi</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{sheepList.length}</span>
              <span className="text-slate-400 font-medium text-sm">Ekor Domba</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                <CheckCircle2 className="w-3 h-3" /> {sheepList.filter(s => s.status_kesehatan === 'Optimal').length} Optimal
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                <AlertTriangle className="w-3 h-3" /> {sheepList.filter(s => s.status_kesehatan !== 'Optimal').length} Observasi
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Blok Kandang: A & B</span>
            <span className="text-cyan-400 font-medium">Sinkron</span>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION: Live Scale & Morphometrics Booth vs Behavioral Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Weighing & Morphometrics Booth (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <h3 className="text-lg font-bold text-white tracking-tight">Stasiun Timbang & Morfometrik Kamera</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Sinkronisasi otomatis antara Tag RFID, Loadcell Badan, dan Kamera Dimensi</p>
            </div>

            {/* Selector to simulate different sheep on platform */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Pilih Domba di Platform:</span>
              <select 
                value={activeSheepOnScale.id}
                onChange={(e) => {
                  const s = sheepList.find(item => item.id === e.target.value);
                  if (s) setActiveSheepOnScale(s);
                }}
                className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-1.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sheepList.map(s => (
                  <option key={s.id} value={s.id}>{s.nama_domba} ({s.id})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Visual Booth Box */}
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl border border-slate-800/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Sheep Graphic with Morphometrics Dimensions */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 w-full">
              <div className="relative p-6 bg-slate-900/60 rounded-2xl border border-slate-800 w-full max-w-sm flex flex-col items-center">
                
                {/* RFID badge floating above */}
                <div className="absolute -top-3 px-3 py-1 rounded-full bg-slate-800 border border-emerald-500/40 text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeSheepOnScale.rfid_tag}
                </div>

                {/* Sheep icon illustration */}
                <div className="my-6 text-center">
                  <div className="text-6xl select-none filter drop-shadow">🐑</div>
                  <h4 className="text-base font-bold text-white mt-2">{activeSheepOnScale.nama_domba}</h4>
                  <p className="text-xs text-slate-400">{activeSheepOnScale.ras} • {activeSheepOnScale.usia_bulan} Bulan ({activeSheepOnScale.jenis_kelamin})</p>
                </div>

                {/* Camera Dimensions Overlay */}
                <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="bg-slate-950/70 p-2 rounded-lg text-center border border-slate-800/60">
                    <span className="text-slate-500 block text-[10px]">PANJANG BADAN</span>
                    <span className="text-cyan-400 font-bold">{activeSheepOnScale.panjang_cm} cm</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-lg text-center border border-slate-800/60">
                    <span className="text-slate-500 block text-[10px]">TINGGI PUNDAK</span>
                    <span className="text-cyan-400 font-bold">{activeSheepOnScale.tinggi_cm} cm</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Live Digital Scale Telemetry Readout */}
            <div className="w-full md:w-64 flex flex-col gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-inner">
                <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase block">LOADCELL BADAN (STABLE)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">{activeSheepOnScale.berat}</span>
                  <span className="text-slate-400 font-mono text-base">KG</span>
                </div>
                <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                  <span>Target Potong:</span>
                  <span className="font-mono text-slate-200 font-semibold">{activeSheepOnScale.target_berat} KG</span>
                </div>
                {/* Progress bar towards harvest weight */}
                <div className="w-full bg-slate-900 h-2 rounded-full mt-1.5 overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((activeSheepOnScale.berat / activeSheepOnScale.target_berat) * 100))}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500 text-right block mt-1">
                  {Math.round((activeSheepOnScale.berat / activeSheepOnScale.target_berat) * 100)}% dari target
                </span>
              </div>

              {/* Quick Action Button to see passport */}
              <button 
                onClick={() => onSelectSheep(activeSheepOnScale)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <span>Buka Paspor Domba Lengkap</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

          </div>
        </div>

        {/* Behavioral Activity Tracker (MPU-6050) (1 Column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Klasifikasi Gerak MPU
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Analisis accelerometer & gyro 24 jam</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono border border-slate-700">
                MPU-6050
              </span>
            </div>

            {/* Activity distribution bars */}
            <div className="space-y-4 my-6">
              {mpuActivityBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-white">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical summary insight */}
          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs">
            <span className="font-bold text-emerald-400 block mb-0.5">Status Perilaku Normal</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Tingkat memamah biak (rumination) berada di angka 58%, menandakan sistem pencernaan dan kenyamanan kawanan domba dalam kondisi sehat.
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Flock Quick Status Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Katalog Ternak & Status Terkini</h3>
            <p className="text-xs text-slate-400">Ringkasan kondisi setiap domba di kandang berdasarkan sensor IoT</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 Ekor Terdaftar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {sheepList.map((sheep) => (
            <div
              key={sheep.id}
              onClick={() => onSelectSheep(sheep)}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-slate-400 text-[10px]">{sheep.id}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    sheep.status_kesehatan === 'Optimal' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {sheep.status_kesehatan}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition truncate">
                  {sheep.nama_domba}
                </h4>
                <p className="text-[11px] text-slate-400">{sheep.ras}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-lg font-extrabold text-white">{sheep.berat}</span>
                  <span className="text-slate-400 text-xs ml-0.5">kg</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {sheep.pakan_harian_gram}g/hr
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

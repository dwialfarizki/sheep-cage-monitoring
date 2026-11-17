import React, { useState } from 'react';
import { Tag, Scale, Camera, Wheat, CheckCircle2, AlertTriangle, Eye, X, Award, MapPin } from 'lucide-react';

export default function SheepPassport({ sheepList, selectedSheep, onSelectSheep }) {
  const [modalSheep, setModalSheep] = useState(selectedSheep || null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" /> Paspor Digital & Database RFID
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Identitas digital dan rekam medis individual setiap domba ternak</p>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Total Terdaftar: <span className="text-white font-bold">{sheepList.length} Ekor</span>
        </div>
      </div>

      {/* Grid of Passport Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sheepList.map((sheep) => {
          const harvestPercent = Math.min(100, Math.round((sheep.berat / sheep.target_berat) * 100));
          return (
            <div
              key={sheep.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-emerald-500/5"
            >
              <div>
                {/* Header Tag & Health Status */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700/80">
                    {sheep.rfid_tag}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    sheep.status_kesehatan === 'Optimal'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {sheep.status_kesehatan}
                  </span>
                </div>

                {/* Name & Breed */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700/60">
                    🐑
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition">
                      {sheep.nama_domba}
                    </h3>
                    <p className="text-xs text-slate-400">{sheep.ras} • {sheep.jenis_kelamin}</p>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-medium block">BOBOT TERKINI</span>
                    <span className="text-base font-extrabold font-mono text-emerald-400">{sheep.berat} kg</span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-medium block">PAKAN HARIAN</span>
                    <span className="text-base font-extrabold font-mono text-amber-400">{sheep.pakan_harian_gram} g</span>
                  </div>
                </div>

                {/* Target Harvest Weight Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Target Panen ({sheep.target_berat} kg)</span>
                    <span className="font-mono text-emerald-400 font-semibold">{harvestPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${harvestPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* View Passport Button */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {sheep.lokasi_kandang}
                </span>
                <button
                  onClick={() => setModalSheep(sheep)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> Detail Paspor
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* INDIVIDUAL SHEEP PASSPORT MODAL */}
      {modalSheep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Paspor Ternak Domba Presisi (STAS-RG)</h3>
              </div>
              <button 
                onClick={() => setModalSheep(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl border border-slate-700">
                  🐑
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-white">{modalSheep.nama_domba}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Chip ID: {modalSheep.id} | RFID: {modalSheep.rfid_tag}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Ras: {modalSheep.ras}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                      Usia: {modalSheep.usia_bulan} Bulan ({modalSheep.jenis_kelamin})
                    </span>
                  </div>
                </div>
              </div>

              {/* Sensor Measurements Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">BOBOT SAAT INI</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 mt-1 block">{modalSheep.berat} KG</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">PANJANG BADAN</span>
                  <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">{modalSheep.panjang_cm} CM</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">TINGGI PUNDAK</span>
                  <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">{modalSheep.tinggi_cm} CM</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">KONSUMSI PAKAN</span>
                  <span className="text-lg font-bold font-mono text-amber-400 mt-1 block">{modalSheep.pakan_harian_gram} g/hr</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">SUHU BADAN (AHT)</span>
                  <span className="text-lg font-bold font-mono text-white mt-1 block">{modalSheep.suhu} °C</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">AKTIVITAS DOMINAN</span>
                  <span className="text-xs font-bold text-emerald-400 mt-1.5 block truncate">{modalSheep.aktivitas_dominan}</span>
                </div>
              </div>

              {/* Veterinary & Management Record */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">Catatan Peternak / Peneliti:</span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Pertumbuhan bobot konsisten (+0.8 kg/minggu). Toleransi iklim mikro kandang sangat baik. Dijadwalkan vaksinasi booster bulan depan.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModalSheep(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Tutup Paspor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

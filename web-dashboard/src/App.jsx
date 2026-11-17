import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Thermometer, 
  Droplets, 
  Scale, 
  Wheat, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Radio, 
  X,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { initialSheep, telemetryTrend24h, weightGrowthData } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSheep, setSelectedSheep] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('id-ID', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });
  const formattedClock = currentTime.toLocaleTimeString('id-ID', { 
    hour: '2-digit', minute: '2-digit' 
  });

  const filteredSheep = initialSheep.filter(s => 
    s.nama_domba.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.ras.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* 1. SIDEBAR KIRI (BERSIH & RAPI) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Brand STAS-RG */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
              <img src="/logo_keren.png" alt="STAS-RG" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
                  STAS<span className="text-emerald-500">-</span>RG
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                  IoT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Monitoring Kandang</p>
            </div>
          </div>

          {/* Navigasi Menu Sederhana */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'overview' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Dashboard Utama</span>
            </button>

            <button
              onClick={() => setActiveTab('sheep')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'sheep'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'sheep' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Data Domba</span>
            </button>

            <button
              onClick={() => setActiveTab('sensors')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'sensors'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Activity className={`w-4 h-4 ${activeTab === 'sensors' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Grafik Sensor</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gateway ESP32: <strong>Online</strong></span>
          </div>

          <a
            href="https://tuvv.telkomuniversity.ac.id/stas-rg/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-emerald-600 transition pt-1"
          >
            <span>Lab STAS-RG Telkom Univ</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* 2. AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {activeTab === 'overview' && 'Ringkasan Monitoring Kandang'}
              {activeTab === 'sheep' && 'Daftar & Paspor Domba'}
              {activeTab === 'sensors' && 'Grafik & Riwayat Sensor'}
            </h2>
            <p className="text-xs text-slate-500">{formattedDate} • {formattedClock} WIB</p>
          </div>

          {/* Toggle Mode: Demo / Backend */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                isDemoMode ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Mode Demo
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                !isDemoMode ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-500" />
              Live Backend
            </button>
          </div>
        </header>

        {/* Konten Halaman */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          
          {/* ================= TAB 1: OVERVIEW / DASHBOARD UTAMA ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Kartu Metrik Utama yang Bersih */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Suhu Kandang */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Suhu Kandang</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">28.4</span>
                      <span className="text-slate-500 text-sm font-medium">°C</span>
                    </div>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Normal / Sejuk
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Thermometer className="w-6 h-6" />
                  </div>
                </div>

                {/* 2. Kelembaban Udara */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Kelembaban</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">64</span>
                      <span className="text-slate-500 text-sm font-medium">%</span>
                    </div>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
                      Optimal (Nyaman)
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Droplets className="w-6 h-6" />
                  </div>
                </div>

                {/* 3. Rata-rata Bobot Domba */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Rata-rata Bobot</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">40.9</span>
                      <span className="text-slate-500 text-sm font-medium">kg</span>
                    </div>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      ▲ +0.8 kg/mgg
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Scale className="w-6 h-6" />
                  </div>
                </div>

                {/* 4. Sisa Pakan */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Stok Pakan</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">12.8</span>
                      <span className="text-slate-500 text-sm font-medium">kg</span>
                    </div>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Kapasitas 51%
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Wheat className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Grafik Simpel & Bersih: Suhu & Kelembaban */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Grafik Suhu & Kelembaban Harian</h3>
                    <p className="text-xs text-slate-500">Pemantauan iklim mikro kandang domba selama 24 jam</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-amber-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Suhu (°C)
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Kelembaban (%)
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetryTrend24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="jam" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[15, 90]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="suhu" stroke="#f59e0b" strokeWidth={2} fill="#fef3c7" fillOpacity={0.5} name="Suhu (°C)" />
                      <Area type="monotone" dataKey="kelembaban" stroke="#06b6d4" strokeWidth={2} fill="#cffafe" fillOpacity={0.4} name="Kelembaban (%)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Data Domba Terkini */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Daftar Domba di Kandang</h3>
                    <p className="text-xs text-slate-500">Status timbangan dan kesehatan fisik terkini</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('sheep')}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3.5">Nama Domba</th>
                        <th className="px-5 py-3.5">Chip ID</th>
                        <th className="px-5 py-3.5">Jenis Kelamin</th>
                        <th className="px-5 py-3.5">Usia</th>
                        <th className="px-5 py-3.5">Berat</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {initialSheep.slice(0, 4).map((sheep) => (
                        <tr key={sheep.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-lg">🐑</span>
                            <span>{sheep.nama_domba}</span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{sheep.id}</td>
                          <td className="px-5 py-3.5">{sheep.jenis_kelamin === 'Male' ? 'Jantan' : 'Betina'}</td>
                          <td className="px-5 py-3.5">{sheep.usia_bulan} Bulan</td>
                          <td className="px-5 py-3.5 font-bold font-mono text-slate-900">{sheep.berat} kg</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              sheep.status_kesehatan === 'Optimal'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {sheep.status_kesehatan === 'Optimal' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {sheep.status_kesehatan}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => setSelectedSheep(sheep)}
                              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 px-3 py-1 rounded-lg hover:bg-emerald-50 transition"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: DATA DOMBA ================= */}
          {activeTab === 'sheep' && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari domba berdasarkan nama, Chip ID, atau ras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm outline-none text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Grid Kartu Domba yang Rapi */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSheep.map((sheep) => (
                  <div 
                    key={sheep.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {sheep.id}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          sheep.status_kesehatan === 'Optimal'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {sheep.status_kesehatan}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                          🐑
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{sheep.nama_domba}</h4>
                          <p className="text-xs text-slate-500">{sheep.ras} • {sheep.jenis_kelamin === 'Male' ? 'Jantan' : 'Betina'} ({sheep.usia_bulan} Bln)</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">BOBOT</span>
                          <span className="text-base font-bold font-mono text-slate-900">{sheep.berat} kg</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">PAKAN HARIAN</span>
                          <span className="text-base font-bold font-mono text-slate-900">{sheep.pakan_harian_gram} g</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedSheep(sheep)}
                      className="mt-4 w-full py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold text-slate-700 transition"
                    >
                      Buka Profil Lengkap
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: GRAFIK SENSOR ================= */}
          {activeTab === 'sensors' && (
            <div className="space-y-6">
              
              {/* Grafik Pertumbuhan Berat */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900">Perkembangan Bobot Domba Mingguan (Loadcell)</h3>
                  <p className="text-xs text-slate-500">Kenaikan bobot 5 ekor domba selama 5 minggu terakhir</p>
                </div>

                <div className="h-72 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="minggu" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[30, 50]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="Bima" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Dewi" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Gatotkaca" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Srikandi" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Antareja" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rincian Sensor Fisik */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-500" /> Sensor AHT10
                  </h4>
                  <p className="text-xs text-slate-500">Membaca suhu & kelembaban kandang secara realtime via pin I2C ESP32.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-500" /> Sensor Loadcell HX711
                  </h4>
                  <p className="text-xs text-slate-500">Timbangan lorong badan dan palungan pakan otomatis.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-500" /> Sensor MPU-6050
                  </h4>
                  <p className="text-xs text-slate-500">Deteksi keaktifan gerak domba dan pemantauan kesehatan.</p>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* POP-UP DETAIL DOMBA (SEDERHANA & BERSIH) */}
      {selectedSheep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Header Pop-up */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Detail Profil Domba</h3>
              <button 
                onClick={() => setSelectedSheep(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Detail */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
                  🐑
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedSheep.nama_domba}</h4>
                  <p className="text-xs text-slate-500 font-mono">Chip ID: {selectedSheep.id}</p>
                  <p className="text-xs text-slate-500">{selectedSheep.ras} • {selectedSheep.usia_bulan} Bulan</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">BOBOT TERKINI</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">{selectedSheep.berat} kg</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">TARGET BOBOT</span>
                  <span className="text-lg font-bold text-emerald-600 font-mono">{selectedSheep.target_berat} kg</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">PANJANG BADAN</span>
                  <span className="text-base font-bold text-slate-900 font-mono">{selectedSheep.panjang_cm} cm</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">TINGGI PUNDAK</span>
                  <span className="text-base font-bold text-slate-900 font-mono">{selectedSheep.tinggi_cm} cm</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                <strong>Status Kesehatan: {selectedSheep.status_kesehatan}</strong>
                <p className="text-emerald-700/80 text-[11px] mt-0.5">Pertumbuhan stabil sesuai kurva pakan harian.</p>
              </div>
            </div>

            {/* Footer Pop-up */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSheep(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

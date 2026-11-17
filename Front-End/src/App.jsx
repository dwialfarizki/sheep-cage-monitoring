import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Scale, 
  Wheat, 
  Activity, 
  Thermometer, 
  UserPlus, 
  Info, 
  ChevronDown, 
  ChevronRight, 
  RotateCcw, 
  RefreshCw, 
  Calendar, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Youtube,
  Instagram,
  Globe
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { initialSheepList, sensorInfoList, chartDataHistory } from './data/store';

export default function App() {
  // Navigation State (Exact mapping to original Flutter app)
  // 0: Overview, 1: Weight, 2: Feed Weight, 3: Movement, 4: Environmental Index, 6: Add Sheep Data, 7: Sensor Info
  const [currentScreen, setCurrentScreen] = useState('overview');
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);

  // Data States
  const [sheepList, setSheepList] = useState(initialSheepList);
  const [selectedSheepId, setSelectedSheepId] = useState('');
  const [timeRange, setTimeRange] = useState('Daily');
  const [selectedDate, setSelectedDate] = useState('2024-04-10');

  // Form State for "Add Sheep Data"
  const [formData, setFormData] = useState({
    id: '',
    namaDomba: '',
    tanggalLahir: '',
    jenisKelamin: 'Male'
  });

  // Pagination State for Tables
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle Form Submit
  const handleAddSheep = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.namaDomba) return;

    // Hitung perkiraan usia dalam bulan
    const birth = new Date(formData.tanggalLahir || '2023-06-01');
    const now = new Date();
    const months = Math.max(1, (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth()));

    const newSheep = {
      id: formData.id,
      namaDomba: formData.namaDomba,
      usia: months,
      jenisKelamin: formData.jenisKelamin,
      berat: 35.0,
      beratPakan: 700,
      suhu: 28.0,
      kelembapan: 65.0,
      kondisi: 'Healthy',
      tanggalLahir: formData.tanggalLahir || '2023-06-01',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setSheepList([newSheep, ...sheepList]);
    setFormData({ id: '', namaDomba: '', tanggalLahir: '', jenisKelamin: 'Male' });
    alert(`Domba ${newSheep.namaDomba} (${newSheep.id}) berhasil ditambahkan!`);
  };

  const handleDeleteSheep = (id) => {
    if (window.confirm('Yakin ingin menghapus domba ini?')) {
      setSheepList(sheepList.filter(s => s.id !== id));
    }
  };

  // Filter sheep for Overview
  const displayedOverviewSheep = selectedSheepId 
    ? sheepList.filter(s => s.id === selectedSheepId) 
    : sheepList;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* ================= 1. SIDEBAR (SESUAI DRAWER ASLI) ================= */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Logo & Lab Branding (STAS-R + Logo G Sesuai Asli) */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center select-none py-1">
              <img 
                src="/images/stas_rg_clean.png" 
                alt="STAS-RG" 
                className="h-7 w-auto object-contain" 
              />
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Smart Farming Telkom Univ</p>
          </div>

          {/* Menu Items (Persis Seperti Drawer Flutter) */}
          <nav className="p-3 space-y-1 text-sm font-semibold">
            
            {/* 1. Overview */}
            <button
              onClick={() => setCurrentScreen('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                currentScreen === 'overview'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${currentScreen === 'overview' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Overview</span>
            </button>

            {/* 2. Analytics (Dropdown Group) */}
            <div className="pt-1">
              <button
                onClick={() => setAnalyticsOpen(!analyticsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                  <span>Analytics</span>
                </div>
                {analyticsOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>

              {analyticsOpen && (
                <div className="pl-6 pr-1 py-1 space-y-1">
                  <button
                    onClick={() => setCurrentScreen('weight')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      currentScreen === 'weight'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Weight</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('feed')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      currentScreen === 'feed'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Wheat className="w-3.5 h-3.5" />
                    <span>Feed Weight</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('movement')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      currentScreen === 'movement'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Movement</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('environment')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      currentScreen === 'environment'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Environmental Index</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Add Sheep Data */}
            <button
              onClick={() => setCurrentScreen('add-sheep')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                currentScreen === 'add-sheep'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <UserPlus className={`w-4 h-4 ${currentScreen === 'add-sheep' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Add Sheep Data</span>
            </button>

            {/* 4. Information (Dropdown Group) */}
            <div className="pt-1">
              <button
                onClick={() => setInfoOpen(!infoOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>Information</span>
                </div>
                {infoOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>

              {infoOpen && (
                <div className="pl-6 pr-1 py-1 space-y-1">
                  <button
                    onClick={() => setCurrentScreen('sensor-info')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      currentScreen === 'sensor-info'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>Sensor</span>
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Monitoring Active</span>
          </div>
          <span>Mode: Demo Data</span>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 capitalize">
            {currentScreen === 'overview' && 'Overview'}
            {currentScreen === 'weight' && 'Analytics - Weight'}
            {currentScreen === 'feed' && 'Analytics - Feed Weight'}
            {currentScreen === 'movement' && 'Analytics - Movement'}
            {currentScreen === 'environment' && 'Analytics - Environmental Index'}
            {currentScreen === 'add-sheep' && 'Add Sheep Data'}
            {currentScreen === 'sensor-info' && 'Sensor Information'}
          </h2>
          <div className="text-xs text-slate-500 font-mono">
            STAS-RG IoT Dashboard
          </div>
        </header>

        {/* Dynamic Screen Content */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">

          {/* ================= SCREEN 1: OVERVIEW ================= */}
          {currentScreen === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Controls: Choose Sheep & Reset Data */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-600">Pilih Domba:</span>
                  <select
                    value={selectedSheepId}
                    onChange={(e) => setSelectedSheepId(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Semua Domba (All Sheep)</option>
                    {sheepList.map((s) => (
                      <option key={s.id} value={s.id}>{s.namaDomba} ({s.id})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setSelectedSheepId('')}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data</span>
                </button>
              </div>

              {/* Sheep Cards (Clean, upgraded version of original grey cards) */}
              <div className="space-y-4">
                {displayedOverviewSheep.map((domba) => (
                  <div key={domba.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                    
                    {/* Sheep Name Badge */}
                    <div className="inline-block bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
                      <span className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>🐑</span> {domba.namaDomba}
                      </span>
                    </div>

                    {/* DESCRIPTION SECTION */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        DESCRIPTION
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl min-w-[130px]">
                          <span className="text-[10px] text-slate-400 font-medium block">Age</span>
                          <span className="text-sm font-bold text-slate-800">{domba.usia} Months</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl min-w-[130px]">
                          <span className="text-[10px] text-slate-400 font-medium block">Gender</span>
                          <span className="text-sm font-bold text-slate-800">{domba.jenisKelamin}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl flex-1 min-w-[200px]">
                          <span className="text-[10px] text-slate-400 font-medium block">ID (Chip / RFID)</span>
                          <span className="text-sm font-bold font-mono text-slate-800">{domba.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* MEASUREMENT DETAILS SECTION */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        MEASUREMENT DETAILS
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">Weight</span>
                          <span className="text-base font-extrabold font-mono text-slate-900">{domba.berat} KG</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">Feed Weight</span>
                          <span className="text-base font-extrabold font-mono text-slate-900">{domba.beratPakan} Gram</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">Temperature</span>
                          <span className="text-base font-extrabold font-mono text-slate-900">{domba.suhu} °C</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">Humidity</span>
                          <span className="text-base font-extrabold font-mono text-slate-900">{domba.kelembapan} %</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-medium block">Condition</span>
                          <span className={`text-xs font-bold inline-block mt-1 px-2 py-0.5 rounded-full ${
                            domba.kondisi === 'Healthy' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {domba.kondisi}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= SCREEN 2: ANALYTICS - WEIGHT ================= */}
          {currentScreen === 'weight' && (
            <div className="space-y-6">
              
              {/* Filter Bar (Original Controls) */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={selectedSheepId} 
                    onChange={(e) => setSelectedSheepId(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="">Choose sheep</option>
                    {sheepList.map(s => <option key={s.id} value={s.id}>{s.namaDomba} ({s.id})</option>)}
                  </select>

                  <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>

                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-800 font-medium"
                  />
                </div>

                <button 
                  onClick={() => alert('Data berat diperbarui!')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Weight Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1">Weight Chart ({timeRange})</h3>
                <p className="text-xs text-slate-500 mb-6">Data for {selectedDate}</p>

                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartDataHistory.weight}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[40, 45]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} name="Weight (KG)" dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">CHIP-ID</th>
                      <th className="px-5 py-3.5">Sheep Name</th>
                      <th className="px-5 py-3.5">Gender</th>
                      <th className="px-5 py-3.5">Weight (KG)</th>
                      <th className="px-5 py-3.5">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheepList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                        <td className="px-5 py-3 font-bold text-slate-900">{s.namaDomba}</td>
                        <td className="px-5 py-3">{s.jenisKelamin}</td>
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{s.berat} kg</td>
                        <td className="px-5 py-3 text-xs text-slate-400">{s.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= SCREEN 3: ANALYTICS - FEED WEIGHT ================= */}
          {currentScreen === 'feed' && (
            <div className="space-y-6">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={selectedSheepId} 
                    onChange={(e) => setSelectedSheepId(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="">Choose sheep</option>
                    {sheepList.map(s => <option key={s.id} value={s.id}>{s.namaDomba} ({s.id})</option>)}
                  </select>

                  <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>

                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-800 font-medium"
                  />
                </div>

                <button 
                  onClick={() => alert('Data pakan diperbarui!')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Feed Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1">Feed Weight Chart ({timeRange})</h3>
                <p className="text-xs text-slate-500 mb-6">Konsumsi pakan tercatat (Gram) untuk {selectedDate}</p>

                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartDataHistory.feed}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                      <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} name="Feed Weight (Gram)" dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Feed Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">CHIP-ID</th>
                      <th className="px-5 py-3.5">Sheep Name</th>
                      <th className="px-5 py-3.5">Gender</th>
                      <th className="px-5 py-3.5">Feed Weight (Gram)</th>
                      <th className="px-5 py-3.5">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheepList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                        <td className="px-5 py-3 font-bold text-slate-900">{s.namaDomba}</td>
                        <td className="px-5 py-3">{s.jenisKelamin}</td>
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{s.beratPakan} Gram</td>
                        <td className="px-5 py-3 text-xs text-slate-400">{s.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= SCREEN 4: ANALYTICS - MOVEMENT ================= */}
          {currentScreen === 'movement' && (
            <div className="space-y-6">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={selectedSheepId} 
                    onChange={(e) => setSelectedSheepId(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="">Choose sheep</option>
                    {sheepList.map(s => <option key={s.id} value={s.id}>{s.namaDomba} ({s.id})</option>)}
                  </select>

                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-800 font-medium"
                  />
                </div>

                <button 
                  onClick={() => alert('Data gerak MPU diperbarui!')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Movement Gyro Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1">Movement Chart (MPU6050)</h3>
                <p className="text-xs text-slate-500 mb-6">Deteksi rotasi RateRoll, RatePitch, RateYaw</p>

                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartDataHistory.movement}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="roll" stroke="#0ea5e9" strokeWidth={2} name="Rate Roll" />
                      <Line type="monotone" dataKey="pitch" stroke="#f59e0b" strokeWidth={2} name="Rate Pitch" />
                      <Line type="monotone" dataKey="yaw" stroke="#10b981" strokeWidth={2} name="Rate Yaw" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Movement Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">CHIP-ID</th>
                      <th className="px-5 py-3.5">Sheep Name</th>
                      <th className="px-5 py-3.5">Gender</th>
                      <th className="px-5 py-3.5">Movement Status</th>
                      <th className="px-5 py-3.5">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheepList.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                        <td className="px-5 py-3 font-bold text-slate-900">{s.namaDomba}</td>
                        <td className="px-5 py-3">{s.jenisKelamin}</td>
                        <td className="px-5 py-3 font-medium text-emerald-700">
                          {idx % 2 === 0 ? 'Active / Eating' : 'Resting'}
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-400">{s.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= SCREEN 5: ANALYTICS - ENVIRONMENTAL INDEX ================= */}
          {currentScreen === 'environment' && (
            <div className="space-y-6">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={selectedSheepId} 
                    onChange={(e) => setSelectedSheepId(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="">Choose sheep</option>
                    {sheepList.map(s => <option key={s.id} value={s.id}>{s.namaDomba} ({s.id})</option>)}
                  </select>

                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-800 font-medium"
                  />
                </div>

                <button 
                  onClick={() => alert('Data iklim diperbarui!')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Climate Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1">Environmental Index (AHT20)</h3>
                <p className="text-xs text-slate-500 mb-6">Pemantauan Suhu & Kelembaban Kandang untuk {selectedDate}</p>

                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartDataHistory.environment}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[15, 85]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} name="Temperature (°C)" />
                      <Line type="monotone" dataKey="hum" stroke="#06b6d4" strokeWidth={2.5} name="Humidity (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Climate Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">CHIP-ID</th>
                      <th className="px-5 py-3.5">Sheep Name</th>
                      <th className="px-5 py-3.5">Gender</th>
                      <th className="px-5 py-3.5">Temperature (°C)</th>
                      <th className="px-5 py-3.5">Humidity (%)</th>
                      <th className="px-5 py-3.5">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheepList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                        <td className="px-5 py-3 font-bold text-slate-900">{s.namaDomba}</td>
                        <td className="px-5 py-3">{s.jenisKelamin}</td>
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{s.suhu} °C</td>
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{s.kelembapan} %</td>
                        <td className="px-5 py-3 text-xs text-slate-400">{s.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= SCREEN 6: ADD SHEEP DATA ================= */}
          {currentScreen === 'add-sheep' && (
            <div className="space-y-6">
              
              {/* Form Input Tambah Domba */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1">Tambah Data Domba Baru</h3>
                <p className="text-xs text-slate-500 mb-6">Daftarkan tag RFID dan identitas domba ke dalam sistem</p>

                <form onSubmit={handleAddSheep} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">CHIP ID</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: DEMO-006"
                      required
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Nama Domba</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Sheep F"
                      required
                      value={formData.namaDomba}
                      onChange={(e) => setFormData({ ...formData, namaDomba: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Tanggal Lahir</label>
                    <input 
                      type="date" 
                      required
                      value={formData.tanggalLahir}
                      onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Jenis Kelamin</label>
                    <select
                      value={formData.jenisKelamin}
                      onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Male">Male (Jantan)</option>
                      <option value="Female">Female (Betina)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      Simpan Data Domba
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel Semua Domba Terdaftar */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Daftar Seluruh Domba</h4>
                  <span className="text-xs text-slate-500 font-mono">Total: {sheepList.length} ekor</span>
                </div>

                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">CHIP ID</th>
                      <th className="px-5 py-3.5">Sheep Name</th>
                      <th className="px-5 py-3.5">Age (Months)</th>
                      <th className="px-5 py-3.5">Gender</th>
                      <th className="px-5 py-3.5">Birth Date</th>
                      <th className="px-5 py-3.5">Created At</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheepList.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono text-xs font-bold text-slate-900">{s.id}</td>
                        <td className="px-5 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <span>🐑</span> {s.namaDomba}
                        </td>
                        <td className="px-5 py-3">{s.usia} Bln</td>
                        <td className="px-5 py-3">{s.jenisKelamin}</td>
                        <td className="px-5 py-3 text-xs">{s.tanggalLahir}</td>
                        <td className="px-5 py-3 text-xs text-slate-400">{s.createdAt}</td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => handleDeleteSheep(s.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= SCREEN 7: INFORMATION - SENSOR ================= */}
          {currentScreen === 'sensor-info' && (
            <div className="space-y-6">
              
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Informasi Perangkat Sensor</h3>
                <p className="text-xs text-slate-500">Penjelasan instrumen hardware sensor yang terpasang di kandang domba</p>
              </div>

              {/* 5 Sensor Cards (Exact images & descriptions from original) */}
              <div className="space-y-4">
                {sensorInfoList.map((sensor, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-xl bg-slate-50 border border-slate-100 p-2 shrink-0 flex items-center justify-center">
                      <img src={sensor.imageUrl} alt={sensor.nama_sensor} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <h4 className="text-lg font-bold text-slate-900">{sensor.nama_sensor}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{sensor.penjelasan}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Section (Sesuai Asli: Alamat Telkom University & Sosmed) */}
              <div className="bg-slate-100 rounded-2xl p-6 text-center space-y-3 mt-8">
                <div className="flex items-center justify-center select-none py-1">
                  <img 
                    src="/images/stas_rg_clean.png" 
                    alt="STAS-RG" 
                    className="h-9 w-auto object-contain" 
                  />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Smart Transportation and Automation System Research Group</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                </p>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a href="https://tuvv.telkomuniversity.ac.id/stas-rg/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white text-slate-600 hover:text-emerald-600 shadow-sm transition">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href="https://www.youtube.com/@stas_rg" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white text-slate-600 hover:text-rose-600 shadow-sm transition">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/stas.rg/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white text-slate-600 hover:text-pink-600 shadow-sm transition">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Cpu, Wifi, Radio, Server, Database, Send, CheckCircle2, Code2, AlertCircle } from 'lucide-react';

export default function HardwareDiagnostics() {
  const [selectedSensor, setSelectedSensor] = useState('aht');
  const [testStatus, setTestStatus] = useState(null);

  const samplePayloads = {
    aht: {
      endpoint: 'POST /api/aht',
      body: {
        suhu: 28.5,
        kelembapan: 65.2,
        chip_id: 'DEMO-001'
      }
    },
    loadcellBadan: {
      endpoint: 'POST /api/loadcellBadan',
      body: {
        berat: 42.8,
        chip_id: 'DEMO-001'
      }
    },
    loadcellPakan: {
      endpoint: 'POST /api/loadcellPakan',
      body: {
        berat_pakan: 1.25,
        berat_pakan_mentah: 2.50,
        chip_id: 'DEMO-001'
      }
    },
    mpu: {
      endpoint: 'POST /api/mpu',
      body: {
        mean_x: 0.12,
        mean_y: 0.45,
        mean_z: 9.81,
        classification: 'Rumination',
        chip_id: 'DEMO-001'
      }
    },
    kamera: {
      endpoint: 'POST /api/kamera',
      body: {
        panjang: 86.4,
        tinggi: 64.2,
        chip_id: 'DEMO-001'
      }
    }
  };

  const handleSimulateHardwarePost = () => {
    setTestStatus('sending');
    setTimeout(() => {
      setTestStatus('success');
      setTimeout(() => setTestStatus(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" /> Diagnostik Hardware & Gateway ESP32
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Topologi alur koneksi perangkat IoT dari kandang domba menuju REST API Backend</p>
      </div>

      {/* Visual Data Flow Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider text-xs">Arsitektur Jalur Data IoT (Kandang ke Layar)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1: Physical Sensor */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 inline-block mb-2">1. FISIK</span>
              <h4 className="text-sm font-bold text-white">Sensor Kandang</h4>
              <p className="text-xs text-slate-400 mt-1">RFID, Loadcell Timbangan, AHT10 Suhu, MPU-6050, Kamera CV.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
              Signal: Analog / I2C / SPI
            </div>
          </div>

          {/* Step 2: Microcontroller Gateway */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 inline-block mb-2">2. GATEWAY WI-FI</span>
              <h4 className="text-sm font-bold text-white">ESP32 Controller</h4>
              <p className="text-xs text-slate-400 mt-1">Mengambil data sensor lalu mengirim HTTP POST via Wi-Fi kandang.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5" /> Wi-Fi Connected
            </div>
          </div>

          {/* Step 3: Backend REST API */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 inline-block mb-2">3. BACKEND API</span>
              <h4 className="text-sm font-bold text-white">Express & Prisma</h4>
              <p className="text-xs text-slate-400 mt-1">Menerima payload JSON, memvalidasi, dan menyimpan ke database MySQL.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-amber-400" /> MySQL DB Active
            </div>
          </div>

          {/* Step 4: React Dashboard */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 inline-block mb-2">4. FRONTEND</span>
              <h4 className="text-sm font-bold text-white">Dashboard React</h4>
              <p className="text-xs text-slate-400 mt-1">Meminta data (HTTP GET) untuk divisualisasikan dalam grafik & paspor domba.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-purple-400 font-mono">
              Web Telemetry Live
            </div>
          </div>

        </div>
      </div>

      {/* Simulator Payload Tester */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" /> Simulator Payload ESP32 ke Backend
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Format JSON yang dikirimkan oleh mikrokontroler kandang ke endpoint Express</p>
          </div>

          {/* Sensor Selector */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {Object.keys(samplePayloads).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedSensor(key)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                  selectedSensor === key 
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Code Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-800/80">
            <span>ENDPOINT: <strong className="text-emerald-400 font-bold">{samplePayloads[selectedSensor].endpoint}</strong></span>
            <span>Content-Type: application/json</span>
          </div>
          <pre className="text-slate-300">
            {JSON.stringify(samplePayloads[selectedSensor].body, null, 2)}
          </pre>
        </div>

        {/* Simulate Test Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            Backend REST API beralamat di: <code className="text-slate-300 font-mono">http://localhost:3000</code>
          </div>

          <button
            onClick={handleSimulateHardwarePost}
            disabled={testStatus === 'sending'}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
          >
            {testStatus === 'sending' ? (
              <span>Mengirim simulasi...</span>
            ) : testStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Simulasi Sukses Terkirim!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Uji Kirim Payload Simulasi</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

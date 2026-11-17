// mockData.js - Dataset simulasi komprehensif untuk Sheep Cage Monitoring STAS-RG

export const initialSheep = [
  {
    id: 'DEMO-001',
    nama_domba: 'Bima (Sheep A)',
    usia_bulan: 18,
    jenis_kelamin: 'Male',
    ras: 'Garut Super',
    berat: 42.6,
    target_berat: 48.0,
    panjang_cm: 86.4,
    tinggi_cm: 64.2,
    pakan_harian_gram: 820,
    suhu: 28.4,
    kelembaban: 64.0,
    status_kesehatan: 'Optimal',
    aktivitas_dominan: 'Rumination (Memamah Biak)',
    lokasi_kandang: 'Blok A - Pen 01',
    rfid_tag: 'RFID-984210',
    terakhir_timbang: '10 menit lalu',
  },
  {
    id: 'DEMO-002',
    nama_domba: 'Dewi (Sheep B)',
    usia_bulan: 14,
    jenis_kelamin: 'Female',
    ras: 'Dorper Cross',
    berat: 38.9,
    target_berat: 42.0,
    panjang_cm: 79.1,
    tinggi_cm: 59.8,
    pakan_harian_gram: 760,
    suhu: 27.8,
    kelembaban: 68.0,
    status_kesehatan: 'Optimal',
    aktivitas_dominan: 'Resting (Istirahat)',
    lokasi_kandang: 'Blok A - Pen 02',
    rfid_tag: 'RFID-984211',
    terakhir_timbang: '25 menit lalu',
  },
  {
    id: 'DEMO-003',
    nama_domba: 'Gatotkaca (Sheep C)',
    usia_bulan: 22,
    jenis_kelamin: 'Male',
    ras: 'Texel Priangan',
    berat: 47.2,
    target_berat: 52.0,
    panjang_cm: 91.0,
    tinggi_cm: 68.5,
    pakan_harian_gram: 910,
    suhu: 29.1,
    kelembaban: 61.0,
    status_kesehatan: 'Optimal',
    aktivitas_dominan: 'Active Feeding (Sedang Makan)',
    lokasi_kandang: 'Blok B - Pen 01',
    rfid_tag: 'RFID-984212',
    terakhir_timbang: '5 menit lalu',
  },
  {
    id: 'DEMO-004',
    nama_domba: 'Srikandi (Sheep D)',
    usia_bulan: 11,
    jenis_kelamin: 'Female',
    ras: 'Lokal Ekor Gemuk',
    berat: 34.7,
    target_berat: 40.0,
    panjang_cm: 74.5,
    tinggi_cm: 56.2,
    pakan_harian_gram: 690,
    suhu: 28.0,
    kelembaban: 72.0,
    status_kesehatan: 'Needs Monitoring',
    aktivitas_dominan: 'Low Activity (Lesu)',
    lokasi_kandang: 'Blok B - Pen 02',
    rfid_tag: 'RFID-984213',
    terakhir_timbang: '1 jam lalu',
  },
  {
    id: 'DEMO-005',
    nama_domba: 'Antareja (Sheep E)',
    usia_bulan: 16,
    jenis_kelamin: 'Male',
    ras: 'Garut Tangkas',
    berat: 40.3,
    target_berat: 46.0,
    panjang_cm: 83.2,
    tinggi_cm: 62.0,
    pakan_harian_gram: 800,
    suhu: 28.7,
    kelembaban: 66.0,
    status_kesehatan: 'Optimal',
    aktivitas_dominan: 'Rumination (Memamah Biak)',
    lokasi_kandang: 'Blok A - Pen 03',
    rfid_tag: 'RFID-984214',
    terakhir_timbang: '40 menit lalu',
  },
];

// Data tren 24 jam untuk grafik sensor iklim & pakan
export const telemetryTrend24h = [
  { jam: '00:00', suhu: 24.2, kelembaban: 78.5, thi: 72.1, pakan_kg: 1.8, gerak_xyz: 0.15 },
  { jam: '03:00', suhu: 23.8, kelembaban: 81.0, thi: 71.8, pakan_kg: 1.2, gerak_xyz: 0.12 },
  { jam: '06:00', suhu: 25.1, kelembaban: 76.2, thi: 73.4, pakan_kg: 3.5, gerak_xyz: 0.45 },
  { jam: '09:00', suhu: 27.6, kelembaban: 68.0, thi: 76.5, pakan_kg: 4.8, gerak_xyz: 0.82 },
  { jam: '12:00', suhu: 30.2, kelembaban: 58.4, thi: 79.2, pakan_kg: 4.2, gerak_xyz: 0.65 },
  { jam: '15:00', suhu: 29.8, kelembaban: 62.1, thi: 78.7, pakan_kg: 5.1, gerak_xyz: 0.78 },
  { jam: '18:00', suhu: 27.2, kelembaban: 69.5, thi: 76.0, pakan_kg: 4.0, gerak_xyz: 0.52 },
  { jam: '21:00', suhu: 25.5, kelembaban: 74.0, thi: 73.9, pakan_kg: 2.4, gerak_xyz: 0.28 },
];

// Data pertumbuhan bobot mingguan (ADG - Average Daily Gain)
export const weightGrowthData = [
  { minggu: 'Mgg 1', Bima: 39.5, Dewi: 36.2, Gatotkaca: 44.0, Srikandi: 32.5, Antareja: 37.8 },
  { minggu: 'Mgg 2', Bima: 40.2, Dewi: 36.9, Gatotkaca: 44.8, Srikandi: 33.1, Antareja: 38.5 },
  { minggu: 'Mgg 3', Bima: 41.0, Dewi: 37.6, Gatotkaca: 45.6, Srikandi: 33.7, Antareja: 39.1 },
  { minggu: 'Mgg 4', Bima: 41.8, Dewi: 38.2, Gatotkaca: 46.4, Srikandi: 34.2, Antareja: 39.7 },
  { minggu: 'Mgg 5', Bima: 42.6, Dewi: 38.9, Gatotkaca: 47.2, Srikandi: 34.7, Antareja: 40.3 },
];

// Data klasifikasi IMU MPU-6050
export const mpuActivityBreakdown = [
  { name: 'Rumination (Memamah Biak)', value: 58, color: '#10B981' },
  { name: 'Active Feeding (Makan)', value: 24, color: '#3B82F6' },
  { name: 'Resting / Tidur', value: 14, color: '#64748B' },
  { name: 'Gelisah / Tidak Stabil', value: 4, color: '#F59E0B' },
];

// Hitung Temperature Humidity Index (THI) untuk ternak
export function calculateTHI(tempC, humidityPct) {
  // Formula umum Livestock Weather Safety Index:
  // THI = 0.8 * T + (RH/100) * (T - 14.4) + 46.4
  const thi = 0.8 * tempC + (humidityPct / 100) * (tempC - 14.4) + 46.4;
  return parseFloat(thi.toFixed(1));
}

export function getTHIStatus(thi) {
  if (thi < 74) {
    return { level: 'Comfort Zone (Nyaman)', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', desc: 'Suhu & kelembapan optimal untuk pertumbuhan domba.' };
  } else if (thi <= 78) {
    return { level: 'Mild Stress (Waspada)', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', desc: 'Mulai timbul cekaman panas ringan. Pastikan sirkulasi kipas aktif.' };
  } else {
    return { level: 'Severe Heat Stress (Kritis)', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', desc: 'Risiko dehidrasi dan nafsu makan anjlok! Segera nyalakan misting/blower.' };
  }
}

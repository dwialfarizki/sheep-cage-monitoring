// store.js - Data dasar sistem monitoring domba sesuai fitur asli

export const initialSheepList = [
  {
    id: 'DEMO-001',
    namaDomba: 'Sheep A',
    usia: 18,
    jenisKelamin: 'Male',
    berat: 42.6,
    beratPakan: 820,
    suhu: 28.4,
    kelembapan: 64.0,
    kondisi: 'Healthy',
    tanggalLahir: '2023-05-15',
    createdAt: '2024-01-10 08:30',
  },
  {
    id: 'DEMO-002',
    namaDomba: 'Sheep B',
    usia: 14,
    jenisKelamin: 'Female',
    berat: 38.9,
    beratPakan: 760,
    suhu: 27.8,
    kelembapan: 68.0,
    kondisi: 'Healthy',
    tanggalLahir: '2023-09-12',
    createdAt: '2024-02-14 09:15',
  },
  {
    id: 'DEMO-003',
    namaDomba: 'Sheep C',
    usia: 22,
    jenisKelamin: 'Male',
    berat: 47.2,
    beratPakan: 910,
    suhu: 29.1,
    kelembapan: 61.0,
    kondisi: 'Healthy',
    tanggalLahir: '2023-01-20',
    createdAt: '2024-03-01 10:45',
  },
  {
    id: 'DEMO-004',
    namaDomba: 'Sheep D',
    usia: 11,
    jenisKelamin: 'Female',
    berat: 34.7,
    beratPakan: 690,
    suhu: 28.0,
    kelembapan: 72.0,
    kondisi: 'Needs Monitoring',
    tanggalLahir: '2023-12-05',
    createdAt: '2024-03-15 11:20',
  },
  {
    id: 'DEMO-005',
    namaDomba: 'Sheep E',
    usia: 16,
    jenisKelamin: 'Male',
    berat: 40.3,
    beratPakan: 800,
    suhu: 28.7,
    kelembapan: 66.0,
    kondisi: 'Healthy',
    tanggalLahir: '2023-07-08',
    createdAt: '2024-04-02 13:00',
  },
];

export const sensorInfoList = [
  {
    nama_sensor: 'RFID',
    imageUrl: '/images/sensor/RaFID.png',
    penjelasan:
      'The MFRC522 RFID sensor reads and writes data to RFID cards using wireless radio communication between the tag and reader. It is popular for access control, item identification, and tracking systems.',
  },
  {
    nama_sensor: 'Body Load Cell',
    imageUrl: '/images/sensor/loadcellBadan.png',
    penjelasan:
      'A load cell measures the force or weight of an object through elastic deformation. A strain gauge detects resistance changes caused by the applied load and converts them into an electrical signal. An amplifier may be used to strengthen the signal before it is processed by a microcontroller or computer.',
  },
  {
    nama_sensor: 'Feed Load Cell',
    imageUrl: '/images/sensor/loadcellpakan.png',
    penjelasan:
      'A load cell measures weight or pressure by converting the applied force into a measurable signal. Its analog or digital output can be processed by computers and microcontrollers. Its fast response makes it suitable for real-time measurement applications.',
  },
  {
    nama_sensor: 'AHT20',
    imageUrl: '/images/sensor/aht.png',
    penjelasan:
      'The AHT20 is a digital temperature and humidity sensor with an accurate I2C interface. It is reliable, easy to use, and suitable for environmental monitoring, HVAC, and IoT applications. Its high resolution and automatic calibration help improve measurement precision.',
  },
  {
    nama_sensor: 'MPU6050',
    imageUrl: '/images/sensor/mpu.png',
    penjelasan:
      'The behavior detection system uses the MPU6050 accelerometer and gyroscope to measure rotation (Roll, Pitch, Yaw) and acceleration (AccX, AccY, AccZ). A Kalman filter improves angle accuracy. Movement is detected from significant RateRoll and RatePitch changes, and the data is sent to the server through HTTP POST for analysis.',
  },
];

// Data riwayat berkala untuk grafik masing-masing sensor
export const chartDataHistory = {
  weight: [
    { label: '08:00', value: 42.1 },
    { label: '10:00', value: 42.3 },
    { label: '12:00', value: 42.6 },
    { label: '14:00', value: 42.5 },
    { label: '16:00', value: 42.8 },
    { label: '18:00', value: 42.6 },
  ],
  feed: [
    { label: '08:00', value: 250 },
    { label: '10:00', value: 450 },
    { label: '12:00', value: 600 },
    { label: '14:00', value: 720 },
    { label: '16:00', value: 800 },
    { label: '18:00', value: 820 },
  ],
  movement: [
    { label: '08:00', roll: 0.12, pitch: 0.08, yaw: 0.05 },
    { label: '10:00', roll: 0.35, pitch: 0.22, yaw: 0.18 },
    { label: '12:00', roll: 0.28, pitch: 0.19, yaw: 0.14 },
    { label: '14:00', roll: 0.15, pitch: 0.09, yaw: 0.07 },
    { label: '16:00', roll: 0.42, pitch: 0.31, yaw: 0.25 },
    { label: '18:00', roll: 0.18, pitch: 0.11, yaw: 0.09 },
  ],
  environment: [
    { label: '08:00', temp: 26.5, hum: 70 },
    { label: '10:00', temp: 27.8, hum: 67 },
    { label: '12:00', temp: 29.5, hum: 60 },
    { label: '14:00', temp: 29.1, hum: 62 },
    { label: '16:00', temp: 28.4, hum: 64 },
    { label: '18:00', temp: 27.2, hum: 68 },
  ],
};

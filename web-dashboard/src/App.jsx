import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CommandCenter from './components/CommandCenter';
import SensorTelemetry from './components/SensorTelemetry';
import SheepPassport from './components/SheepPassport';
import HardwareDiagnostics from './components/HardwareDiagnostics';
import Footer from './components/Footer';
import { initialSheep } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('command-center');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [sheepList, setSheepList] = useState(initialSheep);
  const [selectedSheep, setSelectedSheep] = useState(null);

  const handleSelectSheep = (sheep) => {
    setSelectedSheep(sheep);
    setActiveTab('passport');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Sticky Top Header */}
      <Header 
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        sheepCount={sheepList.length}
        activeAlerts={1}
      />

      {/* Main Tab Navigation */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'command-center' && (
          <CommandCenter 
            sheepList={sheepList} 
            onSelectSheep={handleSelectSheep}
          />
        )}

        {activeTab === 'telemetry' && (
          <SensorTelemetry />
        )}

        {activeTab === 'passport' && (
          <SheepPassport 
            sheepList={sheepList}
            selectedSheep={selectedSheep}
            onSelectSheep={setSelectedSheep}
          />
        )}

        {activeTab === 'hardware' && (
          <HardwareDiagnostics />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  Sun, 
  Layers, 
  Thermometer, 
  Cloud, 
  Sprout, 
  Heart,
  ScanLine,
  ChevronRight,
  ShieldCheck,
  Activity // Added an icon for medical/health tracking aesthetics
} from 'lucide-react';

export default function CareGuide() {
  const [activeTab, setActiveTab] = useState('Care Guide');
  const [isFavorite, setIsFavorite] = useState(false);

  // Added 'Medicinal Use' to the tab menu array
  const tabs = ['Care Guide', 'Growth Info', 'Problems', 'Similar Plants', 'Medicinal Use'];

  const careDetails = [
    {
      id: 'watering',
      icon: <Droplet className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Watering',
      description: 'Water when the top 1-2 inches of soil is dry.'
    },
    {
      id: 'sunlight',
      icon: <Sun className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Sunlight',
      description: 'Bright, indirect light. Avoid direct sunlight.'
    },
    {
      id: 'soil',
      icon: <Layers className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Soil Type',
      description: 'Well-draining, rich, and airy soil.'
    },
    {
      id: 'temperature',
      icon: <Thermometer className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Temperature',
      description: '18°C — 30°C is ideal for growth.'
    },
    {
      id: 'humidity',
      icon: <Cloud className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Humidity',
      description: 'Prefers high humidity (60%+).'
    },
    {
      id: 'fertilizer',
      icon: <Sprout className="w-5 h-5 text-[#1b4d3e]" />,
      title: 'Fertilizer',
      description: 'Feed once a month during growing season.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } }
  };

  return (
    <div 
      className="h-screen w-screen relative p-4 md:p-6 lg:p-8 flex justify-center items-center font-sans antialiased text-slate-800 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1920')` 
      }}
    >
      {/* Background Dim Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />
      
      {/* Main Glassmorphism Container */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl max-h-full bg-white/85 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 p-5 md:p-8 flex flex-col overflow-hidden z-10"
      >
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/50 flex-shrink-0">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-[#e8f5e9]/90 p-1.5 rounded-xl text-[#2d8a4e] transition-transform duration-300 group-hover:scale-105 shadow-xs">
              <ScanLine className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-[#1b4d3e] tracking-tight">
              Chloro<span className="text-[#2d8a4e] font-medium">Scan</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-800 tracking-wide uppercase">Scan Healthy</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6 flex-shrink-0">
          
          {/* Plant Image Container */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-64 h-44 md:h-52 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border border-white/60 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800" 
              alt="Monstera Deliciosa" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </motion.div>

          {/* Plant Identity Details */}
          <div className="flex-1 text-center md:text-left w-full pt-1">
            <div className="text-[10px] font-bold text-[#2d8a4e] tracking-widest uppercase mb-0.5">Aroid Family</div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight mb-0.5">Monstera Deliciosa</h1>
            <p className="text-slate-500 italic text-base mb-4 font-medium">Monstera deliciosa</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="bg-[#2d8a4e] hover:bg-[#206639] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors duration-200 flex items-center gap-2"
              >
                Add to My Garden
                <ChevronRight className="w-3.5 h-3.5 opacity-80" />
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.93 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`border p-2.5 rounded-xl transition-all duration-300 shadow-2xs backdrop-blur-xs ${
                  isFavorite 
                    ? 'bg-rose-50/90 border-rose-200 text-rose-500' 
                    : 'border-slate-200/80 bg-white/50 text-slate-400 hover:text-slate-600 hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : 'fill-none'}`} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Automatically fits the new Medicinal Use option seamlessly) */}
        <div className="border-b border-slate-200/60 mb-5 relative flex-shrink-0">
          <nav className="flex gap-6 -mb-px overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-semibold transition-colors duration-200 relative whitespace-nowrap ${
                    isActive ? 'text-[#2d8a4e]' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d8a4e] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Window */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'Care Guide' && (
              <motion.div 
                key="care-guide-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pb-2"
              >
                {careDetails.map((detail) => (
                  <motion.div 
                    key={detail.id} 
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="bg-white/70 border border-white/40 hover:border-[#e2ede7] hover:bg-white/90 rounded-xl p-4 flex gap-3.5 items-start shadow-2xs transition-all duration-300 backdrop-blur-xs"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-2xs border border-emerald-50/60 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1b4d3e] text-[0.95rem] mb-0.5">{detail.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed font-semibold">{detail.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Explicit dynamic condition for your new Medicinal Use Tab */}
            {activeTab === 'Medicinal Use' && (
              <motion.div 
                key="medicinal-use"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[180px] text-center text-slate-500 border-2 border-dashed border-slate-200/60 rounded-xl flex flex-col items-center justify-center gap-1.5 bg-white/40 backdrop-blur-xs"
              >
                <Activity className="w-6 h-6 text-emerald-600 stroke-1 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide">Medicinal properties & biochemical analysis loading...</span>
              </motion.div>
            )}

            {/* General fallback container for remaining loading sub-tabs */}
            {activeTab !== 'Care Guide' && activeTab !== 'Medicinal Use' && (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[180px] text-center text-slate-500 border-2 border-dashed border-slate-200/60 rounded-xl flex flex-col items-center justify-center gap-1.5 bg-white/40 backdrop-blur-xs"
              >
                <Sprout className="w-6 h-6 text-slate-400 stroke-1 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide">{activeTab} parameters loading...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScanLine, 
  Plus, 
  Droplet, 
  Sprout, 
  Layers, 
  Calendar,
  User,
  CheckCircle2
} from 'lucide-react';

export default function Reminders() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Watering', 'Fertilizer', 'Repotting', 'Other'];

  // Reminder data structured exactly like the image list
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Water Snake Plant',
      time: 'Tomorrow, 08:00 AM',
      category: 'Watering',
      icon: <Droplet className="w-5 h-5 text-sky-500 fill-sky-100" />,
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 2,
      title: 'Fertilize Peace Lily',
      time: 'May 28, 2026 • 09:00 AM',
      category: 'Fertilizer',
      icon: <Sprout className="w-5 h-5 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 3,
      title: 'Repot Aloe Vera',
      time: 'June 2, 2026 • 10:00 AM',
      category: 'Repotting',
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ]);

  // Handle marking a reminder as done with a quick exit animation
  const handleMarkDone = (id) => {
    setReminders(prev => prev.filter(item => item.id !== id));
  };

  // Filter reminders based on active category
  const filteredReminders = reminders.filter(reminder => 
    activeCategory === 'All' ? true : reminder.category === activeCategory
  );

  return (
    <div 
      className="h-screen w-screen relative p-4 md:p-6 lg:p-8 flex justify-center items-center font-sans antialiased text-slate-800 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1920')` 
      }}
    >
      {/* Background Dim Backdrop Glass Blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

      {/* Main Glassmorphism Dashboard Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl max-h-full bg-white/85 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 p-6 md:p-8 flex flex-col overflow-hidden z-10"
      >
        
        {/* Top Header Navigation Line */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#e8f5e9]/90 p-1.5 rounded-xl text-[#2d8a4e] shadow-xs">
              <ScanLine className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-[#1b4d3e] tracking-tight">
              Chloro<span className="text-[#2d8a4e] font-medium">Scan</span>
            </span>
          </div>
          
          {/* User Profile Action Circle Icon */}
          <div className="text-slate-500 hover:text-[#2d8a4e] p-1 cursor-pointer transition-colors">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
        </div>

        {/* Action / Component Header Row */}
        <div className="flex items-center justify-between mb-5 flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight">
            Reminders
          </h1>
          <motion.button 
            whileTap={{ scale: 0.97 }}
            className="bg-[#2d8a4e] hover:bg-[#1f6337] text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Reminder
          </motion.button>
        </div>

        {/* Category Filter Segments Row */}
        <div className="border-b border-slate-200/60 mb-6 relative flex-shrink-0">
          <nav className="flex gap-6 -mb-px overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-2.5 text-sm font-semibold transition-colors duration-200 relative whitespace-nowrap ${
                    isActive ? 'text-[#2d8a4e]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {category}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d8a4e] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Reminders List Scrolling Container Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
          <AnimatePresence mode="popLayout">
            {filteredReminders.length > 0 ? (
              <motion.div 
                layout
                className="flex flex-col gap-3"
              >
                {filteredReminders.map((reminder) => (
                  <motion.div
                    key={reminder.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="bg-white/70 border border-white/50 rounded-2xl p-3.5 flex items-center justify-between gap-4 shadow-2xs hover:bg-white/90 transition-colors group"
                  >
                    {/* Left: Plant Image and Meta Text Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                        <img 
                          src={reminder.image} 
                          alt={reminder.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1b4d3e] text-base mb-0.5">
                          {reminder.title}
                        </h3>
                        <p className="text-slate-400 font-medium text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3 opacity-70" />
                          {reminder.time}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Action Task Category Icon Indicator */}
                    <div className="hidden sm:block p-2 bg-slate-50/80 rounded-xl border border-slate-100">
                      {reminder.icon}
                    </div>

                    {/* Right: Mark Done Interactive Button Action */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMarkDone(reminder.id)}
                      className="border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/50 font-semibold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 bg-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                      Mark Done
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Empty Placeholder State when no active entries match query filter */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[220px] text-center text-slate-400 border-2 border-dashed border-slate-200/60 rounded-2xl flex flex-col items-center justify-center gap-2 bg-white/40"
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-500/80 stroke-[1.5]" />
                <span className="text-xs font-semibold tracking-wide">All caught up! No scheduled task reminders here.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
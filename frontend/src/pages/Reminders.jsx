import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Plus, Droplet, Sprout, Layers, Calendar,User,CheckCircle2} from 'lucide-react';
import logo from "../assets/logo.png";
export default function Reminders() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Watering', 'Fertilizer', 'Repotting', 'Other'];
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

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl h-[90vh] bg-white/85 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-white/40 p-8 flex flex-col overflow-hidden z-10">
        
        <div className="flex items-center mb-6 flex-shrink-0">
          <img src={logo} alt="ChloroScan Logo"className="h-12 object-contain"/>
        </div>

        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight">
            Plant Reminders
          </h1>
          <motion.button 
            whileTap={{ scale: 0.97 }}
            className="bg-[#2d8a4e] hover:bg-[#1f6337] text-white font-semibold px-5 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Reminder
          </motion.button>
        </div>

        <div className="border-b border-slate-200/60 mb-6 relative flex-shrink-0">
          <nav className="grid grid-cols-5 w-full -mb-px">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-3 text-sm font-semibold transition-all duration-200 relative text-center ${isActive? "text-[#2d8a4e]": "text-slate-400 hover:text-slate-600"}`}>
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
                    className=" bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
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
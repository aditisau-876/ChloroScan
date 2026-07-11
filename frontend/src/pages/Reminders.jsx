import React, { useState, useEffect } from "react";
import ReminderModal from "../components/ReminderModal";
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../components/Sidebar";
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
import logo from "../assets/logo.png";
import { getMyPlants, getReminders, createReminder, completeReminder } from "../api/auth";
export default function Reminders() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ["All", "Watering", "Fertilizer", "Repotting", "Pruning",];
  const [showModal, setShowModal] = useState(false);

  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const res = await getReminders();
      setReminders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle marking a reminder as done with a quick exit animation
  const handleMarkDone = (id) => {
    setReminders(prev => prev.filter(item => item.id !== id));
  };

  // Filter reminders based on active category
  const filteredReminders = reminders.filter(reminder =>
    activeCategory === 'All' ? true : reminder.category === activeCategory
  );

  return (

    <div className="flex h-screen bg-[#F5F8F5]">

      <Sidebar />

      <div className="flex-1 relative overflow-y-auto">

        <div
          className="min-h-screen relative p-8 flex justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1920')",
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
            <div className="flex items-center justify-between mb-6 flex-shrink-0"><div className="flex items-center mb-6 flex-shrink-0">
              <img
                src={logo}
                alt="ChloroScan Logo"
                className="h-12 object-contain"
              />
            </div></div>

            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight">
                Plant Reminders
              </h1>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModal(true)}
                className="bg-[#2d8a4e] hover:bg-[#1f6337] text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors">
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
                      className={`pb-2.5 text-sm font-semibold transition-colors duration-200 relative whitespace-nowrap ${isActive ? 'text-[#2d8a4e]' : 'text-slate-400 hover:text-slate-600'
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
                          <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=150&q=80"
                              alt={reminder.plant_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#1b4d3e] text-base mb-0.5">
                              {reminder.plant_name}
                            </h3>
                            <p className="text-slate-400 font-medium text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3 opacity-70" />
                              {new Date(`${reminder.reminder_date}T${reminder.reminder_time}`).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Middle: Action Task Category Icon Indicator */}
                        <div className="hidden sm:block"><span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">{reminder.reminder_type}</span></div>

                        {/* Right: Mark Done Interactive Button Action */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            await completeReminder(reminder.id);
                            loadReminders();
                          }}
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
          {showModal && (
            <ReminderModal
              closeModal={() => setShowModal(false)}
              onSave={async (data) => {
                try {
                  await createReminder(data);
                  await loadReminders();
                } catch (err) {
                  console.log(err);
                }

                setShowModal(false);
              }}
            />
          )}
        </div>

      </div>

    </div>

  );
}
import React, { useState, useEffect } from "react";
import ReminderModal from "../components/ReminderModal";
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../components/Sidebar";
import {Plus, Calendar, CheckCircle2 } from "lucide-react";
import logo from "../assets/logo.png";
import { getReminders, createReminder, completeReminder, deleteReminder, getWeatherAdvice, getRecommendedPlants } from "../api/auth";
import { useNavigate } from "react-router-dom";
export default function Reminders() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ["All", "Watering", "Fertilizer", "Repotting", "Pruning",];
  const [weatherAdvice, setWeatherAdvice] = useState(null);
  const [recommendedPlants, setRecommendedPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    loadReminders();
    loadWeatherAdvice();
  }, []);

const handleDelete = async(id)=>{
    try{
        await deleteReminder(id);
        loadReminders();
    }
    catch(err){
        console.log(err);
    }
}

  const loadReminders = async () => {
    try {
      const res = await getReminders();
      const sorted = [...res.data].sort((a, b) => {
        const priority = {High: 1, Medium: 2,Low: 3,};

        if (priority[a.priority] !== priority[b.priority]) {
          return priority[a.priority] - priority[b.priority];
      }

      return new Date(
        `${a.reminder_date}T${a.reminder_time}`
        ) - new Date(
        `${b.reminder_date}T${b.reminder_time}`
        );
      });

    setReminders(sorted);
    } catch (err) {
      console.log(err);
    }
  };

const handleMarkDone = async (id) => {
  try {
    setLoadingId(id);

    await completeReminder(id);

    await loadReminders();
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingId(null);
  }
};

  const filteredReminders = reminders.filter((reminder) =>
  activeCategory === "All"
    ? true
    : reminder.reminder_type === activeCategory
);
const formatReminderDate = (date, time) => {
  const reminder = new Date(`${date}T${time}`);

  const today = new Date();
  today.setHours(0,0,0,0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  const compare = new Date(reminder);
  compare.setHours(0,0,0,0);

  const diff =
    Math.floor(
      (compare - today)/(1000*60*60*24)
    );

  let label;

  if(diff===0)
      label="Today";
  else if(diff===1)
      label="Tomorrow";
  else if(diff>1 && diff<=7)
      label=`In ${diff} days`;
  else
      label=reminder.toLocaleDateString("en-IN",{
          day:"numeric",
          month:"short"
      });

  return `${label}, ${reminder.toLocaleTimeString("en-IN",{
      hour:"2-digit",
      minute:"2-digit"
  })}`;
};

const loadWeatherAdvice = () => {
    navigator.geolocation.getCurrentPosition(
        async(position)=>{
            try{
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const res = await getWeatherAdvice(lat,lon);
                setWeatherAdvice(res.data);
                const plantRes = await getRecommendedPlants(lat, lon);
                setRecommendedPlants(plantRes.data);}
            catch(err){console.log(err);}}
    );
};



  return (

    <div className="flex h-screen bg-[#F5F8F5]">
      <Sidebar />
      <div className="flex-1 relative overflow-y-auto">
        <div className="min-h-screen relative p-8 flex justify-center items-center bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1920')",}}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl max-h-full bg-white/85 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 p-6 md:p-8 flex flex-col overflow-hidden z-10">
            <div className="flex items-center justify-between mb-6 flex-shrink-0"><div className="flex items-center mb-6 flex-shrink-0">
              <img src={logo} alt="ChloroScan Logo" className="h-12 object-contain"/>
            </div></div>

            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight">Plant Reminders</h1>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModal(true)}
                className="bg-[#2d8a4e] hover:bg-[#1f6337] text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors">
                <Plus className="w-4 h-4 stroke-[2.5]" /> Add Reminder
              </motion.button>
            </div>
            
            {weatherAdvice && (
              <div className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                    <div className="text-3xl">{weatherAdvice.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-emerald-800">{weatherAdvice.title}</h3>
                      <p className="text-gray-600 mt-1">{weatherAdvice.message}</p>
                    </div>
                </div>
              </div>
            )}

            {recommendedPlants.length > 0 && (
              <div className="mb-6 bg-white border rounded-2xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-emerald-800 mb-3">🌱 Plants Suitable for Today's Weather</h3>

                <div className="flex flex-wrap gap-3">
                  {recommendedPlants.map((plant) => (
                    <motion.div
                      key={plant.model_name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>navigate("/careguide", {state: {modelName: plant.model_name,},
                      })
                      }
                      className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl px-4 py-3 transition-all">
                      <p className="font-semibold text-emerald-700">{plant.plant_name}</p>
                      <p className="text-xs text-gray-500 italic">{plant.scientific_name}</p>
                      <p className="text-[11px] text-emerald-600 mt-1 font-medium">Click to view care guide →</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

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
                        exit={{opacity: 0,scale: 0.95,transition: { duration: 0.2 }}}
                        className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-4"><div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0"><img src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=150&q=80" alt={reminder.plant_name} className="w-full h-full object-cover"/></div><div>
                        <h3 className="font-bold text-[#1b4d3e] text-base">{reminder.plant_name}</h3>
                        <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                            { formatReminderDate(reminder.reminder_date, reminder.reminder_time)}
                        </p>
                      </div>
                    </div>

              <div className="hidden sm:block">
                <span
                  className={`text-xs px-3 py-1 rounded-full
                    ${
                      reminder.priority === "High"? "bg-red-100 text-red-700": reminder.priority === "Medium"? "bg-yellow-100 text-yellow-700": "bg-green-100 text-green-700"}`}>
                      {reminder.reminder_type}
                </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={loadingId === reminder.id}
                  onClick={() => handleMarkDone(reminder.id)}
                  className="border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1 disabled:opacity-50">
                  <CheckCircle2 className="w-4 h-4" />
                  {loadingId === reminder.id ? "Updating..." : "Mark Done"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(reminder.id)}
                  className="border border-red-200 text-red-600 hover:bg-red-50 text-xs px-4 py-2 rounded-xl">Delete</motion.button>
                </motion.div>
                ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[220px] text-center text-slate-400 border-2 border-dashed border-slate-200/60 rounded-2xl flex flex-col items-center justify-center gap-2 bg-white/40">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500/80 stroke-[1.5]" /><span className="text-xs font-semibold tracking-wide">All caught up! No scheduled task reminders here.</span>
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
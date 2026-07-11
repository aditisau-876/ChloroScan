import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaTint, FaInfoCircle, FaSun, FaLightbulb, FaArrowRight, FaLeaf } from "react-icons/fa";
import WeatherWidget from "../components/WeatherWidget";
import Sidebar from "../components/Sidebar";
import { getMyPlants, getReminders } from "../api/auth";
const user = JSON.parse(localStorage.getItem("user"));

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalPlants, setTotalPlants] = useState(0);
  const [plants, setPlants] = useState([]);
  const [nextReminder, setNextReminder] = useState(null);
  useEffect(() => {
    loadPlants();
    loadReminder();
}, []);

  const loadPlants = async () => {
    try {
      const res = await getMyPlants();
      setTotalPlants(res.data.length);
      // show only first four plants
      setPlants(res.data.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const loadReminder = async () => {
  try {
    const res = await getReminders();

    if (res.data.length > 0) {
      setNextReminder(res.data[0]);
    }
  } catch (err) {
    console.log(err);
  }
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      <Sidebar />

      <main className="flex-1 p-8 max-w-[1450px] mx-auto w-full flex flex-col gap-6 overflow-y-auto">
        
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good Morning, {user?.name || "User"}!{" "}
              <motion.span 
                animate={{ rotate: [0, 12, -8, 12, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
                className="inline-block origin-bottom-right text-xl"
              >
                🌿
              </motion.span>
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              Your plants are <span className="font-semibold text-emerald-700">looking healthy</span> today.
            </p>
          </div>
          <WeatherWidget />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.04)" }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between group min-h-[200px]">
            <div>
              <h2 className="font-bold text-slate-800 text-base group-hover:text-emerald-800 transition duration-300">Upload Another Plant</h2>
              <p className="text-slate-400 text-xs mt-0.5">Add a new plant to get started.</p>
            </div>

            <div
  onClick={() => navigate("/")}
  className="mt-4 border-2 border-dashed border-slate-200 group-hover:border-emerald-300 rounded-xl flex-1 flex items-center justify-center cursor-pointer bg-slate-50/50 group-hover:bg-emerald-50/20 transition-all duration-300"
>
              <motion.div 
                whileTap={{ scale: 0.92 }}
                className="bg-white group-hover:bg-emerald-600 shadow-sm group-hover:shadow-emerald-200/50 p-2.5 rounded-full text-emerald-700 group-hover:text-white transform transition-all duration-300">
                <FaPlus size={14} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
  variants={itemVariants}
  whileHover={{
    y: -6,
    boxShadow: "0 12px 30px -10px rgba(0,0,0,0.04)",
  }}
  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[200px]"
>
  <div>
    <h2 className="font-bold text-slate-800 text-base">
      Today's Reminder
    </h2>

    {nextReminder ? (
      <motion.div
        whileHover={{ x: 4 }}
        onClick={() => navigate("/reminders")}
        className="mt-4 bg-emerald-50/30 border border-emerald-50/60 rounded-xl p-2.5 flex items-center gap-3 cursor-pointer"
      >
        <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
          <FaTint size={12} />
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800">
            {nextReminder.reminder_type} {nextReminder.plant_name}
          </h4>

          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            {new Date(
              `${nextReminder.reminder_date}T${nextReminder.reminder_time}`
            ).toLocaleString()}
          </p>
        </div>
      </motion.div>
    ) : (
      <div className="mt-6 text-center text-gray-400 text-sm">
        🌿 No upcoming reminders
      </div>
    )}
  </div>

  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={() => navigate("/reminders")}
    className="mt-4 w-full bg-[#1E6B3E] hover:bg-[#154d2c] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
  >
    View All
  </motion.button>
</motion.div>
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgba(16,185,129,0.08)" }}
            className="bg-gradient-to-b from-[#F4F9F5] to-[#ECF5EE] rounded-2xl border border-emerald-100/60 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-sm">
                  <FaLightbulb size={11} />
                </div>
                <h3 className="text-xs font-bold text-slate-800 tracking-wide">Daily Tip</h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium mt-3.5">
                Wipe the leaves of your plants regularly to keep them dust free and allow better photosynthesis.
              </p>
            </div>
            
            <div className="mt-2 pt-2 border-t border-emerald-200/40 flex justify-between items-center text-emerald-700/20 group-hover:text-emerald-700/40">
              <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-700/60">Tip of the day</span>
              <FaLeaf size={16} className="transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 text-emerald-600/40" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Your Plants</h2>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{totalPlants} Total</span>
            <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate("/myplants")}
  className="ml-auto flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 text-xs font-bold bg-emerald-50/50 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition duration-300 cursor-pointer group"
>
  View All Plants
  <FaArrowRight
    size={9}
    className="transform group-hover:translate-x-0.5 transition-transform"
  />
</motion.button>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch"
          >
            {plants.length === 0 ? (

  <div className="col-span-4 text-center py-12 text-gray-500">

    <h3 className="font-semibold text-lg">
      No Plants Added Yet 🌱
    </h3>

    <p className="mt-2 text-sm">
      Add plants from the Care Guide to see them here.
    </p>

  </div>

) : (

plants.map((plant) => (

<motion.div
    key={plant.id}
    variants={itemVariants}
    whileHover={{
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0,0,0,.05),0 10px 10px -5px rgba(0,0,0,.03)"
    }}
    onClick={() =>
      navigate("/careguide", {
        state: {
          modelName: plant.model_name
        }
      })
    }
    className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex flex-col justify-between group cursor-pointer"
>

    <div>

        <div className="w-full h-44 bg-slate-100 rounded-xl overflow-hidden">

            <motion.img
                src={plant.image_url}
                alt={plant.plant_name}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: .4 }}
                className="w-full h-full object-cover"
            />

        </div>

        <div className="mt-3 px-1">

            <h3 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800">

                {plant.plant_name}

            </h3>

            <p className="text-[11px] italic text-gray-400 mt-1">

                {plant.scientific_name}

            </p>

        </div>

    </div>

    <div className="mt-4 px-1 flex justify-between items-center">

        <div className="flex items-center gap-1.5">

            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

            <p className="text-[11px] font-semibold text-emerald-600">

                Added to Garden

            </p>

        </div>

        <FaLeaf className="text-emerald-500"/>

    </div>

</motion.div>

))

)}
          </motion.div>
        </motion.div>

      </main>
    </div>
  );
}
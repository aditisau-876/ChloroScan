import React, { useState, useEffect } from 'react';
import { getMyPlants } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from "../components/Sidebar";
import { Leaf, Home, Sprout, Bell, LogOut, Search, BookOpen, ChevronRight, Info } from 'lucide-react';
import { searchPlants } from "../api/auth";
import WeatherWidget from "../components/WeatherWidget";
export default function MyPlants() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {loadPlants();}, []);
  
  const loadPlants = async () => {
  try {
    const res = await getMyPlants();
    console.log("My Garden:", res.data);
    const plantsWithStatus = res.data.map((plant) => ({...plant,added: true,}));
    setPlants(plantsWithStatus);
    } catch (err) {console.log(err);}
    };

  const [search, setSearch] = useState("");

  const handleSearch = async () => {if (!search.trim()) {
    loadPlants();
    return;}
  try {
    const res = await searchPlants(search);
    console.log("Search Results:", res.data);
    setPlants(res.data);
  } catch (err) {console.log(err);}
  };

  const containerVariants = {hidden: { opacity: 0 },show: {opacity: 1,transition: { staggerChildren: 0.08 } }};

  const cardVariants = {hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }};

  return (
    <div className="flex h-screen w-screen bg-[#F8F9FA] font-sans antialiased gap-6">
      <Sidebar />
      
      {/* CHANGED: Removed pl-72 and adjusted max-w for a tighter, screen-centered professional layout */}
      <main className="flex-1 px-8 py-8 overflow-y-auto max-w-[1250px] mx-auto w-full">
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              My Plants <motion.span animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-2xl origin-bottom-right inline-block">🌿</motion.span>
            </h2>
            <p className="text-gray-500 mt-1">Manage your plants and keep them healthy.</p>
          </div>
          <WeatherWidget />
        </motion.header>

        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-full text-emerald-700">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Search Our Plant Database</h3>
              <p className="text-xs text-gray-400">Learn more about plants in our dataset.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto max-w-md flex-1 items-center relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4" />
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {handleSearch();}}}
                placeholder="Search for a plant..."
              className="w-full pl-11 pr-14 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm transition-all focus:shadow-inner" />
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="absolute right-1.5 bg-[#198754] text-white p-1.5 rounded-lg hover:bg-emerald-700 transition">
              <Search className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.section>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            Your Plants <span className="text-xs font-normal text-gray-400 ml-2">You have {plants.length} plants</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Sort by:</span>
            <select className="text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer hover:border-gray-300 transition">
              <option>Recent</option>
              <option>Name</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {plants.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-700">No Plants Yet 🌱</h2>
                <p className="text-gray-500 mt-2">Add plants from the Care Guide to build your garden.</p>
              </div>
            </div>
  ) : (
    plants.map((plant) => (
      <motion.div
        key={plant.id}
        variants={cardVariants}
        whileHover={{y: -6,boxShadow:"0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)"}}
        className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 transition-shadow duration-300 overflow-hidden relative group">

        <div className="w-1/3 aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden shrink-0 relative">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={plant.image_url}
            alt={plant.plant_name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <h4 className="font-bold text-gray-800 text-lg group-hover:text-emerald-800 transition-colors">
              {plant.plant_name}
            </h4>

        <div
          className={`flex items-center gap-1.5 text-xs font-semibold mt-1 ${plant.added === true ? "text-emerald-600" : "text-gray-500"}`}>
          <span className={`w-2 h-2 rounded-full ${plant.added === true ? "bg-emerald-500" : "bg-gray-400"}`}></span>
          {plant.added === true ? "Added to Garden" : "Not in Garden"}
        </div>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Scientific Name
            </p>
            <p className="text-xs font-semibold italic text-gray-700 mt-0.5">
              {plant.scientific_name}
            </p>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/careguide", {state: {modelName: plant.model_name}})}
              className="w-full mt-3 border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/30 rounded-xl py-2 px-3 text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 group/btn transition-all">
              <BookOpen className="w-3.5 h-3.5" />Care Guide
              <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))
  )}
</motion.section>
      </main>
    </div>
  );
}
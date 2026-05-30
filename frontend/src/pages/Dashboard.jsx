import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaLeaf, FaBell, FaSignOutAlt, FaPlus, FaTint, FaInfoCircle, FaSun,FaLightbulb,FaArrowRight} from "react-icons/fa";
import WeatherWidget from "../components/WeatherWidget";
const user = JSON.parse(localStorage.getItem("user"));
const plants = [
  {
    name: "Aloe Vera",
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
  },
  {
    name: "Snake Plant",
    status: "Needs Water",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500",
  },
  {
    name: "Peace Lily",
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=500",
  },
  {
    name: "Golden Pothos",
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500",
  },
];

export default function Dashboard() {

  const navigate = useNavigate();
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      <aside className="w-64 bg-[#0F3A20] text-white p-5 flex flex-col justify-between shadow-xl select-none flex-shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-2">
            <FaLeaf className="text-xl text-green-400 transform -rotate-12" />
            <h1 className="text-xl font-bold tracking-tight">ChloroScan</h1>
          </div>

          <nav className="mt-8 flex flex-col gap-1.5">
            <button className="flex items-center gap-4 bg-[#1E4D32] px-4 py-3 rounded-xl text-sm font-semibold shadow-inner transition duration-300 text-left w-full cursor-pointer">
              <FaHome size={15} />Home</button>

            <button 
            onClick={() => navigate("/myplants")}
            className="flex items-center gap-4 text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:translate-x-1 text-left w-full cursor-pointer">
              <FaLeaf size={15} />My Plants
            </button>

            <button className="flex items-center gap-4 text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:translate-x-1 text-left w-full cursor-pointer">
              <FaBell size={15} />Reminders</button>
          </nav>
        </div>

        <div className="pt-3 border-t border-white/10">
          <button className="flex items-center gap-4 text-slate-300 hover:text-red-200 hover:bg-red-500/20 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left w-full cursor-pointer">
            <FaSignOutAlt size={15} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 max-w-[1450px] mx-auto w-full flex flex-col gap-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good Morning, {user?.name || "User"}! <span className="inline-block animate-bounce duration-1000 text-xl">🌿</span>
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              Your plants are <span className="font-semibold text-emerald-700">looking healthy</span> today.
            </p>
          </div>
          <WeatherWidget />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between group min-h-[200px]">
            <div>
              <h2 className="font-bold text-slate-800 text-base group-hover:text-emerald-800 transition duration-300">Upload Another Plant</h2>
              <p className="text-slate-400 text-xs mt-0.5">Add a new plant to get started.</p>
            </div>

            <div className="mt-4 border-2 border-dashed border-slate-200 group-hover:border-emerald-300 rounded-xl flex-1 flex items-center justify-center cursor-pointer bg-slate-50/50 group-hover:bg-emerald-50/20 transition-all duration-300">
              <div className="bg-white group-hover:bg-emerald-600 shadow-sm group-hover:shadow-emerald-200/50 p-2.5 rounded-full text-emerald-700 group-hover:text-white transform group-hover:scale-110 transition-all duration-300">
                <FaPlus size={14} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[200px]">
            <div>
              <h2 className="font-bold text-slate-800 text-base">Today's Reminder</h2>
              
              <div className="mt-4 bg-emerald-50/30 border border-emerald-50/60 rounded-xl p-2.5 flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                  <FaTint size={12} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Water your Snake Plant</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Tomorrow, 08:00 AM</p>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-[#1E6B3E] hover:bg-[#154d2c] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm hover:shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98] transition-all duration-300 cursor-pointer">
              View All
            </button>
          </div>

          <div className="bg-gradient-to-b from-[#F4F9F5] to-[#ECF5EE] rounded-2xl border border-emerald-100/60 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group min-h-[200px]">
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
              <FaLeaf size={16} className="transform -rotate-12 transition-transform duration-500 group-hover:rotate-0" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Your Plants</h2>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {plants.length} Total
            </span>
            
            <button className="ml-auto flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 text-xs font-bold bg-emerald-50/50 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition duration-300 cursor-pointer group">
              View All Plants
              <FaArrowRight size={9} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            {plants.map((plant) => (
              <div
                key={plant.name}
                className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                <div>
                  <div className="w-full h-44 bg-slate-100 rounded-xl overflow-hidden relative">
                    <img src={plant.image} alt={plant.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="mt-3 px-1">
                    <h3 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800 transition duration-300">{plant.name}</h3>
                  </div>
                </div>
                
                <div className="mt-4 px-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      plant.status === "Healthy" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`} />
                    <p className={`text-[11px] font-semibold ${
                      plant.status === "Healthy" ? "text-emerald-600" : "text-amber-600"}`}>{plant.status}
                    </p>
                  </div>

                  <button className="text-slate-300 group-hover:text-slate-500 hover:scale-110 transition duration-300">
                    {plant.status === "Healthy" ? (<FaSun size={11} className="text-emerald-500" />) : (<FaInfoCircle size={11} className="text-amber-500" />)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
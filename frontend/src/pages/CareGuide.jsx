import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Sun, Layers, Thermometer, Cloud, Sprout, Heart, ScanLine, ChevronRight, ShieldCheck, Activity } from 'lucide-react';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addPlant, removePlant, checkPlant } from "../api/auth";
import logo from "../assets/logo.png";
import Sidebar from "../components/Sidebar";
export default function CareGuide() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modelName: urlModelName } = useParams();
  const modelName = location.state?.modelName || urlModelName;
  console.log("Location State:", location.state);
  console.log("Model Name:", modelName);
  const [activeTab, setActiveTab] = useState('Care Guide');
  const [isFavorite, setIsFavorite] = useState(false);
  const [adding, setAdding] = useState(false);
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInGarden, setIsInGarden] = useState(false);
  const tabs = ['Care Guide', 'Growth Info', 'Problems', 'Similar Plants', 'Medicinal Use'];
  useEffect(() => {
    console.log("Fetching plant:", modelName);

    if (!modelName) {
      console.log("No model name found");
      setLoading(false);
      return;
    }

    fetch(`https://chloroscan.onrender.com/plant/${encodeURIComponent(modelName)}`)
      .then(res => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then(async (data) => {
        console.log("Plant data:", data);

        setPlant(data);

        try {
          const res = await checkPlant(data.id);
          setIsFavorite(res.data.added);
        } catch (err) {console.error(err);}

        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [modelName]);

  const careDetails = plant
    ? [
      {
        id: "watering",
        icon: <Droplet className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Watering",
        description: plant.watering
      },
      {
        id: "sunlight",
        icon: <Sun className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Sunlight",
        description: plant.sunlight
      },
      {
        id: "soil",
        icon: <Layers className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Soil",
        description: plant.soil
      },
      {
        id: "temperature",
        icon: <Thermometer className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Temperature",
        description: plant.temperature
      },
      {
        id: "humidity",
        icon: <Cloud className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Humidity",
        description: plant.humidity
      },
      {
        id: "fertiliser",
        icon: <Sprout className="w-5 h-5 text-[#1b4d3e]" />,
        title: "Fertiliser",
        description: plant.fertiliser
      }
    ]
    : [];

  const toggleGarden = async () => {
    try {

      if (isFavorite) {
        await removePlant(plant.id);
        setIsFavorite(false);
      } else {
        await addPlant(plant.id);
        setIsFavorite(true);
      }

    } catch (err) {console.log(err);
    }};

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
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">Loading...</div>);
    }

  if (!plant) {
    return (
      <div className="h-screen flex items-center justify-center">Plant not found</div>);
  }
  return (
    <div className="flex h-screen bg-[#F5F8F5]">
      <Sidebar />
      <div className="flex-1 relative overflow-y-auto">
        <div
          className="min-h-screen relative p-8 flex justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage:"url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1920')",}}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-5xl max-h-full bg-white/85 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 p-5 md:p-8 flex flex-col overflow-hidden z-10">

            <div className="flex items-center mb-6 flex-shrink-0">
              <img src={logo} alt="ChloroScan Logo" className="h-12 object-contain"/>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6 flex-shrink-0">

              <motion.div whileHover={{ scale: 1.01 }} className="w-full md:w-64 h-44 md:h-52 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border border-white/60 relative group">
                <img src={plant.image_url} alt={plant.plant_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
              </motion.div>

              <div className="flex-1 text-center md:text-left w-full pt-1">
                <div className="text-[10px] font-bold text-[#2d8a4e] tracking-widest uppercase mb-0.5">{plant.family}</div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b4d3e] tracking-tight mb-0.5">{plant.plant_name}</h1>
                <p className="text-slate-500 italic text-base mb-4 font-medium">{plant.scientific_name}</p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <motion.button
                    onClick={toggleGarden}
                    whileTap={{ scale: 0.97 }}
                    className={`font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors duration-200 flex items-center gap-2 ${isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#2d8a4e] hover:bg-[#206639] text-white"}`}>
                    {isFavorite ? "Remove from Garden" : "Add to My Garden"}
                    <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={toggleGarden}
                    className={`border p-2.5 rounded-xl transition-all duration-300 shadow-2xs backdrop-blur-xs ${isFavorite ? "bg-rose-50/90 border-rose-200 text-rose-500" : "border-slate-200/80 bg-white/50 text-slate-400 hover:text-slate-600 hover:bg-white" }`}>
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : "fill-none" }`}/>
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200/60 mb-5 relative flex-shrink-0">
              <nav className="flex gap-6 -mb-px overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-sm font-semibold transition-colors duration-200 relative whitespace-nowrap ${isActive ? 'text-[#2d8a4e]' : 'text-slate-500 hover:text-slate-700'
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

                {activeTab === 'Medicinal Use' && (
                  <motion.div
                    key="medicinal-use"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[180px] text-center text-slate-500 border-2 border-dashed border-slate-200/60 rounded-xl flex flex-col items-center justify-center gap-1.5 bg-white/40 backdrop-blur-xs"
                  >
                    <Activity className="w-6 h-6 text-emerald-600 stroke-1 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide"><p className="max-w-3xl text-center text-slate-700">{plant.medicinal_uses}</p></span>
                  </motion.div>
                )}

                {activeTab === "Growth Info" && (
                  <motion.div
                    key="growth-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/70 rounded-xl p-6 shadow-sm"
                  >
                    <h2 className="text-2xl font-bold text-[#1b4d3e] mb-4">Growth Information</h2>
                    <p className="text-slate-700 leading-relaxed mb-5">{plant.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#1b4d3e]">Bloom Time:</span>
                      <span>{plant.bloom_time}</span>
                    </div>
                  </motion.div>
                )}
                {activeTab === "Problems" && (
                  <motion.div
                    key="problems"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/70 rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-[#1b4d3e] mb-4">Common Problems</h2>
                    <p className="text-slate-700 leading-relaxed">{plant.common_diseases}</p>
                  </motion.div>
                )}
                {activeTab === "Similar Plants" && (
                  <motion.div
                    key="similar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {plant.similar_plants.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          console.log(item);
                          navigate(
                            `/careguide/${encodeURIComponent(item.model_name)}`,
                            {
                              state: {
                                modelName: item.model_name
                              }
                            }
                          );
                        }}
                        className="bg-white rounded-xl p-4 shadow cursor-pointer transition-all duration-300 hover:shadow-lg"
                      >
                        <img src={item.image_url} alt={item.plant_name} className="h-32 w-full object-cover rounded-lg"/>
                        <h3 className="mt-3 font-bold text-[#1b4d3e]">{item.plant_name}</h3>
                        <p className="text-sm italic text-gray-500">{item.scientific_name}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  )
}
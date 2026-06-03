import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from "../components/Sidebar";
import { Leaf, Home, Sprout, Bell, LogOut, Sun, Search, BookOpen, ChevronRight, Info } from 'lucide-react';

export default function MyPlants() {
  const navigate = useNavigate();

  // Updated dataset: Maintained Unsplash IDs and added scientific_name keys to fix the care guide navigation
  const plants = [
    { id: 1, name: 'Snake Plant', scientific_name: 'Sansevieria trifasciata', status: 'Needs Water', statusType: 'warning', lastCared: '2 days ago', img: 'https://thfvnext.bing.com/th/id/OIP.GZ08hEyXtXXFEQt1h1skxwHaLG?w=129&h=193&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 2, name: 'Aloe Vera', scientific_name: 'Aloe barbadensis miller', status: 'Healthy', statusType: 'success', lastCared: '1 day ago', img: 'data:image/webp;base64,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_ADTY7gU/v5DWrMNbp0Ch2wZwD8kZ2CA9/z8JgOmY1fGjIcea3HN0jiaVgC3IdpJ56yN3zqsSytE5UjeQKcio8BZo3R5vJrQj1V7UYALXIDIs5fV62/hh2FCVQjBGSCa+lsokeEs9SGq36i+6pICvv+ddxpjWYloCVEr0B1xXUtD4lbKHrjFg8KtsBXeoaiz2mmPxlONWbXzv+T8si0n8si+oe/VlfMIrfMSY4JJHsozkVv/fm/ODUTVxGxfTBQsfbEaQA/ny1AS4RUlTYgAAA==' },
    { id: 3, name: 'Peace Lily', scientific_name: 'Spathiphyllum', status: 'Healthy', statusType: 'success', lastCared: '3 days ago', img: 'https://thfvnext.bing.com/th/id/OIP.TB99NIg00XRq2U5PWVf52AHaHa?w=190&h=189&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 4, name: 'Money Plant', scientific_name: 'Epipremnum aureum', status: 'Healthy', statusType: 'success', lastCared: 'Yesterday', img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Spider Plant', scientific_name: 'Chlorophytum comosum', status: 'Healthy', statusType: 'success', lastCared: '2 days ago', img: 'https://thfvnext.bing.com/th/id/OIP.jzpLYkNheTv15zSyhE1rXwHaHa?w=193&h=193&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 6, name: 'Rubber Plant', scientific_name: 'Ficus elastica', status: 'Healthy', statusType: 'success', lastCared: '1 day ago', img: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=400&q=80' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

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
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 cursor-pointer">
            <div className="text-amber-500 bg-amber-50 p-2 rounded-xl">
              <Sun className="w-6 h-6 fill-amber-500/20" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">25°C</div>
              <div className="text-xs text-gray-400 font-medium">Humidity 60%</div>
            </div>
          </motion.div>
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
              type="text" 
              placeholder="Search for a plant..." 
              className="w-full pl-11 pr-14 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm transition-all focus:shadow-inner" />
            <motion.button 
              whileTap={{ scale: 0.95 }}
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
          {plants.map((plant) => (
            <motion.div 
              key={plant.id} 
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 transition-shadow duration-300 overflow-hidden relative group">
              <div className="w-1/3 aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden shrink-0 relative">
                <motion.img 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={plant.img} 
                  alt={plant.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg group-hover:text-emerald-800 transition-colors">{plant.name}</h4>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold mt-1 ${
                    plant.statusType === 'warning' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      plant.statusType === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                    }`}></span> 
                    {plant.status}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Last cared for</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{plant.lastCared}</p>
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/careguide", {state: {scientificName: plant.scientific_name}})}
                    className="w-full mt-3 border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/30 rounded-xl py-2 px-3 text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 group/btn transition-all">
                    <BookOpen className="w-3.5 h-3.5" /> Care Guide
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        
      </main>
    </div>
  );
}
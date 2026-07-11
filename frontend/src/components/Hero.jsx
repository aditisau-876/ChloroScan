import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal";

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    return (
        <section className="min-h-screen flex items-center py-12 lg:py-0">
            <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">Identify Any{" "} <span className="text-green-600">Plant</span> {" "}Instantly</h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"> Upload a plant image and get instant care guides, watering reminders, blooming seasons, and smart AI suggestions.</p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition shadow-xl">Upload Plant Image</button>
                            <button onClick={() => navigate("/login")} className="w-full sm:w-auto px-8  py-4 rounded-2xl border border-gray-300 bg-white hover:bg-gray-100 transition text-lg font-medium">Learn More</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
                            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-lg">Instant Detection</h3>
                                <p className="text-gray-500 text-sm mt-2">AI identifies plants instantly.</p>
                            </div>
                            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-lg">Detailed Care</h3>
                                <p className="text-gray-500 text-sm mt-2">Watering and sunlight tips.</p>
                            </div>
                            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-lg">Smart Reminders</h3>
                                <p className="text-gray-500 text-sm mt-2">Never miss care routines.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex justify-center mt-8 lg:mt-0">
                        <div className="relative">
                            <div className="absolute -z-10 w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] bg-green-100 rounded-full blur-3xl top-12 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0"></div>
                            <img src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop" alt="Plant" className="w-[380px] lg:w-[470px] h-[580px] object-cover rounded-[45px] shadow-2xl"/>
                        </div>
                    </motion.div>
                </div>
            </div>
            {showModal && (<UploadModal closeModal={() => setShowModal(false)}/>)}
        </section>
    );
};
export default Hero;
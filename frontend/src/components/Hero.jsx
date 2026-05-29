import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal";

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    return (
        <section className="min-h-[82vh] flex items-center">
            <div className="max-w-[1500px] mx-auto px-8 lg:px-16 w-full">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl">

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">Identify Any{" "} <span className="text-green-600">Plant</span> {" "}Instantly</h1>
                        <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl"> Upload a plant image and get instant care guides, watering reminders, blooming seasons, and smart AI suggestions.</p>
                        <div className="mt-10 flex flex-wrap gap-5">
                            <button onClick={() => setShowModal(true)} className="px-9 py-4 rounded-2xl bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition shadow-xl">Upload Plant Image</button>
                            <button onClick={() => navigate("/login")} className="px-9 py-4 rounded-2xl border border-gray-300 bg-white hover:bg-gray-100 transition text-lg font-medium">Learn More</button>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-5 mt-14">
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

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center">

                        <div className="relative">
                            <div className="absolute -z-10 w-[450px] h-[450px] bg-green-100 rounded-full blur-3xl top-20 left-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop" alt="Plant" className="w-[380px] lg:w-[470px] h-[580px] object-cover rounded-[45px] shadow-2xl"/>
                        </div>
                    </motion.div>
                </div>
            </div>
            {showModal && (
                <UploadModal closeModal={() => setShowModal(false)}/>
            )}
        </section>
    );
};

export default Hero;
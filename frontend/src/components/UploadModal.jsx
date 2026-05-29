import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCheck, FaTimes, FaCamera, FaCloudUploadAlt } from "react-icons/fa";

const UploadModal = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const processFile = async (file) => {
  if (file && file.type.startsWith("image/")) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://127.0.0.1:8000/predict",formData,{headers: {"Content-Type": "multipart/form-data"}});
      console.log(response.data);
      setPrediction(response.data);
      setAnalyzing(false);
      setResult(true);
    } catch (error) {
      console.error(error);
      setAnalyzing(false);
      alert("Prediction failed");
    }
  }
};

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };
  const handleClose = () => {
  setImage(null);
  setPrediction(null);
  setResult(false);
  setAnalyzing(false);

  closeModal();
};

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 px-4 select-none">
      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.98 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white w-full max-w-4xl rounded-[32px] p-8 relative shadow-2xl overflow-hidden border border-slate-100">
        <button onClick={handleClose} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition duration-200 cursor-pointer"><FaTimes size={14} /> </button>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-6">
              <div className="md:col-span-5 relative group">
                <img src={image} alt="Captured plant analytics" className="w-full h-[320px] object-cover rounded-2xl shadow-sm border border-slate-100"/>
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md"><FaCheck size={9} /> Scan Verified</div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">Best Match</div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">{prediction?.result?.plant_name || "Unknown Plant"}</h2>
                  <p className="text-slate-400 text-sm italic font-medium mt-0.5">AI Plant Classification Result</p>

                  <div className="mt-6 bg-slate-50/60 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confidence Matrix</p>
                      <p className="text-2xl font-black text-emerald-600">{prediction?.result?.confidence || 0}%</p>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full animate-pulse transition-all duration-500" style={{width: `${prediction?.result?.confidence || 0}%`}}/>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium">{prediction?.care_guide?.description}</p>
                </div>

                <div className="mt-6 bg-gradient-to-r from-emerald-50/40 to-teal-50/20 p-4 rounded-2xl border border-emerald-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="max-w-md">
                    <h3 className="text-xs font-bold text-slate-800">Unlock Full Care Profiles</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium"> Create an account to track watering histories, trigger custom notifications, and access detailed diagnostics.</p>
                  </div>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition duration-200 cursor-pointer whitespace-nowrap">Get Started
                  </button>
                </div>
              </div>
            </motion.div>

          ) : analyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin" />
                <div className="absolute text-2xl text-emerald-600 animate-pulse">🌿</div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mt-8 tracking-tight">Analyzing Biological Signature...</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Comparing morphologic features against our engine matrices</p>

              <div className="mt-6 space-y-2 bg-slate-50 border border-slate-100 p-4 rounded-xl text-left w-64 shadow-inner">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />Isolating geometric leaf boundaries</div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pl-3.5">Cross-referencing global taxonomy</div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pl-3.5">Compiling clinical guidelines</div>
              </div>
            </motion.div>

          ) : (
            <motion.div key="upload" className="mt-4">
              <div className="text-center max-w-md mx-auto mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Upload Plant Sample</h1>
                <p className="text-slate-400 text-xs mt-1 font-medium">Provide a clear perspective photo for our machine analysis models.</p>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  processFile(e.dataTransfer.files[0]);
                }}
                onClick={() => document.getElementById("canvasFileGateway").click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-10 text-center bg-slate-50/50 hover:bg-emerald-50/10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[260px] group relative"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-sm text-slate-400 group-hover:text-emerald-600 group-hover:shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 mb-4 border border-slate-100">
                  <FaCloudUploadAlt size={22} />
                </div>

                <h2 className="text-base font-bold text-slate-800 tracking-tight">Drag & Drop Plant Image</h2>
                <p className="text-slate-400 text-xs mt-1 font-medium max-w-xs">Support standard formats or tap to browse local file directories directly</p>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-100/50"><FaCamera size={11} /> Open Camera</div>

                <input id="canvasFileGateway" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleInputChange}/>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadModal;
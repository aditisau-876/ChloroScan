import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaCamera,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaExclamationTriangle
} from "react-icons/fa";

const UploadModal = ({
  closeModal,
  loggedIn = false,
}) => {

  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const navigate = useNavigate();


  // ==================================================
  // PROCESS IMAGE
  // ==================================================

  const processFile = async (file) => {

    if (
      file &&
      file.type &&
      file.type.startsWith("image/")
    ) {

      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      setAnalyzing(true);
      setResult(false);

      try {

        const formData = new FormData();

        formData.append(
          "file",
          file
        );

        const response = await axios.post(
          "https://chloroscan-y5cl.onrender.com/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log(
          "ChloroScan prediction:",
          response.data
        );

        setPrediction(
          response.data
        );

        setAnalyzing(false);
        setResult(true);

      } catch (error) {

        console.error(
          "Prediction error:",
          error
        );

        setAnalyzing(false);

        alert(
          "Prediction failed. Please try again."
        );
      }
    }
  };


  // ==================================================
  // FILE INPUT
  // ==================================================

  const handleInputChange = (e) => {

    const file = e.target.files[0];

    processFile(file);
  };


  // ==================================================
  // CLOSE MODAL
  // ==================================================

  const handleClose = () => {

    setImage(null);
    setPrediction(null);
    setResult(false);
    setAnalyzing(false);

    closeModal();
  };


  // ==================================================
  // IDENTIFICATION DATA
  // ==================================================

  const identification =
    prediction?.identification;

  const finalPrediction =
    identification?.final_prediction;

  const plantData =
    prediction?.plant_data;

  const primarySource =
    identification?.primary_source;

  const status =
    identification?.status;

  const verified =
    identification?.verified;


  // ==================================================
  // PLANT NAME
  // ==================================================

  const plantName =
    plantData?.plant_name ||
    finalPrediction?.common_names?.[0] ||
    "Unknown Plant";


  // ==================================================
  // SCIENTIFIC NAME
  // ==================================================

  const scientificName =
    plantData?.scientific_name ||
    finalPrediction?.scientific_name ||
    "";


  // ==================================================
  // CONFIDENCE
  //
  // IMPORTANT:
  // This is Pl@ntNet's confidence because
  // Pl@ntNet is our primary identification source.
  // ==================================================

  const apiConfidence =
    finalPrediction?.confidence || 0;


  // ==================================================
  // OUR MODEL INFORMATION
  // ==================================================

  const ourModel =
    identification?.our_model;

  const ourModelName =
    ourModel?.plant_name;

  const ourModelConfidence =
    ourModel?.confidence || 0;


  // ==================================================
  // CHECK WHETHER BOTH MODELS AGREE
  // ==================================================

  const modelsAgree =
    verified === true &&
    status === "confirmed";


  // ==================================================
  // CHECK API CONFLICT
  // ==================================================

  const apiConflict =
    status === "api_primary_conflict";


  // ==================================================
  // API UNAVAILABLE
  // ==================================================

  const apiUnavailable =
    status === "plantnet_unavailable" ||
    status === "plantnet_no_result";


  return (

    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 px-4 select-none">

      <motion.div

        initial={{
          opacity: 0,
          y: 15,
          scale: 0.98
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}

        exit={{
          opacity: 0,
          y: 15,
          scale: 0.98
        }}

        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}

        className="bg-white w-full max-w-4xl rounded-[32px] p-8 relative shadow-2xl overflow-hidden border border-slate-100"
      >

        {/* ==================================================
            CLOSE BUTTON
        ================================================== */}

        <button

          onClick={handleClose}

          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition duration-200 cursor-pointer"

        >

          <FaTimes size={14} />

        </button>


        <AnimatePresence mode="wait">

          {/* ==================================================
              RESULT
          ================================================== */}

          {result ? (

            <motion.div

              key="result"

              initial={{
                opacity: 0,
                x: 10
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-6"
            >

              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div className="md:col-span-5 relative group">

                <img

                  src={image}

                  alt="Captured plant"

                  className="w-full h-[320px] object-cover rounded-2xl shadow-sm border border-slate-100"

                />


                {/* Verification badge */}

                {modelsAgree ? (

                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">

                    <FaCheck size={9} />

                    AI Verified

                  </div>

                ) : (

                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">

                    <FaExclamationTriangle size={9} />

                    Review Result

                  </div>

                )}

              </div>


              {/* ==================================================
                  RESULT INFORMATION
              ================================================== */}

              <div className="md:col-span-7 flex flex-col justify-between min-h-[320px]">

                <div>


                  {/* ==================================================
                      PRIMARY SOURCE BADGE
                  ================================================== */}

                  <div className="flex flex-wrap gap-2">

                    {primarySource === "plantnet" && (

                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">

                        <FaShieldAlt size={11} />

                        Pl@ntNet Primary

                      </div>

                    )}


                    {modelsAgree && (

                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">

                        <FaCheck size={10} />

                        ChloroScan Verified

                      </div>

                    )}

                  </div>


                  {/* ==================================================
                      PLANT NAME
                  ================================================== */}

                  <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">

                    {plantName}

                  </h2>


                  {/* ==================================================
                      SCIENTIFIC NAME
                  ================================================== */}

                  {scientificName && (

                    <p className="text-slate-400 text-sm italic font-medium mt-0.5">

                      {scientificName}

                    </p>

                  )}


                  {/* ==================================================
                      IDENTIFICATION SOURCE
                  ================================================== */}

                  <p className="text-slate-500 text-xs mt-2 font-medium">

                    {primarySource === "plantnet"

                      ? "Primary identification provided by Pl@ntNet"

                      : "Identification provided by ChloroScan AI"

                    }

                  </p>


                  {/* ==================================================
                      CONFIDENCE CARD
                  ================================================== */}

                  <div className="mt-6 bg-slate-50/60 rounded-xl p-4 border border-slate-100">

                    <div className="flex items-center justify-between mb-2">

                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">

                        Identification Confidence

                      </p>

                      <p className="text-2xl font-black text-emerald-600">

                        {apiConfidence}%

                      </p>

                    </div>


                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">

                      <div

                        className="bg-emerald-600 h-full rounded-full transition-all duration-700"

                        style={{
                          width: `${Math.min(
                            apiConfidence,
                            100
                          )}%`
                        }}

                      />

                    </div>


                    <p className="text-[10px] text-slate-400 mt-2">

                      Confidence shown above is from the primary Pl@ntNet identification.

                    </p>

                  </div>


                  {/* ==================================================
                      VERIFIED MESSAGE
                  ================================================== */}

                  {modelsAgree && (

                    <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3">

                      <div className="flex items-start gap-2">

                        <FaCheck
                          className="text-emerald-600 mt-0.5"
                          size={12}
                        />

                        <div>

                          <p className="text-xs font-bold text-emerald-800">

                            Verified by ChloroScan AI

                          </p>

                          <p className="text-[11px] text-emerald-700 mt-0.5">

                            Our TensorFlow model independently identified this plant as{" "}

                            <strong>
                              {ourModelName}
                            </strong>{" "}

                            with {ourModelConfidence}% confidence.

                          </p>

                        </div>

                      </div>

                    </div>

                  )}


                  {/* ==================================================
                      CONFLICT MESSAGE
                  ================================================== */}

                  {apiConflict && (

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">

                      <div className="flex items-start gap-2">

                        <FaExclamationTriangle
                          className="text-amber-600 mt-0.5"
                          size={12}
                        />

                        <div>

                          <p className="text-xs font-bold text-amber-800">

                            Identification systems disagree

                          </p>

                          <p className="text-[11px] text-amber-700 mt-0.5">

                            Pl@ntNet is being used as the primary identification.

                            Our model suggested{" "}

                            <strong>
                              {ourModelName || "another plant"}
                            </strong>

                            {ourModelConfidence
                              ? ` (${ourModelConfidence}% confidence)`
                              : ""
                            }.

                          </p>

                        </div>

                      </div>

                    </div>

                  )}


                  {/* ==================================================
                      API UNAVAILABLE
                  ================================================== */}

                  {apiUnavailable && (

                    <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500">

                        Pl@ntNet was unavailable for this scan, so ChloroScan's local AI result is being used.

                      </p>

                    </div>

                  )}


                  {/* ==================================================
                      DESCRIPTION
                  ================================================== */}

                  {plantData?.description && (

                    <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium">

                      {plantData.description}

                    </p>

                  )}

                </div>


                {/* ==================================================
                    BOTTOM ACTION
                ================================================== */}

                <div className="mt-6 bg-gradient-to-r from-emerald-50/40 to-teal-50/20 p-4 rounded-2xl border border-emerald-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  <div className="max-w-md">

                    <h3 className="text-xs font-bold text-slate-800">

                      Unlock Full Care Profiles

                    </h3>

                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">

                      Create an account to track watering histories, trigger custom notifications, and access detailed diagnostics.

                    </p>

                  </div>


                  {loggedIn ? (

                    <button

                      onClick={handleClose}

                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"

                    >

                      Continue

                    </button>

                  ) : (

                    <button

                      onClick={() => navigate("/login")}

                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"

                    >

                      Get Started

                    </button>

                  )}

                </div>

              </div>

            </motion.div>


          ) : analyzing ? (

            /* ==================================================
               ANALYZING
            ================================================== */

            <motion.div

              key="analyzing"

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}

              className="py-12 flex flex-col items-center justify-center text-center"

            >

              <div className="relative flex items-center justify-center">

                <div className="w-28 h-28 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin" />

                <div className="absolute text-2xl text-emerald-600 animate-pulse">

                  🌿

                </div>

              </div>


              <h2 className="text-xl font-bold text-slate-800 mt-8 tracking-tight">

                Analyzing Plant...

              </h2>


              <p className="text-xs text-slate-400 mt-1 font-medium">

                Cross-checking Pl@ntNet with ChloroScan AI

              </p>


              <div className="mt-6 space-y-2 bg-slate-50 border border-slate-100 p-4 rounded-xl text-left w-72 shadow-inner">

                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />

                  Sending image to Pl@ntNet

                </div>


                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />

                  Running ChloroScan AI verification

                </div>


                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">

                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />

                  Matching plant information

                </div>

              </div>

            </motion.div>


          ) : (

            /* ==================================================
               UPLOAD
            ================================================== */

            <motion.div

              key="upload"

              className="mt-4"

            >

              <div className="text-center max-w-md mx-auto mb-6">

                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">

                  Upload Plant Sample

                </h1>

                <p className="text-slate-400 text-xs mt-1 font-medium">

                  Provide a clear plant photo for AI-powered identification.

                </p>

              </div>


              <div

                onDragOver={(e) =>
                  e.preventDefault()
                }

                onDrop={(e) => {

                  e.preventDefault();

                  processFile(
                    e.dataTransfer.files[0]
                  );

                }}

                onClick={() =>
                  document
                    .getElementById(
                      "canvasFileGateway"
                    )
                    .click()
                }

                className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-10 text-center bg-slate-50/50 hover:bg-emerald-50/10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[260px] group relative"
              >

                <div className="w-14 h-14 rounded-full bg-white shadow-sm text-slate-400 group-hover:text-emerald-600 group-hover:shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 mb-4 border border-slate-100">

                  <FaCloudUploadAlt size={22} />

                </div>


                <h2 className="text-base font-bold text-slate-800 tracking-tight">

                  Drag & Drop Plant Image

                </h2>


                <p className="text-slate-400 text-xs mt-1 font-medium max-w-xs">

                  Use a clear, well-lit image for better identification accuracy.

                </p>


                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-100/50">

                  <FaCamera size={11} />

                  Open Camera

                </div>


                <input

                  id="canvasFileGateway"

                  type="file"

                  accept="image/*"

                  capture="environment"

                  className="hidden"

                  onChange={handleInputChange}

                />

              </div>


              {/* ==================================================
                  PHOTO TIPS
              ================================================== */}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">

                  <p className="text-[10px] font-bold text-slate-600">

                    💡 Good lighting

                  </p>

                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">

                  <p className="text-[10px] font-bold text-slate-600">

                    🍃 Clear leaf

                  </p>

                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">

                  <p className="text-[10px] font-bold text-slate-600">

                    📷 No blur

                  </p>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </div>
  );
};

export default UploadModal;
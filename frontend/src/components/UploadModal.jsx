import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UploadModal = ({ closeModal }) => {

  const [image, setImage] = useState(null);

  const [analyzing, setAnalyzing] = useState(false);

  const [result, setResult] = useState(false);

  const navigate = useNavigate();

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(URL.createObjectURL(file));

    }
  };

  // AI ANALYSIS
  const handleAnalyze = () => {

    setAnalyzing(true);

    setTimeout(() => {

      setAnalyzing(false);

      setResult(true);

    }, 3000);
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-5xl rounded-[35px] p-7 relative shadow-2xl"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-black transition"
        >
          ×
        </button>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-center text-gray-900">

          Upload a Plant Image

        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">

          Upload a clear image of your plant for AI analysis.

        </p>

        {/* RESULT SCREEN */}
        {result ? (

          <div className="mt-10">

            <div className="bg-white rounded-[35px] border border-gray-100 p-7">

              <div className="grid md:grid-cols-[380px_1fr] gap-10 items-center">

                {/* LEFT IMAGE */}
                <div>

                  <img
                    src={image}
                    alt="Plant"
                    className="w-full h-[280px] object-cover rounded-[30px]"
                  />

                </div>

                {/* RIGHT CONTENT */}
                <div>

                  {/* BADGE */}
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

                    Best Match

                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl font-bold mt-5 text-gray-900">

                    Monstera Deliciosa

                  </h2>

                  <p className="text-gray-500 mt-2 text-lg">

                    Monstera deliciosa

                  </p>

                  {/* CONFIDENCE */}
                  <div className="mt-7">

                    <div className="flex items-center justify-between mb-3">

                      <p className="font-medium text-gray-700 text-lg">

                        Confidence Score

                      </p>

                      <p className="text-3xl font-bold text-green-600">

                        95%

                      </p>

                    </div>

                    {/* PROGRESS BAR */}
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                      <div className="bg-green-600 h-full w-[95%] rounded-full"></div>

                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-5 text-gray-600 leading-relaxed text-lg">

                    A tropical indoor plant known for its large,
                    glossy, fenestrated leaves. Perfect for indoor spaces.

                  </p>

                  {/* LOGIN CARD */}
                  <div className="mt-5 bg-[#F3FAF3] p-5 rounded-[30px]">

                    <h3 className="text-lg font-semibold text-gray-900">

                      Want to know more about this plant?

                    </h3>

                    <p className="text-gray-600 mt-3 leading-relaxed">

                      Login or sign up to view the complete care guide,
                      reminders, blooming seasons, and more.

                    </p>

                    <button
                      onClick={() => navigate("/login")}
                      className="mt-5 bg-green-600 text-white px-6 py-2.5 rounded-2xl hover:bg-green-700 transition"
                    >

                      Login / Sign Up

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ) : analyzing ? (

          /* ANALYZING SCREEN */
          <div className="mt-14 flex flex-col items-center">

            <div className="w-40 h-40 rounded-full border-[10px] border-green-100 border-t-green-600 animate-spin"></div>

            <h2 className="text-4xl font-bold mt-10 text-gray-900">

              Analyzing Your Plant...

            </h2>

            <div className="mt-8 space-y-4 text-gray-600 text-lg">

              <p>✔ Analyzing leaf structure</p>

              <p>✔ Comparing plant database</p>

              <p>✔ Generating best matches</p>

            </div>

          </div>

        ) : (

          /* UPLOAD SCREEN */
          <div className="mt-10">

            <label className="border-2 border-dashed border-gray-300 rounded-[35px] h-[320px] flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition overflow-hidden">

              {image ? (

                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="text-center">

                  <div className="text-7xl">

                    🌿

                  </div>

                  <h2 className="text-3xl font-semibold mt-5 text-gray-900">

                    Drag & Drop Plant Image

                  </h2>

                  <p className="text-gray-500 mt-3 text-lg">

                    or browse image from your computer

                  </p>

                </div>

              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

            </label>

            {/* ANALYZE BUTTON */}
            {image && (

              <button
                onClick={handleAnalyze}
                className="w-full mt-8 bg-green-600 text-white py-4 rounded-2xl text-xl hover:bg-green-700 transition shadow-lg"
              >

                Analyze Plant

              </button>

            )}

          </div>

        )}

      </motion.div>

    </div>
  );
};

export default UploadModal;
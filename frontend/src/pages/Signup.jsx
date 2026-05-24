import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#F7FAF7] flex items-center justify-center px-6 py-6">

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl h-[620px] bg-white rounded-[32px] overflow-hidden shadow-xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:block h-[620px]">

          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop"
            alt="Plant"
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-green-900/40"></div>

          {/* QUOTE */}
          <div className="absolute bottom-12 left-10 right-10">

            <h2 className="text-white text-[34px] font-bold leading-[1.2] max-w-sm">

              "Every plant starts as a seed.
              Start your journey with ChloroScan."

            </h2>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center px-8 py-8">

          {/* HEADING */}
          <div>

            <h1 className="text-[40px] font-bold text-[#0F172A] leading-tight">

              Create Account

            </h1>

            <p className="text-gray-500 text-lg mt-3">

              Join ChloroScan today.

            </p>

          </div>

          {/* FORM */}
          <div className="mt-6 space-y-4">

            {/* FULL NAME */}
            <div>

              <label className="text-[15px] font-medium text-gray-700">

                Full Name

              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="text-[15px] font-medium text-gray-700">

                Email

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-[15px] font-medium text-gray-700">

                Password

              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"
              />

            </div>

            {/* SIGNUP BUTTON */}
            <button className="w-full h-[40px] bg-green-600 hover:bg-green-700 transition rounded-2xl text-white text-lg font-medium">

              Sign Up

            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 mt-1">

              <div className="flex-1 h-[1px] bg-gray-200"></div>

              <p className="text-gray-400">

                or

              </p>

              <div className="flex-1 h-[1px] bg-gray-200"></div>

            </div>

            {/* GOOGLE BUTTON */}
            <button className="w-full h-[40px] border border-gray-300 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-lg">

              <FcGoogle className="text-2xl" />

              Continue with Google

            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-500 pt-1 text-sm">

              Already have an account?{" "}

              <button
                onClick={() => navigate("/login")}
                className="text-green-600 font-medium hover:underline"
              >

                Login

              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/auth";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });

  setError("");
};

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF7] flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-5xl h-[620px] bg-white rounded-[32px] overflow-hidden shadow-xl grid lg:grid-cols-2">
        <div className="relative hidden lg:block h-[620px]">
          <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop" alt="Plant" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-green-900/40"></div>
          <div className="absolute bottom-12 left-10 right-10">
            <h2 className="text-white text-[34px] font-bold leading-[1.2] max-w-sm">"Every plant starts as a seed. Start your journey with ChloroScan."</h2>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 py-8">
          <h1 className="text-[40px] font-bold text-[#0F172A]">Create Account</h1>
          <p className="text-gray-500 text-lg mt-3">Join ChloroScan today.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="text-[15px] font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"/>
            </div>

            <div>
              <label className="text-[15px] font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"/>
            </div>

            <div>
              <label className="text-[15px] font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full h-[40px] mt-3 px-5 rounded-2xl border border-gray-300 outline-none focus:border-green-600 text-[16px]"/>
            {error && (<div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">{error}</div>)}
            </div>

            <button type="submit" disabled={loading} className="w-full h-[40px] bg-green-600 hover:bg-green-700 transition rounded-2xl text-white text-lg font-medium disabled:opacity-50">
              {loading ? "Creating Account..." : "Sign Up"}
              </button>

            <div className="flex items-center gap-4 mt-1">

              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <p className="text-gray-400">or</p>
              <div className="flex-1 h-[1px] bg-gray-200"></div>

            </div>

            <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await googleLogin(credentialResponse.credential);
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                  navigate("/dashboard");
                  } catch (error) {
                    console.error(error);
                    setError("Google signup failed");
                  }
                }}
                  onError={() => {setError("Google signup failed");
                  text="signup_with";
                  }}
                  />
                </div>

            <p className="text-center text-gray-500 pt-1 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-green-600 font-medium hover:underline">
                Login
              </button>
            </p>
          </form>
        </div> 
      </div>
    </div>
  );
};

export default Signup;
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/auth";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
  try {
    setLoading(true);

    const res = await login(form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setError("");

    navigate("/dashboard");

  } catch (err) {
    setError(
      err.response?.data?.detail || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F9FBF8] flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-5xl h-[640px] bg-white rounded-[32px] overflow-hidden shadow-lg grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img src="https://images.unsplash.com/photo-1483794344563-d27a8d18014e?q=80&w=1200&auto=format&fit=crop" alt="Plant" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-green-900/45"></div>
          <div className="absolute bottom-10 left-8 right-8 text-white">
            <h2 className="text-4xl font-bold leading-tight">“The best time to plant a tree was 20 years ago. The second best time is now.”</h2>
          </div>
        </div>

        <div className="px-10 py-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-500 mt-2 text-base">Login to access your plant care guide.</p>
        <form className="mt-7" onSubmit={handleLogin}>
          <div><label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 p-4 border border-gray-300 rounded-2xl outline-none focus:border-green-600"
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Password</label>
              <button type="button" className="text-green-600 text-sm hover:underline">Forgot password?</button></div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-2 p-4 border border-gray-300 rounded-2xl outline-none focus:border-green-600"
            />
          </div>

          {error && (<div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mt-4 text-sm">{error}</div>)}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl text-lg font-medium hover:bg-green-700 transition disabled:opacity-50">{loading ? "Logging in..." : "Login"}
            </button>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <p className="text-gray-400">or</p>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                const res = await googleLogin(credentialResponse.credential);

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.user));

                  navigate("/dashboard");
                } catch (error) {console.error(error);}
                }}
                onError={() => {console.log("Google Login Failed");}}/></div>

            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <button type="button" onClick={() => navigate("/signup")}className="text-green-600 font-medium hover:underline">Sign up</button></p>

          </form>

        </div>
      </div>
    </div>
  );
};
export default Login;
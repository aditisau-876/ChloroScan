import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-[#F9FBF8]">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="ChloroScan Logo" className="h-14 object-contain"/>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate("/login")} className="px-6 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition text-lg">Login</button>
          <button onClick={() => navigate("/signup")} className="px-6 py-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition shadow-lg text-lg">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
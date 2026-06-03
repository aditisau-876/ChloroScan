import {
  FaHome,
  FaLeaf,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome size={15} />,
      path: "/dashboard",
    },
    {
      name: "My Plants",
      icon: <FaLeaf size={15} />,
      path: "/myplants",
    },
    {
      name: "Reminders",
      icon: <FaBell size={15} />,
      path: "/reminders",
    },
  ];

  return (
    <aside className="w-64 bg-[#0F3A20] text-white p-5 flex flex-col justify-between shadow-xl select-none flex-shrink-0">

      <div>
        <div className="flex items-center gap-3 px-2 py-2">
          <FaLeaf className="text-xl text-green-400 -rotate-12" />
          <h1 className="text-xl font-bold tracking-tight">
            ChloroScan
          </h1>
        </div>

        <nav className="mt-8 flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300 w-full text-left cursor-pointer
                ${
                  location.pathname === item.path
                    ? "bg-[#1E4D32] text-white font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10 hover:translate-x-1"
                }
              `}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-slate-300 hover:text-red-200 hover:bg-red-500/20 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left w-full cursor-pointer"
        >
          <FaSignOutAlt size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
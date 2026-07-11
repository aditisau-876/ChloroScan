import {FaHome,FaLeaf,FaBell,FaSignOutAlt,FaBars,FaTimes,} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
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
    <>
    <button
      onClick={() => setOpen(true)}
      className="lg:hidden fixed top-4 left-4 z-50 bg-[#0F3A20] text-white p-3 rounded-xl shadow-lg"
    >
      <FaBars />
    </button>
    {open && (
      <div
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"onClick={() => setOpen(false)}/>)}
    <aside
      className={`
    fixed lg:static
    top-0 left-0
    h-screen lg:h-screen
    w-64
    bg-[#0F3A20]
    text-white
    p-5
    flex
    flex-col
    justify-between
    flex-shrink-0
    shadow-xl
    z-50
    transform
    transition-transform
    duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
        <div className="lg:hidden flex justify-end mb-4">
    <button
      onClick={() => setOpen(false)}
      className="text-white hover:text-green-300"
    >
      <FaTimes size={20} />
    </button>
  </div>

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
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
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
          onClick={() => {
            handleLogout();
            setOpen(false);
          }}
          className="flex items-center gap-4 text-slate-300 hover:text-red-200 hover:bg-red-500/20 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left w-full cursor-pointer"
        >
          <FaSignOutAlt size={15} />
          Logout
        </button>
      </div>
    </aside>
     </>
  );
}
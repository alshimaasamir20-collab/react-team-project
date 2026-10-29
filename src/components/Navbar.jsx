import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode, onMenuClick }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-2 bg-emerald-600 px-3 text-white shadow-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="shrink-0 rounded-lg p-2 transition hover:bg-white/15 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-emerald-700 shadow-sm">
          <span className="text-xl">N</span>
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold sm:text-xl">
            Nexora
          </h1>
          <p className="hidden text-xs text-emerald-50 sm:block">
            Admin Dashboard
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          aria-label="Notifications"
          className="rounded-lg p-2 transition hover:bg-white/15"
        >
          <Bell size={20} />
        </button>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
          className="rounded-lg p-2 transition hover:bg-white/15"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
            {user?.name ? user.name[0].toUpperCase() : "A"}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase leading-none text-slate-800">
              {user?.role || "ADMIN"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-slate-200">
              {user?.name || "Admin"}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="rounded-lg p-2 transition hover:bg-white/15"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
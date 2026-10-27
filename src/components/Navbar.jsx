import {
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

function Navbar({ darkMode, setDarkMode, onMenuClick }) {
  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b px-3 sm:px-6 ${
        darkMode
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="shrink-0 rounded-lg p-2 hover:bg-gray-500/10 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
          W
        </div>

        <div className="min-w-0">
          <h1 className="truncate font-bold sm:text-lg">
            WattWise
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Smart Energy Dashboard
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          aria-label="Notifications"
          className="rounded-lg p-2 hover:bg-gray-500/10"
        >
          <Bell size={20} />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className="rounded-lg p-2 hover:bg-gray-500/10"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            A
          </div>
          <span className="text-sm font-semibold">Admin</span>
        </div>

        <button
          aria-label="Logout"
          className="rounded-lg p-2 hover:bg-red-500/10"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
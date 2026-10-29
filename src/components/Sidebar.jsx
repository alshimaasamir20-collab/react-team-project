import {
  LayoutDashboard,
  Users,
  Package,
  PackagePlus,
  ShoppingBag,
  ShoppingCart,
  Settings,
  X,
  Circle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Products", path: "/products", icon: Package },
  { name: "Add Product", path: "/products/add", icon: PackagePlus },
  { name: "Orders", path: "/orders", icon: ShoppingBag },
  { name: "Carts", path: "/carts", icon: ShoppingCart },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ darkMode, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-64 flex-col border-r p-4 transition-transform duration-300 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "border-gray-800 bg-gray-900 text-gray-100"
            : "border-emerald-100 bg-white text-gray-700"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-emerald-600">
              NEXORA
            </p>
            <h2 className="mt-1 text-lg font-bold">Admin Panel</h2>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 hover:bg-gray-500/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className={`mt-6 rounded-xl border p-3 ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-emerald-100 bg-emerald-50"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <Circle size={10} fill="#22c55e" color="#22c55e" />
            <span className="text-sm font-semibold">Live</span>
          </div>

          <p className="text-xs leading-5 text-gray-500">
            Connected to the Nexora dashboard
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
import {
  LayoutDashboard,
  Users,
  PackagePlus,
  ShoppingBag,
  ShoppingCart,
  Settings,
  X,
  Circle,
} from "lucide-react";

const links = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Users", icon: Users },
  { name: "Add Product", icon: PackagePlus },
  { name: "Orders", icon: ShoppingBag },
  { name: "Carts", icon: ShoppingCart },
  { name: "Settings", icon: Settings },
];

function Sidebar({
  darkMode,
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
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
            ? "border-gray-700 bg-gray-900 text-gray-100"
            : "border-gray-200 bg-white text-gray-700"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500">
              COMMERCE
            </p>
            <h2 className="mt-1 text-lg font-bold">
              Admin Panel
            </h2>
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
          {links.map(({ name, icon: Icon }) => {
            const isActive = activePage === name;

            return (
              <button
                key={name}
                onClick={() => {
                  setActivePage(name);
                  setSidebarOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{name}</span>
              </button>
            );
          })}
        </nav>

        <div
          className={`mt-6 rounded-xl border p-3 ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <Circle
              size={10}
              fill="#22c55e"
              color="#22c55e"
            />
            <span className="text-sm font-semibold">Live</span>
          </div>

          <p className="text-xs leading-5 text-gray-500">
            Connected to the e Commerce API
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
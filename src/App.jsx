import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Login page appears without the dashboard layout
  if (location.pathname === "/login") {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] transition-colors">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex items-start">
        <Sidebar
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
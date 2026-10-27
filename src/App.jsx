// function App() {
//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//       <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
//         <h1 className="text-3xl font-bold text-blue-600">
//           React + Tailwind CSS
//         </h1>

//         <p className="mt-4 text-gray-600">
//           Our team project is ready!
//         </p>

//         <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
//           Let's Start
//         </button>
//       </div>
//     </div>
//   )
// }

// export default App

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex items-start">
        <Sidebar
          darkMode={darkMode}
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* سيبي هنا محتوى باقي التيم */}
        <main className="min-w-0 flex-1" />
      </div>
    </div>
  );
}

export default App;


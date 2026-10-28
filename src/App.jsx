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
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                مرحباً بك، {user?.name || 'Admin'} 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                تم تسجيل الدخول بنجاح إلى لوحة التحكم.
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
            >
              تسجيل خروج
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function MainApp() {
  const { user } = useAuth();
  return user ? <DashboardLayout /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
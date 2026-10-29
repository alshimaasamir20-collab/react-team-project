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

function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="bg-white p-8 rounded-2xl border border-[#E9F5EF] shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#123C35] mb-2">
          مرحباً بك، {user?.name || 'Admin'} 
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          أنت مسجل الدخول الآن بنجاح (في انتظار دمج السايد بار والناف بار مع التيم).
        </p>
        <button
          onClick={logout}
          className="w-full py-2.5 px-4 bg-[#187A63] hover:bg-[#123C35] text-white font-medium rounded-lg text-sm transition duration-150"
        >
          تسجيل الخروج (Logout)
        </button>
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
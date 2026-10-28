    import React from 'react';
    import { Bell, Moon, LogOut } from 'lucide-react';
    import { useAuth } from '../context/AuthContext';

    export default function Navbar() {
    const { logout, user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-3">
    
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] flex items-center justify-center text-white font-black text-lg shadow-sm">
            K
            </div>

            <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 leading-tight">
                Koda Dashboard
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
                E-Commerce Admin Panel
            </span>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <button 
            type="button"
            className="relative w-9 h-9 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
            >
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>

            <button 
            type="button"
            className="w-9 h-9 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
            >
            <Moon size={16} />
            </button>

            <div className="flex items-center gap-2 pl-2">
            
            <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>

            <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 uppercase leading-none">
                {user?.role || 'ADMIN'}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                Customer
                </span>
            </div>
            </div>

            <button
            onClick={logout}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-semibold rounded-lg shadow-sm shadow-red-500/20 transition duration-150"
            >
            <LogOut size={14} />
            <span>Logout</span>
            </button>
        </div>
        </header>
    );
    }
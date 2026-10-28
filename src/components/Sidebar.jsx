    import React from 'react';
    import { 
    LayoutDashboard, 
    ShoppingBag, 
    ShoppingCart, 
    Users, 
    BarChart3, 
    Settings, 
    LogOut 
    } from 'lucide-react';
    import { useAuth } from '../context/AuthContext'; 

    const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Customers', icon: Users },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
    ];

    export default function Sidebar() {
    const { logout } = useAuth(); 

    return (
        <aside className="w-64 bg-slate-900 text-slate-200 min-h-screen flex flex-col justify-between p-4 border-r border-slate-800">
        <div>
            <div className="flex items-center gap-3 px-3 py-4 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                K
            </div>
            <div>
                <h1 className="font-bold text-lg text-white leading-tight">Koda Store</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
            </div>

            <nav className="space-y-1">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                <button
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                >
                    <Icon size={18} />
                    <span>{item.name}</span>
                </button>
                );
            })}
            </nav>
        </div>

        <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors w-full text-left"
        >
            <LogOut size={18} />
            <span>Logout</span>
        </button>
        </aside>
    );
    }
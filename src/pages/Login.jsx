    import React, { useState } from 'react'; // حرف i صغير
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { Mail, Lock, ShoppingBag, Check } from 'lucide-react';

    export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@koda.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const res = await login(email, password);
        
        // إذا نجح تسجيل الدخول، انقل المستخدم فوراً إلى الداشبورد
        if (res?.success || res === undefined) {
            navigate('/');
        } else {
            setError(res?.message || 'Invalid email or password');
        }
        } catch (err) {
        setError(err?.message || 'Login failed, please check your credentials');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E9F5EF] via-[#f4faf6] to-[#fffdf7] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#fffdf7] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/60">
            
            {/* Left Side */}
            <div className="md:w-1/2 bg-gradient-to-b from-[#123C35] to-[#187a63] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 rounded-lg border-2 border-white/80 flex items-center justify-center">
                    <ShoppingBag size={18} className="text-white" />
                </div>
                <span className="font-semibold text-lg tracking-wide">Koda Commerce</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Manage Your Store<br />Like a Pro
                </h1>
                <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Control products, orders, users, carts and analytics from a modern dashboard experience.
                </p>

                <div className="space-y-3">
                <div className="bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl flex items-center gap-2.5 text-sm font-medium border border-white/10">
                    <Check size={16} className="text-white shrink-0" />
                    <span>Product Management</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl flex items-center gap-2.5 text-sm font-medium border border-white/10">
                    <Check size={16} className="text-white shrink-0" />
                    <span>Order Tracking</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl flex items-center gap-2.5 text-sm font-medium border border-white/10">
                    <Check size={16} className="text-white shrink-0" />
                    <span>Customer Insights</span>
                </div>
                </div>
            </div>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#123C35] flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-500/20">
                    K
                </div>
                <div className="text-left leading-none">
                    <span className="block font-black text-lg tracking-wider text-[#123C35]">KODA</span>
                    <span className="block font-bold text-xs tracking-widest text-[#187a63]">STORE</span>
                    <span className="block text-[9px] text-[#123C35]/50 uppercase tracking-tight">ONLINE STORE</span>
                </div>
                </div>

                <h2 className="text-2xl font-bold text-[#123C35]">Welcome Back</h2>
                <p className="text-xs text-slate-500 mt-1">Sign in to your admin dashboard</p>
            </div>

            {error && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center">
                {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-xs font-medium text-[#123C35] mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@koda.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#e9f5ef]/60 focus:bg-white text-[#123C35] placeholder-slate-400 border border-transparent focus:border-sky-500 rounded-lg text-xs outline-none transition"
                    />
                </div>
                </div>

                <div>
                <label className="block text-xs font-medium text-[#123C35] mb-1">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#e9f5ef]/60 focus:bg-white text-[#123C35] placeholder-slate-400 border border-transparent focus:border-sky-500 rounded-lg text-xs outline-none transition"
                    />
                </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#123C35] hover:bg-[#0f2f2a] text-white font-medium rounded-lg text-sm shadow-md shadow-green-500/20 transition duration-150 disabled:opacity-50 cursor-pointer"
                >
                {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-2 text-[10px] text-slate-400 uppercase tracking-wider absolute">
                    OR
                </span>
                </div>

                <button
                type="button"
                className="w-full py-2 px-4 border border-slate-200 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition text-xs font-medium text-slate-700"
                >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                </svg>
                <span>Continue with Google</span>
                </button>
            </form>

            <p className="text-center text-[11px] text-slate-400 mt-6 font-medium">
                Secure Admin Access
            </p>
            </div>

        </div>
        </div>
    );
    }
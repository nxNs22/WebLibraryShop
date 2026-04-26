"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, getErrorMessage } from "../lib/supabaseClient";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2, UserPlus, User, Phone } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Yeni
  const [phone, setPhone] = useState("");       // Yeni
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
        router.push("/");
        router.refresh(); 
      } else {
        // --- SIGNUP LOGIC ---
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName, // Supabase'e ekstra verileri gönderiyoruz
              phone: phone,
            }
          }
        });
        if (authError) throw authError;
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Reset form when switching modes
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(false);
    setPassword("");
    setFullName(""); // Mod değiştiğinde temizle
    setPhone("");    // Mod değiştiğinde temizle
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-teal-50/50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-teal-100 max-w-md w-full relative overflow-hidden transition-all duration-300">
        
        {/* Dynamic Top Accent Color */}
        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${isLogin ? 'bg-[#2CB391]' : 'bg-[#F14D5D]'}`} />

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group mb-6">
            <span className="text-[#1A2E35] font-black text-3xl tracking-tighter leading-none italic group-hover:text-[#F14D5D] transition-colors">LIBRISTO</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1A2E35]">
            {isLogin ? "Welcome back" : "Create an Account"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? "Enter your details to access your account." : "Join us to track orders and save your cart."}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 flex items-start gap-2 animate-in fade-in">
            <span className="font-bold shrink-0">Error:</span> {error}
          </div>
        )}

        {success && !isLogin ? (
          <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100 text-center animate-in zoom-in-95">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Check your email!</h3>
            <p className="text-sm opacity-90">
              We've sent a confirmation link to <strong>{email}</strong>. Please click it to verify your account.
            </p>
            <button 
              onClick={() => { setSuccess(false); setIsLogin(true); }}
              className="mt-6 inline-block bg-[#1A2E35] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* --- SADECE KAYIT EKRANINDA GÖRÜNECEK ALANLAR --- */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F14D5D] focus:ring-1 focus:ring-[#F14D5D] transition-colors bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#F14D5D] focus:ring-1 focus:ring-[#F14D5D] transition-colors bg-gray-50 focus:bg-white"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
              </>
            )}
            {/* ---------------------------------------------- */}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full h-12 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none transition-colors bg-gray-50 focus:bg-white ${isLogin ? 'focus:border-[#2CB391] focus:ring-[#2CB391]' : 'focus:border-[#F14D5D] focus:ring-[#F14D5D]'}`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                {isLogin && (
                  <Link href="#" className="text-xs text-[#2CB391] hover:underline font-semibold">Forgot password?</Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={isLogin ? 1 : 6}
                  className={`w-full h-12 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none transition-colors bg-gray-50 focus:bg-white ${isLogin ? 'focus:border-[#2CB391] focus:ring-[#2CB391]' : 'focus:border-[#F14D5D] focus:ring-[#F14D5D]'}`}
                  placeholder={isLogin ? "••••••••" : "At least 6 characters"}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white h-12 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                isLogin ? 'bg-[#2CB391] hover:bg-[#249278]' : 'bg-[#F14D5D] hover:bg-[#d43f4d]'
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isLogin ? (
                <>Log In <ArrowRight size={18} /></>
              ) : (
                <>Create Account <UserPlus size={18} /></>
              )}
            </button>
          </form>
        )}

        {/* The Toggle Footer */}
        {!success && (
          <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleMode}
              type="button"
              className={`font-bold hover:underline transition-colors ${isLogin ? 'text-[#F14D5D]' : 'text-[#2CB391]'}`}
            >
              {isLogin ? "Sign up for free" : "Log in here"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
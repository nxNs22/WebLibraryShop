"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { supabase, getErrorMessage } from "../lib/supabaseClient";
import { LogOut, User, MapPin, Package, Loader2, Save } from "lucide-react";

export default function AccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Redirect if not logged in, or fetch profile if they are
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, phone, address")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfile({
            full_name: data.full_name || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        }
      } catch (err: unknown) {
        setMessage({ text: getErrorMessage(err), type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
        })
        .eq("id", user.id);

      if (error) throw error;
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err: unknown) {
      setMessage({ text: getErrorMessage(err), type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin text-[#2CB391]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-8 border-b pb-6">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xl">
              {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <User />}
            </div>
            <div>
              <p className="font-bold text-[#1A2E35] line-clamp-1">{profile.full_name || "My Account"}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal-50 text-teal-700 font-bold rounded-lg transition-colors">
              <User size={18} /> Profile Details
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold rounded-lg transition-colors">
              <Package size={18} /> My Orders
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-bold rounded-lg transition-colors mt-4"
            >
              <LogOut size={18} /> Log Out
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[#1A2E35] mb-6 flex items-center gap-2">
          <MapPin className="text-[#2CB391]" /> Shipping & Contact Details
        </h2>

        {message && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                className="w-full h-12 px-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#2CB391] focus:ring-1 focus:ring-[#2CB391] bg-gray-50 focus:bg-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full h-12 px-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#2CB391] focus:ring-1 focus:ring-[#2CB391] bg-gray-50 focus:bg-white"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Delivery Address</label>
            <textarea
              value={profile.address}
              onChange={(e) => setProfile({...profile, address: e.target.value})}
              rows={4}
              className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#2CB391] focus:ring-1 focus:ring-[#2CB391] bg-gray-50 focus:bg-white resize-none"
              placeholder="123 Library Street, Apt 4B, Book City, BK 12345"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#2CB391] hover:bg-[#249278] text-white px-8 h-12 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
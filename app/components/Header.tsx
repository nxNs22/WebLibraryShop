"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Search, User, HelpCircle, ShoppingCart, 
  Home, ChevronDown, Gift, Ticket,
  Calendar, Headphones, Gamepad2, Video, 
  Image as ImageIcon, PenTool, Monitor,
  VenetianMask, UserRound, Baby, Sparkles,
  BookOpen, Mic, Tablet
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
// Supabase'i import ediyoruz
import { supabase, getErrorMessage } from "../lib/supabaseClient"; 

// --- VERİ YAPILARI ---

const languages = [
  { name: "Books in Turkmen", flag: "🇹🇲", slug: "turkmen", count: "12 450" },
  { name: "Books in Turkish", flag: "🇹🇷", slug: "turkish", count: "284 730" },
  { name: "Books in Russian", flag: "🇷🇺", slug: "russian", count: "1 923 610" },
];

const ebookLanguages = [
  { name: "E-books in Turkish", flag: "🇹🇷", slug: "turkish", count: "45 200" },
  { name: "E-books in English", flag: "🇬🇧", slug: "english", count: "890 400" },
];

const audiobookLanguages = [
  { name: "Audiobooks in Turkish", flag: "🇹🇷", slug: "turkish", count: "8 400" },
  { name: "Audiobooks in English", flag: "🇬🇧", slug: "english", count: "210 000" },
];

const otherProducts = [
  { name: "Calendar/Diary", icon: <Calendar size={28} />, count: "203 929", color: "bg-blue-500/20 text-blue-400" },
  { name: "Audio", icon: <Headphones size={28} />, count: "192 774", color: "bg-purple-500/20 text-purple-400" },
  { name: "Game/Toy", icon: <Gamepad2 size={28} />, count: "83 931", color: "bg-orange-500/20 text-orange-400" },
  { name: "Video", icon: <Video size={28} />, count: "67 926", color: "bg-red-500/20 text-red-400" },
  { name: "Printed items", icon: <ImageIcon size={28} />, count: "77 103", color: "bg-yellow-500/20 text-yellow-400" },
  { name: "Stationery", icon: <PenTool size={28} />, count: "10 941", color: "bg-green-500/20 text-green-400" },
  { name: "Digital", icon: <Monitor size={28} />, count: "11 146", color: "bg-indigo-500/20 text-indigo-400" },
];

const giftCategories = [
  { 
    name: "Gifts for women", 
    icon: <VenetianMask size={32} />, 
    href: "/gifts/women"
  },
  { 
    name: "Gifts for men", 
    icon: <UserRound size={32} />, 
    href: "/gifts/men" 
  },
  { 
    name: "Gifts for girls", 
    icon: <Sparkles size={32} />, 
    href: "/gifts/girls" 
  },
  { 
    name: "Gifts for boys", 
    icon: <Gamepad2 size={32} />, 
    href: "/gifts/boys" 
  },
  { 
    name: "Gifts for children", 
    icon: <Baby size={32} />, 
    href: "/gifts/children" 
  },
];

function DropdownPanel({ type, onClose }: { type: string; onClose: () => void }) {
  const getContent = () => {
    if (type === "Books") return { title: "16 386 577 books in 175 languages", data: languages, basePath: "/books" };
    if (type === "E-books") return { title: "1 245 000 e-books to download", data: ebookLanguages, basePath: "/e-books" };
    if (type === "Audiobooks") return { title: "450 000 audiobooks for your ears", data: audiobookLanguages, basePath: "/audiobooks" };
    return null;
  };

  const content = getContent();


  return (
    <div className="absolute top-full left-0 w-full z-50 pt-2 animate-in fade-in duration-200">
      <div className="bg-teal-900 border-t-2 border-red-500 rounded-b-xl shadow-2xl">
        <div className="px-6 py-10 max-w-7xl mx-auto">
          
          {/* 1. DİL TABANLI PANELLER (Books, E-books, Audiobooks) */}
          {content && content.data && (
            <>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">{content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                {content.data.map((lang: any) => {
                  const safeSlug = (lang.slug || "").toLowerCase();
                  return (
                    <Link 
                      key={lang.name} 
                      href={`${content.basePath}/${safeSlug}`} 
                      onClick={onClose}
                      className="flex flex-col items-center gap-3 group hover:opacity-80 transition-opacity"
                    >
                      <div className="text-5xl md:text-6xl drop-shadow-lg group-hover:scale-110 transition-transform">{lang.flag}</div>
                      <span className="text-teal-400 font-semibold text-sm group-hover:text-white">{lang.name}</span>
                      <span className="text-white/50 text-sm">{lang.count}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* 2. OTHER PRODUCTS PANELİ */}
          {type === "Other products" && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {otherProducts.map((product) => (
                <Link 
                  key={product.name} 
                  href={`/other/${product.name.toLowerCase().replace("/", "-")}`}
                  onClick={onClose} 
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className={`w-16 h-16 ${product.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-white`}>
                    {product.icon}
                  </div>
                  <span className="text-white font-bold text-[12px] text-center mb-1">{product.name}</span>
                  <span className="text-white/40 text-[10px] italic">{product.count}</span>
                </Link>
              ))}
            </div>
          )}

          {/* 3. GIFT TIPS PANELİ */}
          {type === "Gift tips" && (
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-6">
                {giftCategories.map((item) => (
                  <Link key={item.name} href={item.href} onClick={onClose} className="flex flex-col items-center p-4 rounded-xl hover:bg-white/5 group">
                    <div className="w-20 h-20 bg-white/10 text-teal-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-white font-bold text-sm text-center leading-tight">{item.name}</span>
                  </Link>
                ))}
              </div>
              <div className="hidden lg:block w-px bg-white/10 self-stretch" />
              <div className="w-full lg:w-72 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mb-4 border border-pink-500/30">
                  <Ticket size={40} />
                </div>
                <h3 className="text-pink-400 font-bold text-xl mb-1 text-nowrap">Gift voucher</h3>
                <Link href="/gift-voucher" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2.5 rounded-full font-bold text-sm">Buy now</Link>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-white/10 flex justify-center text-white/80 text-sm italic">
            <Sparkles className="text-emerald-400 mr-2" size={18} />
            Don't know what to choose? We are here to help!
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ANA HEADER ---

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const { cartCount } = useCart();

  // İsmi saklamak için yeni state
  const [userName, setUserName] = useState<string | null>(null);

  // Veritabanından ismin çekilmesi
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) {
        setUserName(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle(); // <--- BU SATIR DEĞİŞTİRİLDİ: .single() yerine .maybeSingle() kullanıldı

        if (error) throw error;

        // Sadece isim girilmişse göster
        if (data && data.full_name && data.full_name.trim() !== "") {
          setUserName(data.full_name.split(" ")[0]); 
        } else {
          setUserName(null);
        }
      } catch (err: unknown) {
        console.error("Name fetch error:", getErrorMessage(err));
      }
    };

    fetchUserName();
  }, [user]);

  const navItems = [
    { label: "Books", hasDropdown: true, icon: <BookOpen size={16} /> },
    { label: "E-books", hasDropdown: true, icon: <Tablet size={16} /> },
    { label: "Audiobooks", hasDropdown: true, icon: <Mic size={16} /> },
    { label: "Other products", hasDropdown: true, icon: <Gamepad2 size={16} /> },
    { label: "Gift tips", hasDropdown: true, icon: <Gift size={16} /> },
    { label: "Gift voucher", hasDropdown: false, href: "/gift-voucher" },
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header className="w-full flex flex-col items-center bg-red-700 sticky top-0 z-50 shadow-md">
      {/* 1. TOP BAR */}
      <div className="w-full bg-red-800 text-white/80 text-[11px] py-1.5 flex justify-center">
        <div className="w-full max-w-7xl px-4 flex justify-between items-center">
          <span className="hover:text-white cursor-pointer transition-colors">Check order status</span>
          <div className="flex gap-4">
            <span className="hidden md:inline">Free delivery over €30</span>
            <span className="font-bold cursor-pointer hover:text-white uppercase tracking-widest underline underline-offset-4">EN</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="w-full max-w-7xl px-4 py-4 flex items-center justify-between gap-6 lg:gap-12">
        <Link href="/" className="flex flex-col items-center group flex-shrink-0">
          <span className="text-white font-black text-2xl tracking-tighter leading-none italic group-hover:text-red-100">LIBRISTO</span>
          <span className="text-red-300 text-[9px] tracking-[0.2em] uppercase font-bold">Be Whoever</span>
        </Link>

        <div className="flex-1 max-w-2xl relative flex items-center bg-white rounded-lg overflow-hidden shadow-inner">
          <Search size={18} className="ml-4 text-gray-400" />
          <input type="text" placeholder="Search books, authors, categories..." className="w-full h-11 pl-3 pr-24 text-sm focus:outline-none text-gray-800" />
          <button className="absolute right-0 h-11 px-6 bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors">Search</button>
        </div>

        <div className="flex items-center gap-5 text-white flex-shrink-0">
          <HelpCircle size={22} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
          
          {/* Akıllı Kullanıcı İkonu / İsim */}
          <Link href={user ? "/account" : "/auth"} className="flex items-center gap-2 group">
            {user && userName ? (
              <span className="text-sm font-bold text-emerald-300 group-hover:text-white transition-colors capitalize">
                Hi, {userName}
              </span>
            ) : (
              <User 
                size={22} 
                className={`cursor-pointer transition-opacity ${user ? "opacity-100 text-teal-300" : "opacity-80 group-hover:opacity-100"}`} 
              />
            )}
          </Link>
          
          {/* Güncellenmiş Sepet Butonu */}
          <Link 
            href="/cart" 
            className="relative flex items-center bg-emerald-600 px-4 py-2.5 rounded-lg font-bold text-sm cursor-pointer hover:bg-emerald-700 transition-all shadow-md"
          >
            <ShoppingCart size={18} />
            <span className="hidden md:inline-block ml-2 text-white">Cart</span>
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-emerald-600">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* 3. NAVIGATION */}
      <nav className="w-full bg-red-900/30 border-t border-white/5 flex justify-center relative">
        <div className="w-full max-w-7xl px-4 relative flex items-center" onMouseLeave={handleMouseLeave}>
          <ul className="flex items-center">
            <li className="px-4 py-3 text-white hover:bg-white/10 cursor-pointer">
  <Link href="/"><Home size={18} /></Link>
</li>
            {navItems.map((item) => (
              <li 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
              >
                {item.hasDropdown ? (
                  <button
                    className={`px-5 py-3 text-[13px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      openDropdown === item.label ? "bg-teal-900 text-white shadow-inner" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {item.icon} {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link href={item.href || "#"} className="px-5 py-3 text-[13px] font-bold text-white/90 hover:bg-white/10 flex items-center gap-2">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {openDropdown && (
            <div onMouseEnter={() => handleMouseEnter(openDropdown)}>
              <DropdownPanel type={openDropdown} onClose={() => setOpenDropdown(null)} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
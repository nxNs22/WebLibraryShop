"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Filter, ShoppingCart, ChevronDown } from "lucide-react";
// 1. Hook'u import et (klasör derinliğine göre yolu ayarla)
import { useCart } from "../../context/CartContext"; 

export default function AudiobookCategoryPage() {
  const params = useParams();
  const currentLang = (params?.languages as string) || "Unknown";
  const [priceRange, setPriceRange] = useState(50);

  // 2. Context'ten addToCart fonksiyonunu çek
  const { addToCart } = useCart();

  // 3. Sepete Ekleme Fonksiyonu
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      cover: product.cover
    });
  };

  // Audiobooks için özel test verileri (Daha sonra Supabase'den gelecek)
  const dummyProducts = [
    { id: `audio-1-${currentLang}`, title: `${currentLang} Audiobook Bestseller`, price: 14.99, author: "Narrated by John Doe", cover: "🎧" },
    { id: `audio-2-${currentLang}`, title: `${currentLang} Language Audio Course`, price: 29.50, author: "Narrated by Jane Smith", cover: "🎙️" },
    { id: `audio-3-${currentLang}`, title: `${currentLang} Classic Tale (Audio)`, price: 12.99, author: "Narrated by Alex Johnson", cover: "📻" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 bg-gray-50 p-6 rounded-xl h-fit border border-gray-100 shrink-0">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-2 tracking-tight">
          <Filter size={20} className="text-red-700" /> Audio Filters
        </h3>
        <div className="mb-8">
          <label className="text-sm font-bold text-gray-700 block mb-3">Max Price: €{priceRange}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <h1 className="text-2xl font-black uppercase italic text-gray-900">
            Audio Library: <span className="text-emerald-600 capitalize">{currentLang}</span>
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">
            Sort <ChevronDown size={16} />
          </div>
        </div>

        {/* 4. Ürün Listesi ve Sepete Ekle Butonları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts
            .filter(product => product.price <= priceRange)
            .map((product) => (
            <div key={product.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              
              {/* Ürün Görseli (Şimdilik Emoji) */}
              <div className="relative aspect-[4/3] bg-teal-50 flex items-center justify-center text-6xl">
                {product.cover}
                
                {/* Hover olunca çıkan yeşil sepet butonu */}
                <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-white text-emerald-600 p-3 rounded-full hover:bg-emerald-50 transition-colors shadow-lg transform hover:scale-105"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>

              {/* Ürün Bilgileri */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1">{product.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{product.author}</p>
                <div className="flex justify-between items-center">
                  <span className="font-black text-emerald-700">€{product.price.toFixed(2)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Eğer filtre her şeyi gizlerse gösterilecek mesaj */}
        {dummyProducts.filter(product => product.price <= priceRange).length === 0 && (
          <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
             <p>No audiobooks found under <b>€{priceRange}</b>.</p>
          </div>
        )}
      </main>
    </div>
  );
}
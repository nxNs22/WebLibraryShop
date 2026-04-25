"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Filter, ShoppingCart, ChevronDown } from "lucide-react";
// 1. Make sure this path is correct for your folder structure
import { useCart } from "../../context/CartContext"; 

export default function DigitalCategoryPage() {
  const params = useParams();
  const currentLang = (params?.languages as string) || "Unknown";
  const [priceRange, setPriceRange] = useState(50);

  // 2. Pull the addToCart function from the Context
  const { addToCart } = useCart();

  // 3. Create a handler function for the button click
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      cover: product.cover
    });
  };

  // Dummy data for testing the Cart (You will replace this with Supabase data later)
  const dummyProducts = [
    { id: `item-1-${currentLang}`, title: `${currentLang} Digital Book 1`, price: 15.99, author: "John Doe", cover: "💻" },
    { id: `item-2-${currentLang}`, title: `${currentLang} Audio Course`, price: 24.50, author: "Jane Smith", cover: "🎧" },
    { id: `item-3-${currentLang}`, title: `${currentLang} Premium E-book`, price: 9.99, author: "Alex Johnson", cover: "📱" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 bg-gray-50 p-6 rounded-xl h-fit border border-gray-100 shrink-0">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-2 tracking-tight">
          <Filter size={20} className="text-red-700" /> Digital Filters
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
            Digital Library: <span className="text-emerald-600 capitalize">{currentLang}</span>
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">
            Sort <ChevronDown size={16} />
          </div>
        </div>

        {/* 4. Map through the products and display the Add to Cart button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts
            .filter(product => product.price <= priceRange) // Applies the price filter visually
            .map((product) => (
            <div key={product.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              
              {/* Product Cover Placeholder */}
              <div className="relative aspect-[4/3] bg-teal-50 flex items-center justify-center text-6xl">
                {product.cover}
                
                {/* Hover Action Overlay */}
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

              {/* Product Info */}
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

        {/* Fallback if price filter hides everything */}
        {dummyProducts.filter(product => product.price <= priceRange).length === 0 && (
          <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
             <p>No digital items found under <b>€{priceRange}</b>.</p>
          </div>
        )}
      </main>
    </div>
  );
}
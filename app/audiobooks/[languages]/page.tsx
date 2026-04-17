"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Filter, ShoppingCart, ChevronDown } from "lucide-react";

export default function DigitalCategoryPage() {
  const params = useParams();
  const currentLang = (params?.languages as string) || "";
  const [priceRange, setPriceRange] = useState(50);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-8 bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-2 tracking-tight">
          <Filter size={20} className="text-red-700" /> Digital Filters
        </h3>
        <div className="mb-8">
          <label className="text-sm font-bold text-gray-700 block mb-3">Max Price: €{priceRange}</label>
          <input type="range" min="0" max="100" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <h1 className="text-2xl font-black uppercase italic text-gray-900">Digital Library: {currentLang}</h1>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">Sort <ChevronDown size={16} /></div>
        </div>
        <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
           <p>Digital items for <b>{currentLang}</b> will be listed here from database soon.</p>
        </div>
      </main>
    </div>
  );
}
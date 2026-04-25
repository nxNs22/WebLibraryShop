"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  Filter, Star, ShoppingCart, ChevronDown, 
  Search, Book, LayoutGrid, List 
} from "lucide-react";

// 1. Context'ten useCart'ı import et
import { useCart } from "../../context/CartContext"; 

// Örnek Ürün Verisi (Ekran görüntüsündeki gibi)
const GIFT_PRODUCTS = [
  { id: "gift-1", title: "Chainsaw Man Box Set", author: "Tatsuki Fujimoto", price: 94.37, target: "women", type: "Paperback", image: "https://via.placeholder.com/150x220", rating: 5, badge: "Box Set" },
  { id: "gift-2", title: "Iron Flame", author: "Rebecca Yarros", price: 9.94, target: "women", type: "Paperback", image: "https://via.placeholder.com/150x220", rating: 5, badge: "New" },
  { id: "gift-3", title: "Chainsaw Man, Vol. 12", author: "Tatsuki Fujimoto", price: 10.14, target: "women", type: "Paperback", image: "https://via.placeholder.com/150x220", rating: 4, badge: "Top" },
  { id: "gift-4", title: "Jujutsu Kaisen, Vol. 20", author: "Gege Akutami", price: 9.64, target: "women", type: "Paperback", image: "https://via.placeholder.com/150x220", rating: 5 },
  { id: "gift-5", title: "Goodbye, Eri", author: "Tatsuki Fujimoto", price: 12.35, target: "women", type: "Paperback", image: "https://via.placeholder.com/150x220", rating: 5 },
];

export default function GiftsTargetPage() {
  const params = useParams();
  const target = (params?.target as string) || "Gifts";
  
  // Filtre State'leri
  const [priceRange, setPriceRange] = useState({ from: 7, to: 99 });
  const [searchQuery, setSearchQuery] = useState("");

  const displayTitle = target.charAt(0).toUpperCase() + target.slice(1).replace("-", " ");

  // 2. addToCart fonksiyonunu çek
  const { addToCart } = useCart();

  // 3. Sepete Ekleme Fonksiyonu
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      cover: product.image // Bu sayfada veri "image" olarak geldiği için cover'a eşitliyoruz
    });
  };

  return (
    <div className="bg-[#F9FBF9] min-h-screen pb-20">
      {/* 1. BREADCRUMB & HEADER AREA */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <nav className="text-[11px] text-gray-400 mb-4 flex items-center gap-2">
            <span>Home</span> <span>/</span> <span>Gifts</span> <span>/</span> <span className="text-gray-600 font-bold">{displayTitle}</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
               <Book size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1A2E35] tracking-tight flex items-baseline gap-4 italic uppercase">
                {displayTitle}
                <span className="text-sm font-normal text-gray-400 not-italic lowercase tracking-normal">68 products</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        
        {/* 2. SIDEBAR FILTERS */}
        <aside className="w-full md:w-72 space-y-10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Fulltext" 
              className="w-full py-2 px-4 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-300" size={16} />
          </div>

          <section>
            <h3 className="font-bold text-sm text-[#1A2E35] mb-4 border-b border-gray-100 pb-2">Binding</h3>
            <div className="space-y-2">
              {["Paperback", "Hardback", "Board book", "Spiral bound"].map(type => (
                <label key={type} className="flex items-center justify-between text-xs text-gray-500 group cursor-pointer hover:text-emerald-600">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-0 w-4 h-4" />
                    {type}
                  </div>
                  <span className="text-[10px] text-gray-300">45</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-sm text-[#1A2E35] mb-4 border-b border-gray-100 pb-2">Availability</h3>
            <div className="space-y-2 text-xs text-gray-500">
              {["Within 24 hours", "Within a week", "Within a month", "Pre-order"].map(time => (
                <div key={time} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-600 w-4 h-4" />
                  {time}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-sm text-[#1A2E35] mb-4 border-b border-gray-100 pb-2">Price</h3>
            <div className="px-2 mb-4">
              <div className="h-1 bg-gray-200 rounded-full relative">
                <div className="absolute left-0 right-1/4 h-full bg-emerald-500 rounded-full" />
                <div className="absolute left-0 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full -top-1 shadow-sm" />
                <div className="absolute right-1/4 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full -top-1 shadow-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">From</span>
              <input type="text" value={priceRange.from} readOnly className="w-12 py-1 text-center border rounded text-xs" />
              <span className="text-[10px] text-gray-400">To</span>
              <input type="text" value={priceRange.to} readOnly className="w-12 py-1 text-center border rounded text-xs" />
            </div>
          </section>
        </aside>

        {/* 3. PRODUCT GRID AREA */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-10 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-bold text-gray-700">Sort by: <span className="text-emerald-600">Most popular</span> <ChevronDown size={14} /></span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Page</span>
                <select className="border rounded px-2 py-1 focus:outline-none"><option>1</option></select>
                <span>of 4</span>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 border rounded-md bg-gray-100 text-gray-300 cursor-not-allowed">{"<"}</button>
                <button className="p-1.5 border rounded-md bg-[#2CB391] text-white font-bold px-3 hover:bg-[#249278]">{">"}</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
            {GIFT_PRODUCTS.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative aspect-[2/3] bg-white rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.05)] overflow-hidden mb-4 border-b-2 border-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {product.badge && (
                    <div className="absolute top-0 left-2 bg-[#F37021] text-white p-1 rounded-b-sm shadow-md text-[10px] font-bold">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-2 translate-y-full group-hover:translate-y-0 transition-transform flex gap-1">
                    {/* 4. Butona onClick eklendi */}
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md flex justify-center items-center shadow-lg transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                    <button className="bg-white text-emerald-600 hover:bg-gray-50 p-2 rounded-md shadow-lg border border-gray-100 transition-colors">
                      <Search size={14} />
                    </button>
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-[#2CB391] line-clamp-2 leading-tight mb-1 hover:underline cursor-pointer">
                  {product.title}
                </h4>
                <p className="text-[11px] text-gray-400 mb-2 italic">{product.author}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="text-[10px] uppercase font-bold text-gray-300 flex items-center gap-1">
                    <span className="w-4 h-3 bg-blue-100 inline-block rounded-sm"></span> {product.type}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-black text-[#1A2E35]">{product.price} €</span>
                  <button className="text-emerald-500 p-1 bg-emerald-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
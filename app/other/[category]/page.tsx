"use client";

import { useParams } from "next/navigation";
import { Filter, ChevronDown, ShoppingCart } from "lucide-react";
// 1. Context'ten useCart'ı import et
import { useCart } from "../../context/CartContext";

export default function OtherProductsPage() {
  const params = useParams();
  const category = (params?.category as string) || "";
  const displayCategory = category.replace("-", " ");

  // 2. addToCart fonksiyonunu Context'ten çek
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

  // Bu sayfa için geçici dummy veriler (Gelecekte Supabase'den çekilecek)
  const dummyProducts = [
    { id: `other-1-${category}`, title: `Premium ${displayCategory} Item 1`, price: 19.99, cover: "🎁" },
    { id: `other-2-${category}`, title: `Special ${displayCategory} Item 2`, price: 29.50, cover: "📦" },
    { id: `other-3-${category}`, title: `Basic ${displayCategory} Item 3`, price: 9.99, cover: "🏷️" },
    { id: `other-4-${category}`, title: `Limited ${displayCategory} Item 4`, price: 49.00, cover: "✨" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 text-gray-800">
      
      {/* SOL TARAF: FİLTRELER */}
      <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit shrink-0">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Filter size={18} className="text-red-700" /> Properties
        </h3>
        <p className="text-sm text-gray-500 italic">Filters for {displayCategory}...</p>
      </aside>

      {/* SAĞ TARAF: ÜRÜN LİSTESİ */}
      <main className="flex-1">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-black uppercase italic capitalize">
            Browsing: <span className="text-emerald-600">{displayCategory}</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 font-bold cursor-pointer">
            Sort by: Popularity <ChevronDown size={16} />
          </div>
        </header>

        {/* 4. Dummy Ürünleri Listele ve Butona onClick Ekle */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white border border-gray-100 rounded-xl p-3 hover:shadow-2xl transition-all duration-300">
              
              {/* Görsel Alanı (Şimdilik Emoji) */}
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-teal-50 flex items-center justify-center text-6xl">
                {product.cover}
                
                {/* Sepete Ekle Butonu */}
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
              
              {/* Ürün Bilgileri */}
              <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{product.title}</h4>
              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-emerald-700 font-black text-base">€{product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
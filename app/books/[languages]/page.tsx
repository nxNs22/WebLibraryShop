"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Filter, Star, ShoppingCart, ChevronDown } from "lucide-react";

// Örnek Veri Seti
const ALL_BOOKS = [
  { id: 1, title: "Miras", author: "Berdinazar Hudaynazarow", price: 15.50, lang: "turkmen", category: "Classic", image: "https://via.placeholder.com/150x220", rating: 5 },
  { id: 2, title: "İnce Memed", author: "Yaşar Kemal", price: 12.90, lang: "turkish", category: "Fiction", image: "https://via.placeholder.com/150x220", rating: 4 },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 18.00, lang: "english", category: "Classic", image: "https://via.placeholder.com/150x220", rating: 5 },
  { id: 4, title: "Yatır", author: "Turkmen Author", price: 10.00, lang: "turkmen", category: "History", image: "https://via.placeholder.com/150x220", rating: 3 },
];

export default function BooksByLanguage() {
  const params = useParams();
  
  // Klasör ismin [languages] olduğu için params içinden de 'languages' olarak çekiyoruz
  // toLowerCase hatasını önlemek için varsayılan bir boş string ("") ekledik
  const currentLanguage = (params?.languages as string) || "";

  const [priceRange, setPriceRange] = useState(100);

  // URL'deki dile göre kitapları filtrele
  const filteredBooks = useMemo(() => {
    if (!currentLanguage) return [];
    
    return ALL_BOOKS.filter(book => 
      book.lang === currentLanguage.toLowerCase() && book.price <= priceRange
    );
  }, [currentLanguage, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      
      {/* SOL TARAF: PROPERTIES (FİLTRELER) */}
      <aside className="w-full md:w-64 space-y-8 bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-2 text-gray-800">
            <Filter size={20} className="text-red-700" /> Properties
          </h3>

          {/* Fiyat Ayarı */}
          <div className="mb-8">
            <label className="text-sm font-bold text-gray-700 block mb-3">
              Price: up to €{priceRange}
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Kategoriler */}
          <div className="mb-8">
            <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider text-[11px]">Book Types</p>
            <div className="space-y-3">
              {["Fiction", "Non-fiction", "History", "Classic", "Children"].map(cat => (
                <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-red-700 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* SAĞ TARAF: LİSTELEME ALANI */}
      <main className="flex-1">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black uppercase text-gray-900 italic">
              Books in {currentLanguage}
            </h1>
            <p className="text-xs text-gray-500 font-medium">{filteredBooks.length} items found</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 font-bold cursor-pointer">
            Sort by: Popularity <ChevronDown size={16} />
          </div>
        </header>

        {/* Kitap Kartları */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group flex flex-col bg-white border border-gray-100 rounded-xl p-3 hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <button className="absolute bottom-3 right-3 bg-emerald-600 text-white p-2.5 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ShoppingCart size={18} />
                </button>
              </div>
              
              <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{book.title}</h4>
              <p className="text-[11px] text-gray-500 mb-2 italic">{book.author}</p>
              
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-emerald-700 font-black text-base">€{book.price.toFixed(2)}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded">
                  {book.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No books found in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
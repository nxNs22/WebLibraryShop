"use client";

import { useState, useEffect } from "react";
import { supabase, getErrorMessage } from "../lib/supabaseClient"; 
// 1. Hook'u import et
import { useCart } from "../context/CartContext"; 

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating) ? "text-accent" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

export default function BestsellersSection() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. addToCart fonksiyonunu çek
  const { addToCart } = useCart(); 

  // Sepete eklendiğinde çalışacak fonksiyon
  const handleAddToCart = (book: any, e: React.MouseEvent) => {
    e.preventDefault(); // Sayfanın üste atmasını engeller
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      // Eğer veritabanında cover görseli yoksa şimdilik emoji atıyoruz
      cover: book.genre === 'Bilim Kurgu' ? '🚀' : book.genre === 'Tarih' ? '🏛️' : '📚' 
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('books')
          .select('*')
          .limit(6)
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;
        setBooks(data || []);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-white" id="bestsellers-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-teal-900">
              Yeni Gelenler
            </h2>
            <p className="text-teal-600 mt-1">
              Mağazamıza eklenen en son kitaplar
            </p>
          </div>
        </div>

        {loading && <p className="text-teal-600">Kitaplar yükleniyor...</p>}
        {error && <p className="text-red-500">Hata: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="group relative hover-lift rounded-xl bg-white border border-gray-100 overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                {/* Stok Durumu Rozeti */}
                {book.stock < 30 && (
                  <div className="absolute top-2 left-2 z-10 bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Son {book.stock} Ürün!
                  </div>
                )}

                <div className="relative aspect-[3/4] bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {book.genre === 'Bilim Kurgu' ? '🚀' : book.genre === 'Tarih' ? '🏛️' : '📚'}
                  </span>

                  <div
                    className={`absolute inset-0 bg-teal-900/60 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                      hoveredBook === book.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* 3. Butona onClick eventi ve handleAddToCart bağlandı */}
                    <button 
                      onClick={(e) => handleAddToCart(book, e)}
                      className="bg-white text-teal-700 p-2 rounded-full hover:bg-teal-50 transition-colors shadow-lg"
                      title="Sepete Ekle"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-teal-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                  <StarRating rating={5} />
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-teal-700">
                      {book.price} TL
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
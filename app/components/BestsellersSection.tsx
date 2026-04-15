"use client";

import { useState } from "react";
import Image from "next/image";

const books = [
  {
    id: 1,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    price: "€12.99",
    oldPrice: "€15.99",
    rating: 4.8,
    cover: "📕",
    badge: "Bestseller",
    badgeColor: "bg-coral",
  },
  {
    id: 2,
    title: "Les Misérables",
    author: "Victor Hugo",
    price: "€14.49",
    oldPrice: "€18.99",
    rating: 4.9,
    cover: "📗",
    badge: "-24%",
    badgeColor: "bg-accent",
  },
  {
    id: 3,
    title: "The Witcher: The Last Wish",
    author: "Andrzej Sapkowski",
    price: "€11.99",
    oldPrice: "€14.99",
    rating: 4.7,
    cover: "📘",
    badge: "New",
    badgeColor: "bg-green-btn",
  },
  {
    id: 4,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    price: "€13.49",
    oldPrice: null,
    rating: 4.6,
    cover: "📙",
    badge: null,
    badgeColor: "",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: "€9.99",
    oldPrice: "€12.99",
    rating: 4.8,
    cover: "📕",
    badge: "-23%",
    badgeColor: "bg-accent",
  },
  {
    id: 6,
    title: "1984",
    author: "George Orwell",
    price: "€10.49",
    oldPrice: "€13.99",
    rating: 4.9,
    cover: "📗",
    badge: "Bestseller",
    badgeColor: "bg-coral",
  },
];

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

  return (
    <section className="py-16 bg-white" id="bestsellers-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-teal-900">
              Bestsellers
            </h2>
            <p className="text-teal-600 mt-1">
              Most popular books this week
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-1 text-teal-600 hover:text-teal-800 font-medium text-sm transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative hover-lift rounded-xl bg-white border border-gray-100 overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              id={`book-${book.id}`}
            >
              {/* Badge */}
              {book.badge && (
                <div
                  className={`absolute top-2 left-2 z-10 ${book.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-md`}
                >
                  {book.badge}
                </div>
              )}

              {/* Book cover */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {book.cover}
                </span>

                {/* Quick actions overlay */}
                <div
                  className={`absolute inset-0 bg-teal-900/60 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                    hoveredBook === book.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="bg-white text-teal-700 p-2 rounded-full hover:bg-teal-50 transition-colors shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </button>
                  <button className="bg-white text-coral p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Book info */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-teal-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                <StarRating rating={book.rating} />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-bold text-teal-700">
                    {book.price}
                  </span>
                  {book.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {book.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

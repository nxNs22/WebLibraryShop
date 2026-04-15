"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: "Books", hasDropdown: true },
    { label: "E-books", hasDropdown: true },
    { label: "Audiobooks", hasDropdown: true },
    { label: "Other products", hasDropdown: true },
    { label: "Gift tips", hasDropdown: true, icon: "🎁" },
    { label: "Gift voucher", hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-teal-800 text-white/80 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            Check order status
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Free delivery over €30</span>
            <span className="hidden sm:block">|</span>
            <a href="#" className="hover:text-white transition-colors">EN</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-teal-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex flex-col items-center group">
            <div className="relative w-10 h-10 mb-0.5">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M20 8 C15 4, 5 6, 5 14 C5 22, 20 32, 20 32 C20 32, 35 22, 35 14 C35 6, 25 4, 20 8Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="group-hover:stroke-teal-200 transition-colors"
                />
                <path
                  d="M8 10 Q8 6, 14 6 M26 6 Q32 6, 32 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  className="group-hover:stroke-teal-200 transition-colors"
                />
              </svg>
            </div>
            <span className="text-white font-heading text-xl font-bold tracking-wider leading-none group-hover:text-teal-200 transition-colors">
              LIBRISTO
            </span>
            <span className="text-teal-300 text-[10px] tracking-[0.2em] uppercase">
              Be Whoever
            </span>
          </a>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl hidden sm:flex">
            <div className="flex w-full rounded-lg overflow-hidden shadow-md">
              <div className="flex items-center bg-white/90 pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter book title, author, publisher, EAN,..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-3 bg-white/90 text-gray-700 text-sm focus:outline-none placeholder:text-gray-400"
                id="search-input"
              />
              <button
                className="bg-green-btn hover:bg-green-btn-hover text-white font-semibold px-6 py-2.5 text-sm transition-colors duration-200"
                id="search-button"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-4 ml-auto sm:ml-0">
            {/* Help */}
            <a
              href="#"
              className="hidden md:flex flex-col items-center text-white/70 hover:text-white transition-colors group"
              id="help-link"
            >
              <svg
                className="w-6 h-6 mb-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-[10px]">Help</span>
            </a>

            {/* My Account */}
            <a
              href="#"
              className="hidden md:flex flex-col items-center text-white/70 hover:text-white transition-colors group"
              id="account-link"
            >
              <svg
                className="w-6 h-6 mb-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-[10px]">My account</span>
            </a>

            {/* Cart */}
            <button
              className="flex items-center gap-2 bg-green-btn hover:bg-green-btn-hover text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              id="cart-button"
            >
              <span className="hidden sm:inline">Empty</span> 🛒
              <span className="relative">
                <span className="absolute -top-3 -right-3 bg-coral text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="flex w-full rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2.5 px-3 bg-white/90 text-gray-700 text-sm focus:outline-none"
            />
            <button className="bg-green-btn text-white font-semibold px-4 py-2.5 text-sm">
              Search
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-teal-800/50 border-t border-teal-700/50">
          <div className="max-w-7xl mx-auto px-4">
            <ul
              className={`${
                mobileMenuOpen ? "flex" : "hidden"
              } lg:flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-0`}
            >
              {/* Home icon */}
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-3 text-white/80 hover:text-white hover:bg-teal-700/50 transition-all duration-200"
                  id="nav-home"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </li>

              {navItems.map((item, i) => (
                <li key={i} className="w-full lg:w-auto">
                  <a
                    href="#"
                    className={`flex items-center gap-1 px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-teal-700/50 ${
                      item.label === "Gift voucher"
                        ? "text-coral hover:text-coral"
                        : "text-white/90 hover:text-white"
                    }`}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                    {item.hasDropdown && (
                      <svg
                        className="w-3 h-3 ml-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

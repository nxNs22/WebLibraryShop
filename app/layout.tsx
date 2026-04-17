"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Zaten var olan Footer'ı import ediyoruz


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Üst kısım: Header her zaman burada */}
        <Header />
        
        {/* Orta kısım: Sayfa içerikleri (Books, Home vb.) buraya gelecek */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Alt kısım: Footer her zaman en altta */}
        <Footer />
      </body>
    </html>
  );
}
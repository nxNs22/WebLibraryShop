import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Libristo — The World's Widest Selection of Books | Be Whoever",
  description:
    "Discover over 23 million book titles in 150+ languages. Great prices, fast delivery, and the LIBROAMANTO club. Libristo — Be Whoever you want to be through books.",
  keywords: [
    "books",
    "bookshop",
    "online bookstore",
    "ebooks",
    "audiobooks",
    "buy books online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}

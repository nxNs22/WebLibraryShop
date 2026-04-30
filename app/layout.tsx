import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIChatWidget from "./components/AIChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Library Shop",
  description: "The best book store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            
            <main className="min-h-screen">
              {children}
            </main>
            
            <Footer />
            <AIChatWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
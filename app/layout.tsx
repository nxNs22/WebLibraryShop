import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";
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
            <HeaderWrapper />
            
            <main className="min-h-screen">
              {children}
            </main>
            
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
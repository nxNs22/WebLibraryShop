// app/layout.tsx
import {CartProvider } from "./context/CartContext"; // Yolun doğru olduğundan emin ol
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css"; // Bu satır yoksa tasarım asla yüklenmez!


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* CartProvider her şeyi sarmalamalı! */}
        <CartProvider>
          {/* Header artık Provider içinde olduğu için useCart hata vermeyecek */}
          <Header />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
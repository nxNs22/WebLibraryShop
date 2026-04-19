"use client";
import { useCart } from "../context/CartContext";// Yolunu kontrol et
import { ShoppingCart, Truck, MapPin, FileText, Trash2, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  const steps = [
    { name: "Shopping cart", icon: <ShoppingCart size={20} />, active: true },
    { name: "Delivery & Payment", icon: <Truck size={20} />, active: false },
    { name: "Delivery details", icon: <MapPin size={20} />, active: false },
    { name: "Order summary", icon: <FileText size={20} />, active: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. STEPS BAR (Yeşil Alan) */}
      <div className="bg-[#2CB391] py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center relative">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col items-center z-10 ${step.active ? "text-white" : "text-white/60"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step.active ? "bg-white text-[#2CB391]" : "bg-[#249278]"}`}>
                {step.icon}
              </div>
              <span className="text-xs font-bold uppercase">{step.name}</span>
            </div>
          ))}
          {/* Bağlantı Çizgisi */}
          <div className="absolute top-6 left-0 w-full h-[2px] bg-white/20 -z-0 hidden md:block" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 2. TABLO BAŞLIKLARI */}
        <div className="hidden md:grid grid-cols-6 text-[11px] font-bold text-gray-400 uppercase border-b pb-4 mb-6">
          <div className="col-span-2">Product</div>
          <div className="text-center">Number</div>
          <div className="text-center">Stock Availability</div>
          <div className="text-center">Gift-wrapping</div>
          <div className="text-right">Price</div>
        </div>

        {/* 3. ÜRÜN LİSTESİ */}
        {cartItems.length === 0 ? (
          <div className="text-center py-20 italic text-gray-400 border-b">Your cart is empty.</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 py-6 border-b">
              <div className="col-span-2 flex gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-24 object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-[#1A2E35]">{item.title}</h4>
                  <p className="text-xs text-gray-400 italic">{item.author}</p>
                  <p className="text-[10px] mt-1 uppercase text-gray-500">🇬🇧 / {item.type}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="border flex items-center px-4 py-2 font-bold">{item.quantity}</div>
              </div>
              <div className="flex justify-center">
                <span className="bg-[#E8F5F1] text-[#2CB391] text-[10px] font-bold px-3 py-2 rounded text-center leading-tight">
                  In stock <br /> <span className="text-[9px] font-normal">Shipping within 24 hours</span>
                </span>
              </div>
              <div className="flex justify-center">
                <select className="text-xs border rounded p-2 bg-gray-50 w-full max-w-[120px]"><option>Select</option></select>
              </div>
              <div className="flex items-center justify-end gap-4 font-bold text-[#1A2E35]">
                {item.price} € 
                <button onClick={() => removeFromCart(item.id)} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}

        {/* 4. ALT BİLGİ VE COUPON */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-auto">
            <div className="bg-[#F9FBF9] p-4 border rounded flex gap-2 items-center">
              <span className="text-xs font-bold text-[#2CB391]">Do you have a discount coupon?</span>
              <input type="text" className="border p-1 text-sm outline-none" />
              <button className="bg-[#2CB391] text-white px-4 py-1 text-xs font-bold rounded">Apply</button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Total price:</p>
            <p className="text-4xl font-black text-[#1A2E35]">{totalPrice.toFixed(2)} €</p>
          </div>
        </div>

        {/* 5. BUTONLAR */}
        <div className="mt-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600">
            <ArrowLeft size={14} /> Back to the shop
          </Link>
          <button className="bg-[#F14D5D] hover:bg-[#d43f4d] text-white px-10 py-4 rounded font-bold flex items-center gap-2 transition-all">
            Proceed to delivery & payment <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
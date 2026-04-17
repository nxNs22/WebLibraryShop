"use client";
import { useParams } from "next/navigation";
import { Filter, ChevronDown } from "lucide-react";

export default function OtherProductsPage() {
  const params = useParams();
  const category = (params?.category as string) || "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 text-gray-800">
      <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Filter size={18}/> Properties</h3>
        <p className="text-sm text-gray-500 italic">Filters for {category}...</p>
      </aside>
      <main className="flex-1">
        <h1 className="text-2xl font-black uppercase italic mb-8 border-b pb-4">Browsing: {category.replace("-", " ")}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Ürün kartları buraya gelecek */}
          <div className="p-10 bg-gray-50 rounded-lg text-center text-gray-400">Products Coming Soon</div>
        </div>
      </main>
    </div>
  );
}
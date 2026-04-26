// app/admin/layout.tsx
"use client";

import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/nextjs-router";
// Bir önceki adımda oluşturduğumuz supabase istemcisini çağırıyoruz
import { supabase } from "../lib/supabaseClient";
import AdminGuard from "../cart/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
    <Refine
      dataProvider={dataProvider(supabase)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "books", // Supabase'deki tablo adımız
          list: "/admin/books", // Listeleme sayfası
          create: "/admin/books/create", // Yeni ekleme sayfası
          edit: "/admin/books/edit/:id", // Düzenleme sayfası
          meta: { label: "Kitap Yönetimi" } // Sol menüde görünecek isim
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      <ThemedLayout>
        {children}
      </ThemedLayout>
    </Refine>
    </AdminGuard>
  );
}
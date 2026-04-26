"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (typeof pathname === "string" && pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}

"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // If we're inside the admin panel (any route starting with /admin), don't render the site header
  if (typeof pathname === "string" && pathname.startsWith("/admin")) {
    return null;
  }

  return <Header />;
}

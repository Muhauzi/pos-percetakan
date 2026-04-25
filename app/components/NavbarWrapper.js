// app/components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Jika di halaman landing page (/), jangan tampilkan navbar admin
  if (pathname === "/") return null;

  return <Navbar />;
}
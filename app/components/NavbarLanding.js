"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavbarLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek ganti background saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menus = [
    { n: "Beranda", h: "#hero" },
    { n: "Layanan", h: "#layanan" },
    { n: "Lokasi", h: "#lokasi" },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 px-6 py-4 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div className={`font-black tracking-tighter text-2xl italic ${scrolled ? "text-blue-600" : "text-white"}`}>
          Percetakan Hade
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menus.map((m) => (
            <a key={m.n} href={m.h} className={`text-sm font-bold hover:opacity-70 transition-all ${scrolled ? "text-gray-700" : "text-white"}`}>
              {m.n}
            </a>
          ))}
          <Link href="/penjualan" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-all">
            ADMIN
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${scrolled ? "text-gray-600" : "text-white"}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white rounded-2xl mt-2 shadow-xl ${isOpen ? "max-h-64 p-4" : "max-h-0"}`}>
        <div className="flex flex-col gap-4 text-center">
          {menus.map((m) => (
            <a key={m.n} href={m.h} onClick={() => setIsOpen(false)} className="text-gray-600 font-bold text-sm uppercase">{m.n}</a>
          ))}
          <Link href="/penjualan" className="bg-blue-600 text-white py-3 rounded-xl font-bold text-sm">ADMIN / KASIR</Link>
        </div>
      </div>
    </nav>
  );
}
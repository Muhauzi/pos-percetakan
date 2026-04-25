"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Tutup menu otomatis setiap kali pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  const menus = [
    { n: "Kasir", h: "/penjualan" },
    { n: "Riwayat", h: "/riwayat" },
    { n: "Kategori", h: "/kategori" },
    { n: "Pengeluaran", h: "/pengeluaran" },
    { n: "Rekap", h: "/dashboard" },
  ];

  const handleLogout = () => {
    if (confirm("Yakin ingin keluar?")) {
      // Hapus cookie
      document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/login";
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="font-black text-blue-600 tracking-tighter text-xl italic">
          Percetakan Hade
        </div>

        {/* MENU DESKTOP (Muncul di layar besar) */}
        <div className="hidden md:flex gap-6">
          {menus.map((m) => (
            <Link
              key={m.h}
              href={m.h}
              className={`text-sm font-bold transition-all ${
                path === m.h
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {m.n}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 border border-red-100 px-3 py-1 rounded-lg hover:bg-red-50"
          >
            LOGOUT
          </button>
        </div>

        {/* TOMBOL HAMBURGER (Muncul di HP) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 focus:outline-none"
        >
          {isOpen ? (
            // Ikon X (Close)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Ikon Strip 3 (Hamburger)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE (Dropdown) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 pb-4">
          {menus.map((m) => (
            <Link
              key={m.h}
              href={m.h}
              className={`p-3 rounded-xl text-sm font-bold transition-all ${
                path === m.h
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {m.n}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 border border-red-100 px-3 py-1 rounded-lg hover:bg-red-50"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}

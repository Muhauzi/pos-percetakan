import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS Percetakan",
  description: "Sistem Penjualan Percetakan Sederhana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" // Ubah ke id untuk Indonesia
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // Tambahkan ini di sini juga untuk amannya
    >
      <body
        className="min-h-full flex flex-col bg-white text-black" // Tambahkan bg-white text-black agar tidak kena dark mode otomatis
        suppressHydrationWarning={true} // INI KUNCINYA untuk mengatasi error cz-shortcut-listen
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import AuthWrapper from "./components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata sekarang aman di sini karena ini Server Component
export const metadata: Metadata = {
  title: "Percetakan Hade",
  description: "Percetakan Terbaik Di Pagaden",
};

export default function RootLayout({ 
  children, 
}: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-black">
        {/* AuthWrapper akan menjaga seluruh halaman */}
        <AuthWrapper>
          <NavbarWrapper />
          <main className="flex-grow">
            {children}
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}
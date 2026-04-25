"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Cek cookie
    const isLoggedIn = document.cookie.split("; ").find(row => row.startsWith("isLoggedIn="));
    
    // Daftar halaman yang BOLEH diakses tanpa login
    const publicPages = ["/", "/login"];

    if (!isLoggedIn && !publicPages.includes(pathname)) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized && pathname !== "/" && pathname !== "/login") {
    return <div className="min-h-screen bg-white"></div>; // Loading kosong sementara redirect
  }

  return children;
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../components/LoadingOverlay";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // HARDCODED CREDENTIALS (Silakan ubah sesuai keinginan)
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "admin123";

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        // Simpan status login di cookie (berlaku 1 hari)
        document.cookie = "isLoggedIn=true; path=/; max-age=86400";
        router.push("/dashboard");
      } else {
        setError("Username atau Password salah!");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoadingOverlay isLoading={loading} />
      
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="font-black text-blue-600 text-3xl italic mb-2 tracking-tighter">POS.Fz</div>
          <p className="text-gray-400 text-sm font-medium">Silakan masuk untuk akses sistem admin.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Username</label>
            <input 
              type="text"
              className="w-full border-gray-200 border p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={username} onChange={e => setUsername(e.target.value)} required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
            <input 
              type="password"
              className="w-full border-gray-200 border p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center animate-bounce">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            MASUK SEKARANG
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => router.push("/")} className="text-gray-400 text-xs font-bold hover:text-blue-600 transition-colors">
            &larr; KEMBALI KE BERANDA
          </button>
        </div>
      </div>
    </div>
  );
}
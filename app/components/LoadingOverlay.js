"use client";

export default function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        {/* Lingkaran Luar */}
        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Logo Tengah */}
        <div className="absolute font-black text-blue-600 italic text-xs animate-pulse">
          POS.Fz
        </div>
      </div>
      <p className="mt-4 text-sm font-bold text-blue-900 tracking-widest animate-pulse">
        LOADING...
      </p>
    </div>
  );
}
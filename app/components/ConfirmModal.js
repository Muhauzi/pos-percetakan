"use client";
import { useEffect, useState } from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Hapus", type = "danger" }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateState, setAnimateState] = useState("closed");

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimateState("closed");
      setTimeout(() => setAnimateState("opening"), 50);
    } else if (shouldRender && animateState !== "closing") {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimateState("closing");
    setTimeout(() => {
      setShouldRender(false);
      setAnimateState("closed");
      if (onClose) onClose();
    }, 500);
  };

  if (!shouldRender) return null;

  const isOpeningOrOpen = animateState === "opening" || animateState === "open";
  
  // Gaya warna berdasarkan tipe (danger untuk hapus, warning untuk lainnya)
  const colorClass = type === "danger" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600";
  const btnClass = type === "danger" ? "bg-red-600 hover:bg-red-700 shadow-red-100" : "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-100";

  const animationClasses = isOpeningOrOpen 
    ? "translate-y-0 scale-100 opacity-100" 
    : "translate-y-24 scale-90 opacity-0";

  const transitionTiming = isOpeningOrOpen
    ? "duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)" 
    : "duration-500 ease-in";

  return (
    <div className={`fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpeningOrOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-[40px] overflow-hidden w-full max-w-xs shadow-2xl text-center relative transform transition-all ${animationClasses} ${transitionTiming}`}>
        
        <div className="p-8 pb-10">
          {/* Ikon Peringatan dengan Animasi Bounce */}
          <div className={`w-20 h-20 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-700 delay-200 ${isOpeningOrOpen ? 'scale-100 rotate-0' : 'scale-0 rotate-12'}`}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 className={`text-2xl font-black text-gray-800 mb-2 tracking-tighter transition-all duration-500 delay-300 ${isOpeningOrOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {title || "Yakin Hapus?"}
          </h3>
          <p className={`text-gray-500 text-sm mb-8 leading-relaxed px-1 transition-all duration-500 delay-400 ${isOpeningOrOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {message || "Data yang sudah dihapus tidak dapat dikembalikan lagi."}
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onConfirm();
                handleClose();
              }}
              className={`w-full ${btnClass} text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-all`}
            >
              {confirmText.toUpperCase()}
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3 rounded-2xl transition-all active:scale-95"
            >
              BATAL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
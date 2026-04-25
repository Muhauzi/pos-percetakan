"use client";
import { useEffect, useState, useRef } from "react";

export default function SuccessModal({ isOpen, onClose, message, duration = 2000 }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateState, setAnimateState] = useState("closed"); // closed, opening, open, closing
  const autoCloseTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimateState("closed");

      // Jeda mikro agar browser siap melakukan transisi float-up
      const startAnimTimer = setTimeout(() => {
        setAnimateState("opening");
      }, 50);

      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(startAnimTimer);
    } else if (shouldRender && animateState !== "closing") {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    
    // 1. Mulai animasi keluar (tutup)
    setAnimateState("closing");

    // 2. Tunggu animasi kartu selesai (500ms) baru hilangkan dari DOM sepenuhnya
    setTimeout(() => {
      setShouldRender(false);
      setAnimateState("closed"); // Reset ke closed di sini setelah benar-benar hilang
      if (onClose) onClose();
    }, 500); 
  };

  if (!shouldRender) return null;

  const isOpeningOrOpen = animateState === "opening" || animateState === "open";
  const isClosing = animateState === "closing";

  // --- KELAS ANIMASI KARTU ---
  const animationClasses = isOpeningOrOpen 
    ? "translate-y-0 scale-100 opacity-100" 
    : "translate-y-24 scale-90 opacity-0"; // Meluncur lebih dalam saat keluar

  const transitionTiming = isOpeningOrOpen
    ? "duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)" 
    : "duration-500 ease-in"; // Keluar lebih tegas

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpeningOrOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()} 
    >
      <div
        className={`bg-white rounded-[40px] overflow-hidden w-full max-w-xs shadow-2xl text-center relative transform transition-all ${animationClasses} ${transitionTiming}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-10">
          {/* Ikon Bounce */}
          <div className={`w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-700 delay-200 ${isOpeningOrOpen ? 'scale-100 rotate-0' : 'scale-0 rotate-12'}`}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: '100',
                  strokeDashoffset: isOpeningOrOpen ? '0' : '100',
                  transition: 'stroke-dashoffset 0.6s ease-out 0.4s'
                }}
              />
            </svg>
          </div>

          <h3 className={`text-2xl font-black text-gray-800 mb-2 tracking-tighter transition-all duration-500 delay-300 ${isOpeningOrOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            BERHASIL!
          </h3>
          <p className={`text-gray-500 text-sm mb-7 leading-relaxed px-1 transition-all duration-500 delay-400 ${isOpeningOrOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {message}
          </p>
        </div>

        {/* LOADING BAR (PROGRESS BAR) FIX */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-gray-100 w-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              // LOGIKA: Jika state 'closed', reset ke 100%. 
              // Jika sedang jalan atau sedang 'closing', biarkan di 0% agar tidak snap-back (flicker).
              width: animateState === "closed" ? '100%' : '0%', 
              
              // Transisi hanya aktif saat modal benar-benar sedang terbuka (opening/open)
              transition: isOpeningOrOpen ? `width ${duration}ms linear` : 'none',
              
              // Berikan delay kecil saat muncul agar sinkron dengan float-up modal
              transitionDelay: animateState === "opening" ? '100ms' : '0ms'
            }}
          />
        </div>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";

export default function SuccessModal({ isOpen, onClose, message, duration = 2500 }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimatingOut(false);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 300); // Durasi animasi out
  };

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-[40px] overflow-hidden w-full max-w-xs shadow-2xl text-center relative transition-all duration-300 ${isAnimatingOut ? 'scale-95 opacity-0 translate-y-10' : 'scale-100 opacity-100 translate-y-0 animate-in zoom-in slide-in-from-bottom-10'}`}>
        
        <div className="p-8">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" className="animate-draw" />
            </svg>
          </div>

          <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tighter">BERHASIL!</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed px-2">{message}</p>

          <button 
            onClick={handleClose}
            className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            MANTAP
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-gray-100 w-full">
          <div 
            className="h-full bg-green-500 transition-all"
            style={{
              width: isAnimatingOut ? '0%' : '100%',
              transition: isAnimatingOut ? 'none' : `width ${duration}ms linear`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          from { stroke-dasharray: 0 100; }
          to { stroke-dasharray: 100 100; }
        }
        .animate-draw {
          animation: draw 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
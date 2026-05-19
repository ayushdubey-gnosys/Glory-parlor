import React from "react";

const Loader = ({ fullScreen = false }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center min-h-[400px] w-full py-12";

  return (
    <div className={containerClasses}>
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes luxury-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes luxury-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes luxury-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-luxury-spin {
          animation: luxury-spin 2s linear infinite;
        }
        .animate-luxury-spin-reverse {
          animation: luxury-spin-reverse 2.5s linear infinite;
        }
        .animate-luxury-pulse {
          animation: luxury-pulse 2s ease-in-out infinite;
        }
      `}} />

      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Outer Elegant Dotted Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-400/30 animate-luxury-spin-reverse" />
        
        {/* Middle Elegant Ring */}
        <div className="absolute inset-2 rounded-full border-t-2 border-b-2 border-l-2 border-r-transparent border-zinc-900 animate-luxury-spin" />

        {/* Center Pulsing Monogram */}
        <div className="absolute inset-6 rounded-2xl bg-zinc-950 flex items-center justify-center shadow-lg border border-zinc-800 animate-luxury-pulse">
          <span className="text-zinc-100 font-extrabold text-lg tracking-wider">A</span>
        </div>
      </div>

      {/* Loading Label */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="text-zinc-950 font-bold text-xs uppercase tracking-[0.25em] animate-pulse">
          Astha PMS
        </span>
        <span className="text-zinc-400 text-[10px] uppercase tracking-[0.15em] font-medium">
          Loading Luxury Experience...
        </span>
      </div>
    </div>
  );
};

export default Loader;

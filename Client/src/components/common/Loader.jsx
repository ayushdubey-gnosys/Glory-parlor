import React from "react";

const Loader = ({ fullScreen = false }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
    : "flex flex-col items-center justify-center min-h-[400px] w-full py-12";

  return (
    <div className={containerClasses}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes spinReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }

          @keyframes pulseGlow {
            0%,100% {
              transform: scale(1);
              box-shadow: 0 0 15px rgba(234,179,8,.4);
            }
            50% {
              transform: scale(1.08);
              box-shadow: 0 0 40px rgba(234,179,8,.9);
            }
          }

          @keyframes textGlow {
            0%,100% {
              opacity: .7;
            }
            50% {
              opacity: 1;
            }
          }

          .spinSlow {
            animation: spinSlow 3s linear infinite;
          }

          .spinReverse {
            animation: spinReverse 5s linear infinite;
          }

          .pulseGlow {
            animation: pulseGlow 2s ease-in-out infinite;
          }

          .textGlow {
            animation: textGlow 2s ease-in-out infinite;
          }
        `,
        }}
      />

      {/* Outer Glow */}
      <div className="relative flex items-center justify-center w-40 h-40">
        
        {/* Glow Effect */}
        <div className="absolute w-32 h-32 rounded-full bg-yellow-500/20 blur-3xl" />

        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-yellow-500/30 spinReverse" />

        {/* Ring 2 */}
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-400 spinSlow" />

        {/* Ring 3 */}
        <div className="absolute inset-7 rounded-full border border-yellow-500/40 border-dashed spinReverse" />

        {/* Center Logo */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center pulseGlow border border-yellow-300 shadow-[0_0_40px_rgba(234,179,8,.6)]">
          <span className="text-black font-black text-3xl">
            A
          </span>
        </div>
      </div>

      {/* Brand Name */}
      <div className="mt-8 text-center">
        <h2
          className="
          text-yellow-400
          text-xl
          font-bold
          tracking-[0.35em]
          uppercase
          textGlow
          [text-shadow:0_0_20px_rgba(234,179,8,.9)]
        "
        >
          Astha PMS
        </h2>

        <p className="mt-2 text-yellow-100/60 text-xs tracking-[0.25em] uppercase">
          Loading Luxury Experience
        </p>
      </div>
    </div>
  );
};

export default Loader;
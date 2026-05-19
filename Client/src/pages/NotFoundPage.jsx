import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 text-zinc-955 relative overflow-hidden">
      
      {/* Background luxury soft blur gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-zinc-200/40 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-zinc-200/30 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-md w-full text-center space-y-8 bg-white border border-zinc-200/80 rounded-[40px] p-8 md:p-12 shadow-xl relative">
        {/* Monogram Logo Badge */}
        <div className="inline-flex w-14 h-14 rounded-2xl bg-zinc-950 items-center justify-center text-white font-extrabold text-xl shadow-md border border-zinc-800 mx-auto">
          A
        </div>

        {/* 404 Visual Content */}
        <div className="space-y-2">
          <h1 className="text-8xl font-black tracking-tighter text-zinc-900 select-none animate-pulse">
            404
          </h1>
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 uppercase">
            Luxury Lost in Space
          </h2>
          <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist, or has been moved to a premium location.
          </p>
        </div>

        {/* Home Action Redirect Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 text-white rounded-2xl py-4 px-8 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md active:scale-95"
        >
          Return to Experience
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

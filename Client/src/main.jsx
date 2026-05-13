import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import Providers from "./app/providers";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Providers>
      <App />

      {/* TOASTIFY */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="
          !bg-zinc-900
          !text-white
          !border
          !border-zinc-800
          !rounded-2xl
        "
        bodyClassName="text-sm font-medium"
      />
    </Providers>
  </React.StrictMode>
);
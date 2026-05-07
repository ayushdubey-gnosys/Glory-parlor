import axios from "axios";

// Prefer explicit backend URL to avoid dev-proxy misconfiguration.
// You can set VITE_API_URL in .env to override (e.g. VITE_API_URL=http://localhost:3000/api)
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // send cookies automatically
});

export default api;
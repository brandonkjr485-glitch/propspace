import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// Global request interceptor — attaches JWT to every outbound request
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("propspace_user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

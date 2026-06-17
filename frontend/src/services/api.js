import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:8000/api"
      : "https://secure-cloud-file-sharing-system-lbe3.onrender.com/api"
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-cloud-file-sharing-system-lbe3.onrender.com/api"
});

export default api;
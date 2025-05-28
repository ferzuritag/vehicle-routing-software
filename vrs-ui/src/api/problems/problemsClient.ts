import axios from "axios";

const problemsClient = axios.create({
  baseURL: import.meta.env.VITE_ROUTING_PROBLEMS_API_PATH,
});

problemsClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default problemsClient;

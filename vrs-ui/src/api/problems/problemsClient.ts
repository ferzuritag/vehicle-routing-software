import axios from "axios";

const problemsClient = axios.create({
  baseURL: "http://localhost:8002",
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

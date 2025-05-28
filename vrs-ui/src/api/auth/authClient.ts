import axios from "axios";


console.log(import.meta.env)

const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_PATH
})

export default authClient
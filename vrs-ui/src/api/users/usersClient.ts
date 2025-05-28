import axios from "axios";

const usersClient = axios.create({
    baseURL: import.meta.env.VITE_USERS_API_PATH
})

export default usersClient
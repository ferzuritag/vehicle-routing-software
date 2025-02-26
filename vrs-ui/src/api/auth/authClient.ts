import axios from "axios";

const authClient = axios.create({
    baseURL: 'http://localhost:8001'
})

export default authClient
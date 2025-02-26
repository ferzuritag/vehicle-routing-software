import axios from "axios";

const usersClient = axios.create({
    baseURL: 'http://localhost:8000'
})

export default usersClient
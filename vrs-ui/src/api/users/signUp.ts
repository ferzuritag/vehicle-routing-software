import usersClient from "./usersClient"

interface FormData {
    email: string
    password: string
}

const signUp = (data: FormData) => {
    return usersClient.post('/users', data)
}

export default signUp
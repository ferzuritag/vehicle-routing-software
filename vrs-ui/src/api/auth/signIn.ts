import authClient from "./authClient"

interface FormData {
    email: string
    password: string
}

const signIn = (data: FormData) => {
    return authClient.post('/auth', data)
}

export default signIn
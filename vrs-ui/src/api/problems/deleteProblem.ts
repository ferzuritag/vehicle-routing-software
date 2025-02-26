import problemsClient from "./problemsClient"

const deleteProblem = (id: string): Promise<unknown> => {
    return problemsClient.delete(`/routing-problems/${id}`)
}

export default deleteProblem
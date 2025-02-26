import { RoutingProblem } from "@/interfaces"
import problemsClient from "./problemsClient"
import { AxiosResponse } from "axios"

const getProblems = (): Promise<AxiosResponse<{
    routing_problems: RoutingProblem []
}>> => {
    return problemsClient.get(`/routing-problems`)
}

export default getProblems
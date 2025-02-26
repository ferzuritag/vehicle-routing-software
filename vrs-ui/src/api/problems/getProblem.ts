import { AxiosResponse } from "axios"
import { RoutingProblem } from "@/interfaces"
import problemsClient from "./problemsClient"

const getProblem = (id: string): Promise<AxiosResponse<RoutingProblem, unknown>> => {
    return problemsClient.get(`/routing-problems/${id}`)
}

export default getProblem
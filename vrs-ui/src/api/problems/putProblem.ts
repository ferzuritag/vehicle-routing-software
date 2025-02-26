import { RoutingProblem } from "@/interfaces"
import problemsClient from "./problemsClient"
import { AxiosResponse } from "axios"

const putProblem = ({id, data}: {
    id: string,
    data: RoutingProblem
}): Promise<AxiosResponse<RoutingProblem>> => {
    return problemsClient.put(`/routing-problems/${id}`, data)
}

export default putProblem
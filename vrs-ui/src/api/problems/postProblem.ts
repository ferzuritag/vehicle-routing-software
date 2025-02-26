import { RoutingProblem } from "../../interfaces"
import problemsClient from "./problemsClient"



const postProblem = (data: Partial<RoutingProblem>): Promise<unknown> => {
    return problemsClient.post('/routing-problems', data)
}

export default postProblem
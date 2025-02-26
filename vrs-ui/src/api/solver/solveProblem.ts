import { RoutingProblem } from "@/interfaces"
import axios from "axios"

const solveProblem = ({endpoint, data}: {
    endpoint: string, 
    data: RoutingProblem
}) => axios.post(endpoint, data)

export default solveProblem
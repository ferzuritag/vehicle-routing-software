import { Box } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Outlet } from "react-router-dom"
import PublicRoute from "../components/routes/PublicRoute"

const BaseLayout: FunctionComponent= () => {
    return (
        <PublicRoute>
            <Box>
                <Outlet/>
            </Box>
        </PublicRoute>
    )
}
 
export default BaseLayout
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
 
const PrivateRoute: FunctionComponent<PropsWithChildren> = ({children}) => {
    const { IS_LOGGED } = useAppContext()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!IS_LOGGED) {
            navigate('/sign-in')
        }
    }, [IS_LOGGED, navigate])
    
    return (
        <>
            {children}
        </>
    );
}
 
export default PrivateRoute;
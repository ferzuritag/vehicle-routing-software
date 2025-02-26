import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const NotFound = () => {
  const appContext = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (appContext.IS_LOGGED) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  }, [appContext, navigate]);
  return <>Redirecting...</>;
};

export default NotFound;

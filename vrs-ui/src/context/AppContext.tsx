import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import appReducer from "./reducers/appReducer";
import problemsClient from "../api/problems/problemsClient";
import actions from "./actions";
import { RoutingProblem } from "@/interfaces";

interface AppState {
  IS_LOGGED: boolean;
  MENU_PROBLEMS: RoutingProblem[];
}

interface AppContextType extends AppState {
  dispatch: React.Dispatch<unknown>;
}

const INITIAL_STATE: AppState = {
  IS_LOGGED: localStorage.getItem("jwt") !== null,
  MENU_PROBLEMS: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  useEffect(() => {
    problemsClient.interceptors.response.use(
      (response) => response,
      (errorResponse) => {
        if (errorResponse.status === 401) {
          dispatch({
            action: actions.SET_IS_LOGGED,
            payload: false,
          });
        }
        return Promise.reject(errorResponse);
      }
    );
  }, []);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

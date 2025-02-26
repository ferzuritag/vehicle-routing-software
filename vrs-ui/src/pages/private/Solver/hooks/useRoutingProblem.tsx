import { createContext, useContext, useState, ReactNode } from "react";
import { Location, RoutingProblem } from "../../../../interfaces";



interface RoutingProblemContextProps {
  routingProblem: RoutingProblem | null;
  setRoutingProblem: (problem: RoutingProblem) => void;
  updateRoutingProblem: (updates: Partial<RoutingProblem>) => void;
  clearRoutingProblem: () => void;
  addLocation: (location: Location) => void;
  changeName: (name: string) => void
}

const RoutingProblemContext = createContext<RoutingProblemContextProps | undefined>(
  undefined
);

export const RoutingProblemProvider = ({ children }: { children: ReactNode }) => {
  const [routingProblem, setRoutingProblemState] = useState<RoutingProblem | null>(
    null
  );

  const setRoutingProblem = (problem: RoutingProblem) => {
    setRoutingProblemState(problem);
  };

  const addLocation = (location: Location) => {
    setRoutingProblem({
      ...(routingProblem as RoutingProblem),
      locations: [...(routingProblem as RoutingProblem).locations, location],
    });
  }

  const changeName = (name: string) => {
    setRoutingProblem({
      ...(routingProblem as RoutingProblem),
      name,
    });
  }

  const updateRoutingProblem = (updates: Partial<RoutingProblem>) => {
    setRoutingProblemState((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const clearRoutingProblem = () => {
    setRoutingProblemState(null);
  };

  return (
    <RoutingProblemContext.Provider
      value={{ routingProblem, setRoutingProblem, updateRoutingProblem, clearRoutingProblem, addLocation, changeName }}
    >
      {children}
    </RoutingProblemContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoutingProblem = () => {
  const context = useContext<RoutingProblemContextProps | undefined>(RoutingProblemContext);
  if (!context) {
    throw new Error("useRoutingProblem must be used within a RoutingProblemProvider");
  }
  return context;
};

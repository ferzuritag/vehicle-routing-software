import { Map } from "leaflet";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export interface MapContext {
  mapContext: Map | null;
  setMapContext: Dispatch<SetStateAction<Map | null>>
}

const MapContextContext = createContext<MapContext | undefined>(
  undefined
);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [mapContext, setMapContext] = useState<Map | null>(
    null
  );

  return (
    <MapContextContext.Provider
      value={{ mapContext, setMapContext: (val) => setMapContext(val)}}
    >
      {children}
    </MapContextContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContextContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};

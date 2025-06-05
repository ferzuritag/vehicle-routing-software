import {
  Flex,
  FormControl,
  Icon,
  Input,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import {
  Marker,
  Popup,
  useMapEvents,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import { DangerButton } from "@/components/common/Buttons";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { getMarkerIconByType } from "@/utils/getMarkerIconByType";
import { useRoutingProblem } from "@/pages/private/Solver/hooks/useRoutingProblem";
import { useParams } from "react-router-dom";
import { useMapContext } from "@/pages/private/Solver/hooks/useMapContext";
import { Location, NumberProp, RoutingProblem } from "@/interfaces";
export interface MarkerType {
  long: number;
  lat: number;
  type: string | undefined;
}
interface MarkerHandlerProps {
  activeTooltips: boolean;
}

const MarkerHandler: FunctionComponent<MarkerHandlerProps> = ({
  activeTooltips,
}) => {
  const map = useMapEvents({
    dblclick(event) {
      addLocation({
        lat: event.latlng.lat,
        long: event.latlng.lng,
        type: "",
      });
    },
  });
  const { setMapContext } = useMapContext();
  const { id: routingId } = useParams();
  const { routingProblem, setRoutingProblem } = useRoutingProblem();

  const addLocation = (newMark: Location) =>{
    setRoutingProblem({
      ...(routingProblem as RoutingProblem),
      locations: [...(routingProblem as RoutingProblem).locations, newMark],
    });
    if (newMark?.lat && newMark.long) {
      map.setView([newMark?.lat, newMark?.long], map.getZoom());
  }
}

  const setLocations = (locations: Location[]) =>
    setRoutingProblem({ ...(routingProblem as RoutingProblem), locations });

  useEffect(() => {
    setMapContext(map);
  }, [map]);

  return routingProblem?.locations?.map((markerData, id: number) => (
    <Marker
      icon={getMarkerIconByType(
        markerData?.type,
        routingProblem?.schema?.locationTypes
      )}
      key={(routingId as string) + id}
      position={[markerData.lat, markerData.long]}
    >
      {activeTooltips && (
        <LeafletTooltip permanent>{id === 0 ? "0" : id}</LeafletTooltip>
      )}
      <Popup maxWidth={1200}>
        <Flex direction="column" gap={2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl mb={3} display="flex" alignItems="center" gap={2}>
              <Select
                value={markerData.type}
                onChange={(e) => {
                  const newMarkers = [...routingProblem.locations];
                  newMarkers[id] = {
                    ...newMarkers[id],
                    type: e.target.value,
                  };
                  setLocations(newMarkers);
                }}
                minW={300}
                placeholder="Selecciona un tipo de localización"
              >
                {routingProblem?.schema?.locationTypes.map((locationType) => (
                  <option value={locationType.key} key={locationType.key}>
                    {locationType.title}
                  </option>
                ))}
              </Select>
              <Tooltip
                label={routingProblem?.schema?.locationTypes?.map(
                  (locationType) =>
                    locationType.title + ": " + locationType.description + "\n"
                )}
              >
                <Icon as={InfoOutlineIcon} fontSize="xl" />
              </Tooltip>
            </FormControl>
            {routingProblem?.schema?.locationTypes
              .find(
                (locationType) =>
                  locationType.key === routingProblem?.locations[id].type
              )
              ?.props?.map((prop) => {
                if ((prop as NumberProp).type === "integer") {
                  return (
                    <FormControl
                      key={prop.key}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      mb={3}
                    >
                      <Input
                        value={markerData[prop.key] || ""}
                        onChange={(e) => {
                          const newMarkers = [
                            ...(routingProblem as RoutingProblem).locations,
                          ];
                          newMarkers[id as number] = {
                            ...newMarkers[id],
                            [prop.key]: parseInt(e.target.value),
                          };
                          setLocations(newMarkers);
                        }}
                        placeholder={prop.title}
                        type="number"
                      />
                      <Tooltip label={prop.description}>
                        <Icon as={InfoOutlineIcon} fontSize="xl" />
                      </Tooltip>
                    </FormControl>
                  );
                }
                if (prop.type == "boolean") {
                  return (
                    <FormControl
                      key={prop.key}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <Select
                        placeholder={prop.title}
                        onChange={(e) => {
                          const newMarkers: Location[] = [
                            ...(routingProblem as RoutingProblem).locations,
                          ];
                          newMarkers[id] = {
                            ...newMarkers[id],
                            [prop.key]:
                              e.target.value === "1"
                                ? true
                                : e.target.value === "0"
                                ? false
                                : undefined,
                          } as Location;
                          setLocations(newMarkers);
                        }}
                      >
                        <option value={1}>True</option>
                        <option value={0}>False</option>
                      </Select>
                      <Tooltip label={prop.description}>
                        <Icon as={InfoOutlineIcon} fontSize="xl" />
                      </Tooltip>
                    </FormControl>
                  );
                }

                return <></>;
              })}
            <Flex mt={3} justifyContent="flex-end" gap={2}>
              <DangerButton
                onConfirm={() => {
                  setLocations(
                    routingProblem?.locations.filter((_, index) => index !== id)
                  );
                }}
                modalTitle="Borrar Localización"
                confirmMessage="¿Estás seguro de eliminar esta localización?"
              >
                <Icon as={TbTrash} />
              </DangerButton>
            </Flex>
          </form>
        </Flex>
      </Popup>
    </Marker>
  ));
};

export default MarkerHandler;

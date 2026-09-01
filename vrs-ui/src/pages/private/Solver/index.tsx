import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import L, { Map } from "leaflet";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import {
  DangerButton,
  PrimaryButton,
} from "../../../components/common/Buttons";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import MarkerHandler from "../../../components/MarkerHandler";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.min.js";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import solveProblem from "../../../api/solver/solveProblem";
import { useNavigate, useParams } from "react-router-dom";
import getProblem from "../../../api/problems/getProblem";
import putProblem from "../../../api/problems/putProblem";
import { IoSend } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import deleteProblem from "../../../api/problems/deleteProblem";
import { useAppContext } from "../../../context/AppContext";
import actions from "../../../context/actions";
import getProblems from "../../../api/problems/getProblems";
import { validateLocationDataFromLocationTypes } from "../../../utils/schemaValidation/validateLocationDataFromSchema";
import {
  RoutingProblemProvider,
  useRoutingProblem,
} from "./hooks/useRoutingProblem";
import { MapContextProvider, useMapContext } from "./hooks/useMapContext";

import { getGeoJSONLayers, addLayersToMap } from "../../../utils/paintSolution";
import AddLocationModal from "../../../components/modals/AddLocationModal";
import ChangeNameModal from "../../../components/modals/ChangeNameModal";
import { FaLocationDot } from "react-icons/fa6";
import FilePicker from "../../../components/common/FilePicker";
import { BsFiletypeJson } from "react-icons/bs";
import validateRoutingProblem from "../../../utils/schemaValidation/validateRoutingProblemData";
import axios from "axios";
import { RoutingProblem } from "@/interfaces";

const Solver: FC = () => {
  const changeModalDisclosure = useDisclosure();
  const addLocationDisclosure = useDisclosure();
  const [mapReady, setMapReady] = useState(false);
  const { id } = useParams();
  const { mapContext } = useMapContext();
  const { dispatch } = useAppContext();
  const { routingProblem, setRoutingProblem, addLocation } =
    useRoutingProblem();

  const navigate = useNavigate();

  const toast = useToast();
  const [overlayMessage, setOverlayMessage] = useState<null | string>(null);

  useEffect(() => {
    getProblem(id as string).then(({ data }) => {
      setRoutingProblem(data);
    });
  }, [id]);

  useEffect(() => {
    if (mapContext != null) {
      mapContext.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) mapContext.removeLayer(layer);
      });
    }
  }, [routingProblem?.id]);

  useEffect(() => {
    if (Array.isArray(routingProblem?.geoJSON)) {
      mapContext?.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) mapContext.removeLayer(layer);
      });
      addLayersToMap(routingProblem?.geoJSON as any, mapContext as Map);
    }
  }, [routingProblem?.geoJSON, mapContext, mapReady]);

  const { mutate: mutateProblem } = useMutation({
    mutationFn: putProblem,
    onSuccess: () => {
      toast({
        status: "success",
        description: "Problema guardado con éxito",
      });
    },
  });

  const [showMarkersTooltip, setShowMarkersTooltip] = useState(false);
  return (
    <>
      <ChangeNameModal disclosure={changeModalDisclosure} />
      <AddLocationModal
        disclosure={addLocationDisclosure}
        setLocation={addLocation as any}
      />
      <Modal onClose={() => {}} isOpen={!!overlayMessage}>
        <ModalOverlay
          transform="translateY(80px)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Spinner color="#fff" fontSize="4xl" />
          <Text fontSize="4xl" color="#fff">
            {overlayMessage}
          </Text>
        </ModalOverlay>
      </Modal>
      <Flex
        gap={3}
        margin="auto"
        maxW="1200px"
        justifyContent="center"
        alignItems="center"
      >
        <Text textAlign="center" fontWeight="700" fontSize="4xl">
          {routingProblem?.name}
        </Text>
        <Icon
          onClick={changeModalDisclosure.onOpen}
          mt={1}
          cursor="pointer"
          fontSize={22}
          as={EditIcon}
        />
      </Flex>
      <Flex
        maxW="1200px"
        pb={2}
        margin="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Flex w="100%" alignItems="flex-end" flexDirection="row" gap={2}>
          <Flex>
            <PrimaryButton
              onClick={addLocationDisclosure.onOpen}
              margin={0}
              p={0}
              display="flex"
              borderRadius={20}
            >
              <Icon fontSize={20} as={FaLocationDot} />
            </PrimaryButton>
          </Flex>
          <PrimaryButton
            p={0}
            borderRadius={20}
            display="flex"
            w={10}
            justifyContent="center"
          >
            <FilePicker
              onChange={(event) => {
                if (!event?.target?.files) return;

                const file = event.target.files[0];

                if (file) {
                  if (file.type !== "application/json") {
                    toast({
                      title: "El archivo debe ser de tipo JSON",
                      status: "error",
                    });
                    event.target.value = ""; // 💡 Restablecer input
                    return;
                  }

                  const reader = new FileReader();

                  reader.onload = (e) => {
                    try {
                      const json = JSON.parse(e?.target?.result as string);
                      validateRoutingProblem(json);
                      setRoutingProblem({ ...routingProblem, ...json });
                    } catch (err) {
                      if (err instanceof Error) {
                        toast({
                          title:
                            err?.message ||
                            "El archivo no contiene un JSON válido.",
                          status: "error",
                        });
                      }
                    }
                    event.target.value = ""; // 💡 Limpiar el input después de procesar
                    reader.abort();
                  };

                  reader.readAsText(file); // 💾 Lee el archivo como texto
                }
              }}
            >
              <Icon fontSize={25} as={BsFiletypeJson} />
            </FilePicker>
          </PrimaryButton>
        </Flex>
        <Badge textAlign="right">{routingProblem?.schema?.title}</Badge>
      </Flex>
      <MapContainer
        key={id}
        whenReady={() => {
          setMapReady(true);
        }}
        id="map"
        style={{
          position: "relative",
        }}
        center={[ 23.634501, -102.552784,]}
        zoom={7.4}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerHandler activeTooltips={showMarkersTooltip} />
      </MapContainer>

      <Flex
        justifyContent="space-between"
        mt={4}
        marginLeft="auto"
        marginRight="auto"
        w="100%"
        maxW="1200px"
        gap={2}
      >
        <Flex gap={3}>
          <PrimaryButton
            disabled={
              routingProblem?.locations &&
              !(routingProblem.locations.length > 0)
            }
            onClick={() => {
              setShowMarkersTooltip(!showMarkersTooltip);
            }}
          >
            Numerar
          </PrimaryButton>
        </Flex>
        <Flex gap={2}>
          <PrimaryButton
            onClick={() => {
              mutateProblem({ id:(id as string), data: routingProblem as RoutingProblem });
            }}
            background="green.600"
            _hover={{
              background: "green.500",
            }}
          >
            <Icon mr={1} as={FaSave} />
            Guardar
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              if (routingProblem?.schema.locationTypes) {
                try {
                  validateLocationDataFromLocationTypes(
                    routingProblem.schema.locationTypes,
                    routingProblem?.locations
                  );
                  setOverlayMessage("Resolviendo el problema ...");
                  const {
                    data: { solutions },
                  } = await solveProblem({
                    endpoint: routingProblem.endpoint,
                    data: routingProblem,
                  });
                  setOverlayMessage("Marcando rutas ...");

                  const layers = await getGeoJSONLayers(
                    solutions,
                    routingProblem.locations
                  );
                  setRoutingProblem({
                    ...routingProblem,
                    solution: solutions,
                    geoJSON: layers,
                  });

                  setOverlayMessage(null);
                } catch (error) {
                  let errMessage = "";
                  if (error instanceof Error) {
                    errMessage = error?.message;
                  }

                  if (axios.isAxiosError(error)) {
                    errMessage = error.response?.data.detail;
                  }
                  toast({
                    title: errMessage,
                    status: "error",
                  });
                }
                setOverlayMessage(null);
              }
            }}
          >
            <Icon mr={1} as={IoSend} />
            Resolver
          </PrimaryButton>
          <DangerButton
            modalTitle="Borrar Problema"
            onConfirm={() => {
              setOverlayMessage("Deleting problem");
              deleteProblem(routingProblem?.id as string)
                .then(() => {
                  setOverlayMessage(null);
                  getProblems().then(({ data }) => {
                    dispatch({
                      type: actions.CHANGE_MENU_PROBLEMS,
                      payload: data.routing_problems,
                    });
                  });
                  navigate("/dashboard");
                })
                .catch(() => {
                  setOverlayMessage(null);
                });
            }}
            confirmMessage="¿Estás seguro de querer borrar este problema?"
            maxW="170px"
          >
            <Icon mr={1} as={DeleteIcon} />
            Borrar
          </DangerButton>
        </Flex>
      </Flex>
      <Box p={2}>
        {routingProblem?.geoJSON && (
          <Text
            fontWeight="bold"
            fontSize="2xl"
            margin="20px auto 20px auto"
            maxW="1200px"
          >
            Guía de Rutas
          </Text>
        )}
        <Flex
          margin="auto"
          justifyContent="flex-start"
          flexWrap="wrap"
          maxW="1200px"
          gap={3}
        ></Flex>
        <Flex
          flexDirection="column"
          margin="auto"
          justifyContent="flex-start"
          flexWrap="wrap"
          maxW="1200px"
        >
          {routingProblem?.geoJSON && (
            <>
              Distancia Total Recorrida:{" "}

              {routingProblem?.geoJSON?.reduce((acum, currVal) => {
                let acumSegment = 0;
                currVal.forEach((geo) => {
                  geo.features.forEach((feature) => {
                    acumSegment += parseFloat(
                      feature?.properties?.summary?.distance as any
                    );
                  });
                });
                return acumSegment + acum;
              }, 0).toFixed(2)}{" "}
              metros
            </>
          )}
        </Flex>
        <Flex
          flexDirection="column"
          margin="auto"
          justifyContent="flex-start"
          flexWrap="wrap"
          maxW="1200px"
          gap={3}
        >
          {routingProblem?.geoJSON?.map((arr, index) => (
            <Accordion allowToggle={true} key={index}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Text>Guia para el vehículo {index + 1}</Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  {arr.length < 1 && (
                    <Text>No hay rutas asignadas para este vehículo</Text>
                  )}
                  {routingProblem.solution &&
                    routingProblem.solution?.length >= 1 &&
                    arr.map((geo, geoKey) => (
                      <div key={geoKey}>
                        {routingProblem && routingProblem.solution && (
                          <Text fontWeight="bold">
                            Paso {geoKey + 1}: Dirígete desde localización n°{" "}
                            {routingProblem?.solution[index][geoKey]} a la
                            localización n°{" "}
                            {routingProblem?.solution[index][geoKey + 1]}
                          </Text>
                        )}

                        <Box marginLeft="20px">
                          {geo?.features.map((feature, featureKey) => (
                            <div key={featureKey}>
                              {feature?.properties?.segments.map(
                                (segment, segmentKey) => (
                                  <div key={segmentKey}>
                                    {segment?.steps?.map((step, stepI) => (
                                      <Text key={stepI}>
                                        Paso {stepI}: {step.instruction}
                                      </Text>
                                    ))}
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                        </Box>
                      </div>
                    ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </Flex>
      </Box>
    </>
  );
};

const SolverWithContexts = () => (
  <MapContextProvider>
    <RoutingProblemProvider>
      <Solver />
    </RoutingProblemProvider>
  </MapContextProvider>
);

export default SolverWithContexts;

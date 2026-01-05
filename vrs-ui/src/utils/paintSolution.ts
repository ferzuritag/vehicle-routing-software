import { GeoJSONOpenStreetMapType } from "@/interfaces";
import axios from "axios";
import { geoJSON, Map } from "leaflet";

function getColorByIndex(index: number) {
  const hue = (index * 137.5) % 360; // 137.5 es el ángulo dorado para una distribución de colores visualmente atractiva
  return `hsla(${hue}, 70%, 50%, .80)`; // Formato HSLA para incluir opacidad
}

export const getGeoJSONLayers = async (
  solutions: Array<number[]>,
  locations: { long: number; lat: number }[]
): Promise<Array<GeoJSONOpenStreetMapType[]>> => {
  const layers: Array<GeoJSONOpenStreetMapType[]> = [];

  for (let solIndex = 0; solIndex < solutions.length; solIndex++) {
    const solution = solutions[solIndex];
    const tour = solution.map(idx => [locations[idx].long, locations[idx].lat]);

    const { data } = await axios.post(
      `${import.meta.env.VITE_OPEN_ROUTE_BASE_URL}/v2/directions/driving-car/geojson`,
      {
        coordinates: tour,
        language: "es",
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_OPEN_ROUTE_API_KEY,
        },
      }
    );

    // asegúrate de inicializar el array
    layers[solIndex] = [];
    layers[solIndex].push(data);
  }

  return layers;
};


export const addLayersToMap = (
  layers: GeoJSONOpenStreetMapType[][],
  map: Map
) => {
  layers.forEach((layerArr, index) => {
    layerArr.forEach((layer) => {
      geoJSON(layer as unknown as any, {
        style: {
          color: getColorByIndex(index),
        },
      }).addTo(map);
    });
  });
};

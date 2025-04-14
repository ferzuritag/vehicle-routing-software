import { GeoJSONOpenStreetMapType } from "@/interfaces";
import axios from "axios";
import { geoJSON, Layer, Map } from "leaflet";

function getColorByIndex(index: number) {
  const hue = (index * 137.5) % 360; // 137.5 es el ángulo dorado para una distribución de colores visualmente atractiva
  return `hsla(${hue}, 70%, 50%, .80)`; // Formato HSLA para incluir opacidad
}

export const getGeoJSONLayers = async (
  solutions: Array<number[]>,
  locations: { long: number; lat: number }[]
): Promise<Array<GeoJSONOpenStreetMapType[]>> => {
  const layers: Array<Layer[]> = [];

  for (
    let solutionIndex = 0;
    solutionIndex < solutions.length;
    solutionIndex++
  ) {
    const solution = solutions[solutionIndex];
    layers.push([]);

    for (let i = 0; i < solution.length - 1; i++) {
      const currentIndex = solution[i];
      const nextIndex = solution[i + 1];

      if (currentIndex != nextIndex) {
        // Llamada sincrónica a la API
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_OPEN_ROUTE_BASE_URL
          }/v2/directions/driving-car/geojson`,
          {
            coordinates: [
              [locations[currentIndex].long, locations[currentIndex].lat],
              [locations[nextIndex].long, locations[nextIndex].lat],
            ],
            language: "es",
          },{
            headers: {
              Authorization: import.meta.env.VITE_OPEN_ROUTE_API_KEY
            }
          }
        );
        layers[solutionIndex].push(data);
      }
    }
  }

  return layers as any;
};

export const addLayersToMap = (layers: GeoJSONOpenStreetMapType[][], map: Map) => {
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

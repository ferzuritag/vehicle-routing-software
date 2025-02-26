import {
  Location,
  LocationType
} from "@/interfaces";

export const validateLocationQuantity = (
  locationType: LocationType,
  locations: Location[]
) => {
  const countOfMarkersType = locations.filter(
    (marker) => marker.type == locationType.key
  ).length;

  if (locationType?.min && countOfMarkersType < locationType.min) {
    throw new Error(
      `Debes de tener al menos ${locationType.min} localizaciones del tipo '${locationType.title}', la cantidad actual es ${countOfMarkersType}.`
    );
  }
  if (locationType?.max && countOfMarkersType > locationType.max) {
    throw new Error(
      `Debes de tener máximo ${locationType.max} localizaciones del tipo '${locationType.title}', la cantidad actual es ${countOfMarkersType}.`
    );
  }
};

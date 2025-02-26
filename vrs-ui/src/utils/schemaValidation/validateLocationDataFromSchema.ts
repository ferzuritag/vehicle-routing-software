import {
  Location,
  LocationType,
} from "@/interfaces";
import { validateLocationsProps } from "./validateLocationsProps";
import { validateLocationQuantity } from "./validateLocationsQuantityFromSchema";

export const validateLocationDataFromLocationTypes = (
  locationTypes: LocationType[],
  locations: Location[]
): void | never => {

  locationTypes.forEach((locationType) => { //Start Checking by every locationType
    const locationsOfThisType = locations.filter(location => location.type === locationType.key)
    validateLocationQuantity(locationType, locationsOfThisType)
    
    validateLocationsProps(locationType.props, locationsOfThisType)

  });
};

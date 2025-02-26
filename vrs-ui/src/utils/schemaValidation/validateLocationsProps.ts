import {
  Location,
  NumberProp,
  Prop,
} from "@/interfaces";

export const validateLocationsProps = (
  locationProps: Prop[],
  locations: Location[]
) => {
  // For all locations check props
  locations.forEach((location) => {
    locationProps?.forEach((locationProp) => {
      validateRequired(location, locationProp);

      if (locationProp.type as string === "number") {
        validateNumberProps(location, locationProp as NumberProp);
      }
    });
  });
};

export const validateRequired = (
  location: Location,
  locationPropDefinition: Prop
) => {
  const locationProp = location[locationPropDefinition.key];
  if (
    locationPropDefinition?.required === true &&
    (locationProp == undefined || locationProp == null)
  ) {
    throw Error(
      `La propiedad '${locationPropDefinition.title}' debe estar definida`
    );
  }
};

export const validateNumberProps = (
  location: Location,
  locationPropDefinition: NumberProp
) => {
  const value = location[locationPropDefinition.key] as number;

  if (locationPropDefinition?.min && value < locationPropDefinition.min) {
    throw Error(
      `Property '${locationPropDefinition.title}' should be more than ${locationPropDefinition?.min}, actual is ${value}`
    );
  }

  if (locationPropDefinition?.max && value > locationPropDefinition.max) {
    throw Error(`Property should be less than ${locationPropDefinition.max}`);
  }
};

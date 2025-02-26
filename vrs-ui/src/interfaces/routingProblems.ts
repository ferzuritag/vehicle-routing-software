import { GeoJSONOpenStreetMapType } from ".";

export interface RoutingProblem {
  type: string;
  id: string | number;
  endpoint: string;
  name: string;
  locations: Location[];
  solution?: Array<number[]>;
  geoJSON?: Array<GeoJSONOpenStreetMapType[]>;
  schema: Schema;
}

export type Location = {
  type: string;
  lat: number;
  long: number;
  [key: string]: number | string;
};

export interface Schema {
  title: string;
  description: string;
  locationTypes: LocationType[];
  settings: Setting[];
}

export interface LocationType {
  key: string;
  title: string;
  description: string;
  min: number;
  max: number;
  props: Prop[];
}

export type Prop = BaseProp | NumberProp;

export interface BaseProp {
  type: "integer" | "boolean";
  key: string;
  title: string;
  description: string;
  required: boolean;
}

export interface NumberProp extends BaseProp {
  type: "integer";
  min: number;
  max: number;
}

export interface Setting {
  title: string;
  description: string;
  type: string;
  required: boolean;
}

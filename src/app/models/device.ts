import { Area } from "./area";
import { Location } from "./location";
import { Stop } from "./stop";

export interface Device {
  location: Location;
  defaultLang: string;

  area: Area;
  stops: Stop[];
}

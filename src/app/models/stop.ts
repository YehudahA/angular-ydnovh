import { Location } from "./location";

export interface Stop {
  id: number;
  code: number;
  name: string;
  city: string;
  isDefault: boolean;
  showRoutes: boolean;
  location: Location;
  platform?: string;
  platformArea?: string;
}

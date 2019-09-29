import { Route } from "./route";
import { RouteStop } from "./route-stop";

export interface LineViewModel {
  route: Route;
  cities: CityGroupViewModel[];
  departureStop: number;
}

export interface CityGroupViewModel {
  name: string;
  stops: StopViewModel[];
}

export interface StopViewModel {
  stop: RouteStop;
  isDefaultStop: boolean;
  isDepartureStop: boolean;
}

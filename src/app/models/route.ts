import { Agency } from "./agency";
import { Destination } from "./destination";
import { RouteStop } from "./route-stop";

export interface Route {
  id: number;
  shortName: string;
  destination: Destination;
  headsign: string;

  stops: RouteStop[];
  frequencies: Date[];
  agency: Agency;
}

export class RouteHeleprs {
  static getDestination(route: Route,lang : string):string {
    switch (lang) {
      case 'en':
        return route.destination.english;
      case 'ar':
        return route.destination.arabic;
      default:
        return route.destination.hebrew;
    }
  }
}

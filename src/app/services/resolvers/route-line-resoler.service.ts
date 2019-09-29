import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CityGroupViewModel, LineViewModel, StopViewModel } from '../../models/route-line-view-models';
import { XpisDataService } from '../xpis-data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteLineResolerService implements Resolve<LineViewModel> {

  constructor(private xpisDataService: XpisDataService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<LineViewModel> {
    const routeId = +route.parent.paramMap.get("routeId");
    return this.getData(routeId);
  }

  getData(routeId: number): Observable<LineViewModel> {
    return forkJoin({
      device: this.xpisDataService.deviceStream$.pipe(take(1)),
      route: this.xpisDataService.getRoute$(routeId).pipe(take(1))
    })
      .pipe(map(({ device, route }) => {
        const cities: CityGroupViewModel[] = [];

        const stopsInRoute = route.stops.filter(rs => device.stops.some(ds => rs.id == ds.id));
        const defaultStop = stopsInRoute.find(ds => ds.isDefault);
        const departureStop = defaultStop || stopsInRoute[0];

        route.stops.forEach(s => {

          const stopViewModel: StopViewModel = {
            stop: s,
            isDefaultStop: s == defaultStop,
            isDepartureStop: s == departureStop
          };

          let cityGroup = cities[cities.length - 1];

          if (!cityGroup || cityGroup.name != s.city) {
            cityGroup = {
              name: s.city,
              stops: []
            };

            cities.push(cityGroup);
          }

          cityGroup.stops.push(stopViewModel);
        });

        const result: LineViewModel = {
          route: route,
          cities: cities,
          departureStop: departureStop.stopSequence
        };
        return result;
      }),
        take(1));
  }

}

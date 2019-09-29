import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of, timer } from 'rxjs';
import { concatMap, map, shareReplay, take, tap } from 'rxjs/operators';
import { Arrival } from '../../models/arrival';
import { Device } from '../../models/device';
import { Route } from '../../models/route';
import { StopRoutes } from '../../models/stop-routes';
import { XpisDataService } from '../xpis-data.service';
import { XpisHttpService } from '../xpis-http.service';

@Injectable({
  providedIn: 'root'
})
export class XpisDataServiceMock {

  public deviceStream$: Observable<Device>;
  public routesStream$: Observable<Route[]>;
  public arrivalsStream$: Observable<Arrival[]>;

  constructor(xpisService: XpisHttpService) {
    this.deviceStream$ = of({}).
      pipe(
        concatMap(() => xpisService.getDevice()),
        tap(d => {
          if (!d.location) {
            const defaultStop = d.stops.find(s => s.isDefault);
            if (defaultStop)
              d.location = defaultStop.location;
          }
        }),
        shareReplay(1)
      );

    this.arrivalsStream$ = XpisDataService.createStream(xpisService.getArrivals(), 20);

    const routesTimer = timer(0, 3600 * 6 * 1000).
      pipe(
        concatMap(() => xpisService.getRoutes())
        //shareReplay(1)
      );

    this.routesStream$ = combineLatest(this.arrivalsStream$, routesTimer).
      pipe(
        map(([arrivals, routes]) => XpisDataService.distinctRoutes(routes, arrivals)),
        shareReplay(1)
      );

    //this.routesStream$ = XpisDataService.createStream(xpisService.getRoutes(), 3600 * 6);
  }

  public getRoute$(id: number): Observable<Route> {
    return of<Route>({
      id: id,
      destination: {
        hebrew: 'ירושלים',
        english: 'Jerusalem',
        arabic: ''
      },
      frequencies: [],
      headsign: 'ירושלים',
      shortName: '400',
      stops: [],
      agency: {
        id: 3,
        name: 'אגד',
        color: 'green',
        logo: ''
      }
    })
  }

  public getRoutesByNumber$(number: string): Observable<StopRoutes[]> {

    const device = this.deviceStream$.pipe(take(1));
    const routes = this.routesStream$.pipe(take(1));

    return forkJoin({ device, routes })
      .pipe(map(({ device, routes }) =>
        device.stops
          .map(s => {
            return {
              stop: s,
              routes: routes
                .filter(r => r.shortName == number)
                .filter(r => r.stops.some(ss => ss.id === s.id))
            };
          })
          .filter(sr => sr.routes.length)
      ));
  }

  public getArrival$(routeId: number): Observable<number> {
    return this.arrivalsStream$.pipe(
      map(arr => {
        const a = arr.find(a => a.routeId == routeId);

        if (a) {
          const diff = new Date(a.arrivalTime).getTime() - new Date().getTime();
          return diff / 1000;
        }

        return null;
      })
    );
  }

  static createStream<T>(source: Observable<T>, seconds: number): Observable<T> {
    return timer(0, seconds * 1000).
      pipe(
        concatMap(() => source),
        shareReplay(1)
      );
  }

  static distinctRoutes(routes: Route[], arrivals: Arrival[]): Route[] {
    const isMatche = (r1: Route, r2: Route): boolean =>
      r1.shortName == r2.shortName && r1.destination.hebrew == r2.destination.hebrew;

    const result = routes.reduce<Route[]>((accumulator, route) => {
      const arrival = arrivals.find(arr => arr.routeId == route.id);
      const arrivalTime = arrival ? arrival.arrivalTime : null;

      if (!accumulator.some(r => isMatche(r, route))) {
        const hasPrevious = routes.some(r =>
          isMatche(r, route)
          && arrivals.some(arr =>
            arr.routeId == r.id
            && arr.arrivalTime < arrivalTime));

        if (!hasPrevious) {
          accumulator.push(route);
        }
      }

      return accumulator;
    }, []);

    return result;
  }
}

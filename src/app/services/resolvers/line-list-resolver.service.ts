import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Route } from '../../models/route';
import { StopRoutes } from '../../models/stop-routes';
import { XpisDataService } from '../xpis-data.service';

@Injectable({
  providedIn: 'root'
})
export class LineListResolverService implements Resolve<StopRoutes[]> {
  constructor(private xpisDataService: XpisDataService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<StopRoutes[]> {
    const device = this.xpisDataService.deviceStream$.pipe(take(1));
    const routes = this.xpisDataService.routesStream$.pipe(take(1));

    return forkJoin({ device, routes })
      .pipe(
        take(1),
        map(({ device, routes }) =>
          device.stops
            .filter(s => s.showRoutes)
            .sort(LineListResolverService.compareByProp('name'))
            .map(s => {
              return {
                stop: s,
                routes: routes
                  .filter(r => r.stops.some(ss => ss.id === s.id))
                  .sort(LineListResolverService.compareRouteNumber)
              };
            })
        ));
  }

  private static compareByProp<T>(key): (a: T, b: T) => number {
    return (a, b) => {
      const s1 = a[key];
      const s2 = b[key];

      return LineListResolverService.compareValues(s1,s2);
    };
  }

  private static compareRouteNumber(r1: Route, r2: Route): number {
    const s1 = r1.shortName;
    const s2 = r2.shortName;

    const i1 = parseInt(s1);
    const i2 = parseInt(s2);

    const sortAsInt = LineListResolverService.compareValues(i1, i2);
    return sortAsInt || LineListResolverService.compareValues(s1, s2);
  }

  private static compareValues<T>(v1: T, v2: T) {
    if (v1 < v2) {
      return -1;
    }
    if (v1 > v2) {
      return 1;
    }
    return 0;
  };
}


import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { StopRoutes } from '../../models/stop-routes';
import { XpisDataService } from '../xpis-data.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SearchLineListResolverService implements Resolve<StopRoutes[]> {
  constructor(
    private xpisService: XpisDataService,
    private router: Router,
    private location : Location,
    @Inject("DEVICE_ID") private deviceId: number) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<StopRoutes[]> | Observable<never> {
    const number = route.paramMap.get("line");
    const parts = this.location.path().split('/');

    return this.xpisService.getRoutesByNumber$(number)
      .pipe(
        take(1),
        mergeMap(lines => {
          if (lines && lines.length) {

            if (lines.length == 1 && lines[0].routes.length == 1) {
              this.router.navigate([this.deviceId, "route-stop", lines[0].routes[0].id]);
              return EMPTY;
            }

            return of(lines);
          }
          else { // line not found
            this.router.navigate([this.deviceId, parts[2], 'notfound']);
            return EMPTY;
          }
        })
      );
  }
}

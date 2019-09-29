import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CityGroupViewModel, StopViewModel, LineViewModel } from '../../models/route-line-view-models';

@Injectable({
  providedIn: 'root'
})
export class RouteLineResolerMockService implements Resolve<LineViewModel> {
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<LineViewModel> {
    const stops = [1,2,3,4,5,6,7,8,9,10,11,12,3,14,15,16]
      .map(i => i++)
      .map<StopViewModel>(i => {
        return {
          isDefaultStop: i == 5,
          isDepartureStop: false,
          stop: {
            id: i,
            stopSequence: i,
            city: i <= 10 ? 'חיפה' : i <= 15 ? '' : 'ירושלים',
            name: 'תחנה' + i,
            code: i,
            isDefault: false,
            location: null,
            platform: null,
            platformArea: null,
            showRoutes: false,
            translations: [{
              language: 'en',
              value: 'Stop' + i
            }]
          }
        }
      });

    const cities: CityGroupViewModel[] = stops.reduce<CityGroupViewModel[]>((accum, currentValue) => {
      let city = accum[accum.length - 1];

      if (!city || city.name != currentValue.stop.city) {
        city = {
          name: currentValue.stop.city,
          stops: []
        };

        accum.push(city);
      }

      city.stops.push(currentValue);
      return accum;
    }, []);

    return of<LineViewModel>({
      route: {
        id: 1,
        stops: [{
          id: 1,
          stopSequence: 1,
          isDefault: true,
          city: null,
          code: 1,
          name: 'תחנה 1',
          platform: null,
          location: null,
          platformArea: null,
          showRoutes: false,
          translations: [{
            language: 'en',
            value: 'Stop 1'
          }]
        }],
        destination: null,
        frequencies: null,
        headsign: null,
        shortName: null,
        agency: {
          id: 3,
          name: 'אגד',
          color: 'green',
          logo: 'eged.png'
        }
      },
      departureStop: 5,
      cities: cities
    });
  }
}

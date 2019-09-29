import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agency } from '../../models/agency';
import { Arrival } from '../../models/arrival';
import { Device } from '../../models/device';
import { LineStop } from '../../models/line-stop';
import { Route } from '../../models/route';

@Injectable({
  providedIn: 'root'
})
export class XpisHttpMockService {
  constructor(private route: ActivatedRoute) { }

  getDevice(): Observable<Device> {
    const id = +(location.pathname.split('/')[1]);

    const deviceLoc = this.route.snapshot.queryParamMap.get("location");
    const lang = this.route.snapshot.queryParamMap.get("lang");

    return of<Device>({
      location: { lat: 31.790926, lng: 34.639056 },
      defaultLang: lang || "he",
      stops: [{
        id: 1,
        code: 101,
        name: 'stop1',
        city: 'ירושלים',
        showRoutes: true,
        isDefault: true,
        location: { lat: 31.790926, lng: 34.639056 },
      },
      {
        id: 2,
        code: 102,
        name: 'stop2',
        city: 'ירושלים',
        showRoutes: true,
        isDefault: false,
        location: { lat: 31.790926, lng: 34.639056 },
      }],
      area: id == 1 ? {
        name: 'arean name',
        titleMap: 'area title',
        svgMap: 'savidor'
      } : null
    });
  }

  getRoutes(): Observable<Route[]> {
    return of<Route[]>([
      {
        id: 1,
        shortName: '401',
        destination: {
          hebrew: 'ירושלים',
          english: 'JERUSAEM',
          arabic: 'XXXX'
        },
        headsign: "ירושלים",
        stops: [{
          id: 1,
          stopSequence: 1,
          code: 101,
          name: 'stop1',
          city: 'ירושלים',
          showRoutes: true,
          isDefault: false,
          location: { lat: 31.790926, lng: 34.639056 },
          translations: [{
            language: 'en',
            value: 'Jerusalem'
          }]
        }],
        frequencies: [new Date('2010-1-1 10:00'),
        new Date('2010-1-1 10:30'),
        new Date('2010-1-1 11:00')],
        agency: { id: 3, name: '', logo: '', color: '' }
      },
      {
        id: 2,
        shortName: '402',
        destination: {
          hebrew: 'חברון',
          english: 'HEBRON',
          arabic: 'YYYY'
        },
        headsign: "חברון",
        stops: [{
          id: 2,
          stopSequence: 2,
          code: 102,
          name: 'stop2',
          city: 'ירושלים',
          showRoutes: true,
          isDefault: false,
          location: { lat: 31.790926, lng: 34.639056 },
          translations: [{
            language: 'en',
            value: 'Jerusalem'
          }]
        }],
        frequencies: [],
        agency: { id: 3, name: '', logo: '', color: '' }
      },
      {
        id: 3,
        shortName: '403',
        destination: {
          hebrew: 'צפת',
          english: 'ZEFAT',
          arabic: 'ZZZZ'
        },
        headsign: "צפת",
        stops: [{
          id: 2,
          stopSequence: 2,
          code: 102,
          name: 'stop2',
          city: 'ירושלים',
          showRoutes: true,
          isDefault: false,
          location: { lat: 31.790926, lng: 34.639056 },
          translations: [{
            language: 'en',
            value: 'Jerusalem'
          }]
        }],
        frequencies: [],
        agency: { id: 1, name: '', logo: '', color: '' }
      }]);
  }

  getArrivals(): Observable<Arrival[]> {
    return of<Arrival[]>([
      {
        routeId: 1,
        arrivalTime: new Date()
      },
      {
        routeId: 2,
        arrivalTime: new Date()
      }]
    );
  }

  getAgencies(): Observable<Agency[]> {
    return of<Agency[]>([
      {
        "id": 3,
        "name": "אגד",
        "logo": "eged.png",
        "color": "#009444"
      }
    ]);
  }

  getLineStop(routeId: number, stopId: number): Observable<LineStop> {
    return of<LineStop>(
      {
        arrivalTime: '12:00',
        routes: ["1", "2", "3"]
      }
    );
  }
}

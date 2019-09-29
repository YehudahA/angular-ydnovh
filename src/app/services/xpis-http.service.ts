import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agency } from '../models/agency';
import { Area } from '../models/area';
import { Arrival } from '../models/arrival';
import { Device } from '../models/device';
import { LineStop } from '../models/line-stop';
import { Route as Line } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class XpisHttpService {
  private readonly controllerPath = this.baseUrl + 'XpisData/';

  constructor(private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    @Inject("DEVICE_ID") private deviceId: number) { }

  getDevice(): Observable<Device> {
    const params = this.getDeviceIdParams();
    const result = this.http.get<Device>(this.controllerPath + 'Device', { params: params });
    return result;
  }

  getRoutes(): Observable<Line[]> {
    const params = this.getDeviceIdParams();
    const result = this.http.get<Line[]>(this.controllerPath + 'Routes', { params: params });
    return result;
  }

  getArrivals(): Observable<Arrival[]> {
    const params = this.getDeviceIdParams();
    const result = this.http.get<Arrival[]>(this.controllerPath + 'Arrivals', { params: params });
    return result;
  }

  getLineStop(routeId: number, stopId: number): Observable<LineStop> {
    const params = new HttpParams()
      .set('routeId', routeId.toString())
      .set('stopId', stopId.toString());

    const result = this.http.get<LineStop>(this.controllerPath + 'LineStop', { params: params });
    return result;
  }

  getAgencies(): Observable<Agency[]> {
    const result = this.http.get<Agency[]>('assets/jsons/agency.json');
    return result;
  }

  // private

  private getDeviceIdParams(): HttpParams {
    return new HttpParams().set('deviceId', this.deviceId.toString());
  }
}

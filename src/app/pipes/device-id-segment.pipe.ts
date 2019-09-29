import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceId'
})
export class DeviceIdSegmentPipe implements PipeTransform {
  constructor(@Inject("DEVICE_ID") private deviceId: number) { }

  transform(_: any): string {
    return "/" + this.deviceId;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrivalTime'
})
export class ArrivalTimePipe implements PipeTransform {

  transform(seconds: number): string {
    if (!seconds) {
      return '--';
    }

    if (seconds < 60) {
      return "↓";
    }

    if (seconds < 60 * 60) {
      let minutes = Math.round(seconds / 60).toString();

      return minutes;
    }

    if (seconds < 60 * 60 * 24) {
      return 'AAA-BBB';
    }

    return "--";
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'while'
})
export class WhilePipe implements PipeTransform {

  transform(seconds: number): string {
    if (seconds == null || seconds == undefined) {
      return '';
    }

    if (seconds < 60 || seconds > 60 * 60) {
      return "";
    }


    return "while"
  }
}

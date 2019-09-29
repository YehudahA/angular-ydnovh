import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LineStop } from '../../models/line-stop';
import { Route } from '../../models/route';
import { LineViewModel, StopViewModel } from '../../models/route-line-view-models';
import { LineStopViewModel } from '../../models/‏‏line-stop-view-model';
import { XpisHttpService } from '../../services/xpis-http.service';

@Component({
  selector: 'app-route-line',
  templateUrl: './route-line.component.html',
  styleUrls: ['./route-line.component.css']
})
export class RouteLineComponent implements OnInit {
  route: Route;
  lineStop$: Observable<LineStopViewModel>;
  currentLang: string;
  line: LineViewModel;
  selectedStop: number;

  constructor(
    private xpishttp: XpisHttpService,
    private translate: TranslateService,
    route: ActivatedRoute) {

    route.data
      .pipe(
        map((data: { line: LineViewModel }) => data.line),
        take(1)
      ).subscribe(l => {
        this.line = l;
      });
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(lang => this.currentLang = lang.lang);
  }

  selectStop(svm: StopViewModel) {
    if (svm.stop.stopSequence > this.line.departureStop) {
      this.selectedStop = svm.stop.stopSequence;
      this.getLineStop(svm.stop.id);
    }
  }

  getLineStop(stopId: number) {
    this.lineStop$ = this.xpishttp.getLineStop(this.line.route.id, stopId)
      .pipe(
        map<LineStop, LineStopViewModel>(ls => {
          return {
            lineStop: ls,
            stop: this.line.route.stops.find(s => s.id == stopId)
          };
        }));
  }

  getTranslationsByLang(svm: StopViewModel) {
    const stop = svm.stop;
    var t = stop.translations.find(f => f.language.toLowerCase() == this.currentLang);
    return t ? t.value : stop.name;
  }

  scroll() {
    document.getElementById("allStops").scrollTop = document.getElementById("allStops").scrollTop + 68;
  }
}

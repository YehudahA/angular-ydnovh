import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Agency } from '../../models/agency';
import { Route } from '../../models/route';
import { XpisDataService } from '../../services/xpis-data.service';
import { XpisHttpService } from '../../services/xpis-http.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {
  route: Route;
  arrivalTimeSeconds: number;
  myAgency: Agency;
  activeUrl: string;
  currentLang: string;

  constructor(private xpisDataService: XpisDataService,
    private activatedRoute: ActivatedRoute,
    private xpisHttpService: XpisHttpService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.activatedRoute.url.subscribe(u => {
      this.activeUrl = this.activatedRoute.snapshot.firstChild.routeConfig.path;
    });

    const routeId = +this.activatedRoute.snapshot.paramMap.get('routeId');

    forkJoin({
      route: this.xpisDataService.getRoute$(routeId).pipe(take(1)),
      agency: this.xpisHttpService.getAgencies()
    })
      .pipe(take(1))
      .subscribe(data => {
        this.route = data.route;
        this.myAgency = data.agency.find(a => a.id == data.route.agency.id);
      });

    this.xpisDataService.getArrival$(routeId)
      .subscribe(time => this.arrivalTimeSeconds = time);

    this.translate.onLangChange.subscribe(lang => this.currentLang = lang.lang);
  }

  getDestinationLang() {
    return this.currentLang == 'ar' ? this.route.destination.arabic : this.currentLang == 'en' ? this.route.destination.english : this.route.destination.hebrew;
  }
}

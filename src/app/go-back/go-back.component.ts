import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouteHistoryService } from '../services/route-history.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {

  currentLang: string;

  constructor(
    private history: RouteHistoryService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(lang => this.currentLang = lang.lang);
  }


  goBack() {
    this.history.goToStateUrl();
  }
}

import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-line-stop',
  templateUrl: './line-stop.component.html',
  styleUrls: ['./line-stop.component.css']
})
export class LineStopComponent {
  @Input() model: any;
  currentLang: string;

  constructor(
    private translate: TranslateService) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(lang => this.currentLang = lang.lang);
  }


  getTranslationsByLang(stop) {
    var t = stop.translations.find(f => f.language.toLowerCase() == this.currentLang);
    return t ? t.value : stop.name;
  }
}

import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { GoBackComponent } from "./go-back/go-back.component";
import { ArrivalTimePipe } from "./pipes/arrival-time.pipe";
import { DeviceIdSegmentPipe } from "./pipes/device-id-segment.pipe";
import { MinutesPipe } from "./pipes/minutes.pipe";
import { WhilePipe } from "./pipes/while.pipe";
import { LineStopComponent } from "./routeDetails/line-stop/line-stop.component";
import { RouteDetailsComponent } from "./routeDetails/route-details/route-details.component";
import { RouteLineComponent } from "./routeDetails/route-line/route-line.component";
import { RouteLineResolerMockService } from "./services/mocks/route-line-mock-resoler.service";
import { XpisDataServiceMock } from "./services/mocks/xpis-data.service-mock";
import { XpisHttpMockService } from "./services/mocks/xpis-http-mock.service";
import { RouteLineResolerService } from "./services/resolvers/route-line-resoler.service";
import { XpisDataService } from "./services/xpis-data.service";
import { XpisHttpService } from "./services/xpis-http.service";

import { HelloComponent } from "./hello.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    RouteDetailsComponent,
    RouteLineComponent,
    ArrivalTimePipe,
    LineStopComponent,
    WhilePipe,
    MinutesPipe,
    LineStopComponent,
    DeviceIdSegmentPipe,
    GoBackComponent
  ],
  providers: [
    {
      provide: XpisHttpService,
      useClass: 1==1 ? XpisHttpMockService : XpisHttpService
    },
    {
      provide: XpisDataService,
      useClass: 1==1 ? XpisDataServiceMock : XpisDataService
    },
    {
      provide: RouteLineResolerService,
      useClass: 1==1 ? RouteLineResolerMockService : RouteLineResolerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

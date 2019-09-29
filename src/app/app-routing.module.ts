import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RouteDetailsComponent } from "./routeDetails/route-details/route-details.component";
import { RouteLineComponent } from "./routeDetails/route-line/route-line.component";
import { LineListResolverService } from "./services/resolvers/line-list-resolver.service";
import { RouteLineResolerService } from "./services/resolvers/route-line-resoler.service";
import { SearchLineListResolverService } from "./services/resolvers/search-line-list-resolver.service";

const routes: Routes = [
  {
    path: ":id",
    children: [
      {
        path: "line-search",
        children: []
      },
      {
        path: "route/:routeId",
        component: RouteDetailsComponent,
        children: [
          {
            path: "line",
            component: RouteLineComponent,
            resolve: {
              line: RouteLineResolerService
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

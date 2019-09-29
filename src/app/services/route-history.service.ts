import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {
  private state: string;

  constructor(private router: Router) {
  }

  public captureCurrentState(location: Location) {
    this.state = location.path();
  }

  public goToStateUrl() {
    this.router.navigateByUrl(this.state);
  }
}

import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()
export class SpinnerService {
  showSpinner = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showSpinner = true;
      }
      if (event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        this.showSpinner = false;
      }
    });
  }

  startSpinner() {
    this.showSpinner = true;
  }

  stopSpinner() {
    this.showSpinner = false;
  }
}

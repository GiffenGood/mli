import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatDrawer, MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'mli-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('side') sideNav: MatSidenav;
  showNav = true;
  displayName: string;

  constructor(private media: ObservableMedia,
    private auth: AngularFireAuth,
    private router: Router) {
    media.asObservable()
      .filter((change: MediaChange) => change.mqAlias === 'xs' || change.mqAlias === 'sm')
      .subscribe(() => this.showNav = false);

    this.auth.authState
      .subscribe(user => {
        if (user) {
          this.displayName = user.email;
        }
        else {
          console.log('not logged in');
        }
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sideNav.close();
      }
    });
  }

  toggle() {
    if (this.sideNav.opened) {
      this.sideNav.close();
    }
    else {
      this.sideNav.open();
    }
  }
}

import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatDrawer } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'mli-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNav = true;
  displayName: string;
  toggle(sideNav: MatDrawer) {
    if (sideNav.opened) {
      sideNav.close();
    }
    else {
      sideNav.open();
    }
  }

  constructor(private media: ObservableMedia, private auth: AngularFireAuth) {
    media.asObservable()
      .filter((change: MediaChange) => change.mqAlias === 'xs' || change.mqAlias === 'sm')
      .subscribe(() => this.showNav = false);

    this.auth.authState
      .subscribe(user => {
        this.displayName = user.email;
      });
  }
}

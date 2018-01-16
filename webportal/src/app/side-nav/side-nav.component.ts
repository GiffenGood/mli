import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'mli-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  color: string;
  loggedIn: boolean;

  constructor(private router: Router, private auth: AngularFireAuth) { }

  logOff() {
    this.auth.auth.signOut().then(() => {
      this.router.navigate(['/login'],);
    });
  }

  ngOnInit() {
    this.auth.authState
      .map(u => !u)
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn;
      });
  }
}

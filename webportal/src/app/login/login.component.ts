import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'mli-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  feedbackMsg: string;

  constructor(private auth: AngularFireAuth, private router: Router)  { }

  login(userName: string, password: string) {
    this.feedbackMsg = 'Logging in...';
    this.auth.auth.signInWithEmailAndPassword(userName, password).then(() => {
      this.router.navigate(['/customers']);
    }).catch(e => {
      this.feedbackMsg = e;
    });
  }

  ngOnInit() {
  }

}

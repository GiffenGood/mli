import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'mli-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  login(userName: string, password: string) {
    this.auth.auth.signInWithEmailAndPassword(userName, password).then(() => {
      alert('login!');
    });
  }

  ngOnInit() {
  }

}

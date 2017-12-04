import { ICustomer } from './../../../common/src/customer';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customers: ICustomer[];

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
  }

  login(userName: string, password: string) {
    this.auth.auth.signInWithEmailAndPassword(userName, password).then(() => {
      alert('login!');
    });
  }

  fetch() {
    this.db.firestore.collection('customers').get().then((res) => {
      this.customers = [];
      res.docs.forEach((sn) => {
        if (sn.exists) {
          this.customers.push(<ICustomer> sn.data());
        }
        console.log(this.customers);
      });
    });
  }
}

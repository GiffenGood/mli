import { ICustomer } from './../../../common/src/customer';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'mli-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customers: ICustomer[];

  toggle(sideNav: MatDrawer) {
    if (sideNav.opened) {
      sideNav.close();
    }
    else {
      sideNav.open();
    }
  }

  constructor(private db: AngularFirestore) {
  }



  fetch() {
    this.db.firestore.collection('customers').get().then((res) => {
      this.customers = [];
      res.docs.forEach((sn) => {
        if (sn.exists) {
          this.customers.push(<ICustomer>sn.data());
        }
        console.log(this.customers);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import * as fb from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { ICustomer } from '../../../../common/src/customer';


@Injectable()
export class CustomerDetailService {

  constructor(private angularfireStore: AngularFirestore) { }

  get(customerId: string) {
    return this.angularfireStore.firestore.collection('customers').doc(customerId).get().then((doc) => {
      return <ICustomer> doc.data();
    });
  }
}

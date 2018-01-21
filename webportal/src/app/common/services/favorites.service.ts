import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FavoritesService {

  constructor(private angularfireStore: AngularFirestore, private auth: AngularFireAuth) { }

  addFavorite(customerRSN: string) {
    return this.angularfireStore.firestore.collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('favorites').doc(customerRSN).set({});
  }

  isFavorite(customerRSN: string) {
    return this.angularfireStore.firestore.collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('favorites').doc(customerRSN).get().then(data => {
        return data.exists;
      });
  }

  removeFavorite(customerRSN: string) {
    return this.angularfireStore.firestore.collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('favorites').doc(customerRSN).delete();
  }

  getFavs() {
    return this.angularfireStore.firestore.collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('favorites').get().then((data) => {
        let customerPromises = [];
        data.forEach(fav => {
          customerPromises.push(this.angularfireStore.firestore.collection('customers').doc(fav.id).get().then((sh) => {
            return sh.data();
          }));
        });
        return Promise.all(customerPromises);
      });
  }
}

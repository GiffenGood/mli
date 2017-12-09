import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as fb from 'firebase/app';

@Component({
  selector: 'mli-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any[];
  searching = false;
  feedbackMsg = '';
  search = {
    name: '',
    zip: ''
  };

  constructor(private angularfireStore: AngularFirestore) { }

  ngOnInit() {
  }

  disableSearch() {
    return this.searching ||
      (!this.search.name && !this.search.zip) ||
      (this.search.name.length < 3 && this.search.zip.length < 5);
  }

  doSearch() {
    this.searching = true;
    this.feedbackMsg = 'Searching...';
    this.customers = [];
    const data = [];
    const custRef = this.angularfireStore.firestore.collection('customers');
    let searchRef: fb.firestore.Query;
    if (this.search.name) {
      searchRef = custRef.where('C_FORMALNAME', '>=', this.search.name).orderBy('C_FORMALNAME');
    }
    else if (this.search.zip) {
      searchRef = custRef.where('C_ZIP', '>=', this.search.zip).orderBy('C_ZIP');
    }
    if (!searchRef) {
      return;
    }
    searchRef.get().then((sn) => {
      sn.forEach(doc => {
        data.push(doc.data());
      });
      this.customers = data;
      this.feedbackMsg = (data.length === 0) ? 'No Results Found.' : '';
    }).then(() => {
      this.searching = false;
      this.search = {
        name : '',
        zip : ''
      };
    }).catch((e) => {
      this.feedbackMsg = 'An error occured';
      console.log(e);
    });
  }

}

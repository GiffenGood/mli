import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as fb from 'firebase/app';
import { PageEvent } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

function getNewSearch() {
  return {
    name: '',
    zip: ''
  };
}

@Component({
  selector: 'mli-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  docLimit = 10;
  customers = new MatTableDataSource<Element>([]);
  searching = false;
  feedbackMsg = '';
  lastDocStack: fb.firestore.DocumentSnapshot[] = [];
  search = { name: '', zip: '19426' };

  constructor(private angularfireStore: AngularFirestore) { }

  ngOnInit() {
  }

  disableSearch() {
    return this.searching ||
      (!this.search.name && !this.search.zip) ||
      (this.search.name.length < 3 && this.search.zip.length < 5);
  }

  buildSearch() {
    const custRef = this.angularfireStore.firestore.collection('customers');
    let searchRef: fb.firestore.Query;
    if (this.search.name) {
      searchRef = custRef.where('C_FORMALNAME', '>=', this.search.name).orderBy('C_FORMALNAME');
    }
    else if (this.search.zip) {
      searchRef = custRef.where('C_ZIP', '>=', this.search.zip).orderBy('C_ZIP');
    }
    return searchRef;
  }

  clear() {
    this.search = getNewSearch();
    this.customers = new MatTableDataSource<Element>([]);
  }

  doSearch() {
    const query = this.buildSearch();
    if (!query) {
      return;
    }
    this.showData(query, 'No Results Found.');
  }

  showData(query: fb.firestore.Query, noResultsMsg: string) {
    this.searching = true;
    this.customers = new MatTableDataSource<Element>([]);
    const data = [];
    this.feedbackMsg = 'Searching...';
    query.limit(this.docLimit).get().then((sn) => {
      let last = null;
      sn.forEach(doc => {
        data.push(doc.data());
        last = doc;
      });
      this.lastDocStack.push(last);
      this.customers = new MatTableDataSource<Element>(data);
      console.log(this.customers);
      this.feedbackMsg = (data.length === 0) ? noResultsMsg : '';
    }).then(() => {
      this.searching = false;
    }).catch((e) => {
      this.feedbackMsg = 'An error occured';
      console.log(e);
    });
  }

  doPage(direction: 'next' | 'prev') {
    let query = this.buildSearch();
    if (!query) {
      return;
    }

    let startAfterSN: fb.firestore.DocumentSnapshot = null;
    if (direction === 'prev') {
      console.log('popped', this.lastDocStack.pop().data().C_FORMALNAME);
    }

    startAfterSN = this.lastDocStack[this.lastDocStack.length - 1];
    query = query.startAfter(startAfterSN).limit(this.docLimit);
    this.showData(query, 'No More Results Found.');
  }
}
